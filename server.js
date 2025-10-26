const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------------
// 核心：记录访客信息（所有路由触发）
// --------------------------
app.use(async (req, res, next) => {
  try {
    await ensureVisitsDirectoryExists(); // 确保目录存在
    const filePath = getCurrentDayVisitFilePath();
    
    // 1. 读取现有访客记录（文件不存在则用空数组）
    let visits = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      visits = JSON.parse(fileContent);
    } catch (readErr) {
      if (readErr.code === 'ENOENT') {
        console.log(`访客文件不存在，创建新文件：${filePath}`);
        visits = []; // 文件不存在时初始化空数组
      } else {
        throw readErr; // 其他错误（如权限问题）继续抛出
      }
    }
    
    // 2. 追加新访客
    visits.push({
      ip: getClientIp(req),
      visitTime: new Date().toISOString()
    });
    
    // 3. 写回文件（自动创建文件，若目录不存在会报错，但已通过 ensureVisitsDirectoryExists 避免）
    await fs.writeFile(filePath, JSON.stringify(visits, null, 2), 'utf-8');
    console.log(`访客已记录：IP=${getClientIp(req)}, 时间=${new Date().toISOString()}`);
    
  } catch (err) {
    console.error('记录访客失败:', err);
  } finally {
    next(); // 继续执行后续中间件/路由
  }
});
// --------------------------
// 静态资源托管（前端文件）
// --------------------------
app.use(express.static(path.join(__dirname, 'public')));
// --------------------------
// 工具函数：日期与文件路径
// --------------------------
function getTodayDateString() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function getCurrentDayVisitFilePath() {
  return path.join(__dirname, 'visits', `visits-${getTodayDateString()}.json`);
}

// --------------------------
// 工具函数：确保访客目录存在
// --------------------------
async function ensureVisitsDirectoryExists() {
  const visitsDir = path.join(__dirname, 'visits');
  try {
    await fs.access(visitsDir);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(visitsDir, { recursive: true });
      console.log(`创建访客目录：${visitsDir}`);
    } else {
      throw err;
    }
  }
}

// --------------------------
// 工具函数：获取用户真实IP
// --------------------------
function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
}
// --------------------------
// API 1：获取当前用户信息
// --------------------------
app.get('/api/user-info', (req, res) => {
  const ip = getClientIp(req);
  const visitTime = new Date().toISOString();
  res.json({ ip, time: visitTime });
});

// --------------------------
// API 2：获取当日访客列表
// --------------------------
app.get('/api/visits', async (req, res) => {
  try {
    await ensureVisitsDirectoryExists();
    const filePath = getCurrentDayVisitFilePath();
    
    // 文件不存在时返回空数组，存在时解析JSON
    const fileContent = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(fileContent));
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.json([]); // 文件不存在 = 无访客记录
    } else {
      console.error('获取访客列表失败:', err);
      res.status(500).json({ error: '服务器内部错误' });
    }
  }
});
// --------------------------
// 启动服务器
// --------------------------
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`前端文件托管在：http://localhost:${PORT}`);
  console.log(`访客文件存储在：${path.join(__dirname, 'visits')}`);
});