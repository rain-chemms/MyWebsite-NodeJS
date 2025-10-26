// 拖尾效果相关变量
const trailContainer = document.createElement('div');
trailContainer.className = 'trail-container';
document.body.appendChild(trailContainer);
const trailSegments = [];
let lastTrailTime = 0;

// 创建延迟，单位为毫秒
let creatDelay = 1;
// 最大拖尾线段数
let maxTrailSegmentsNumber = 50;
// 鼠标移动事件处理函数
function handleMouseMove(e) {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';

    // 控制拖尾密度
    const now = Date.now();
    if (now - lastTrailTime > creatDelay) {
        addTrailSegment(e.clientX, e.clientY);
        lastTrailTime = now;
    }
}

// 添加拖尾线段
//可以在其中随机化图形形状
function addTrailSegment(x, y) {
    const segment = document.createElement('div');
    segment.className = 'trail-segment';
    trailContainer.appendChild(segment);
    segment.style.left = x + 'px';
    segment.style.top = y + 'px';
    
    segment.style.rotate = Math.floor(Math.random() * 2 * Math.PI)
    segment.style.scale = Math.random() * 1.75 + 0.25;
    segment.style.animation.

    trailSegments = trailSegments ?? [];
    trailSegments.push(segment);
    // 自动清理旧线段
    if (trailSegments.length > maxTrailSegmentsNumber ) {
        const oldestSegment = trailSegments.shift();
        trailContainer.removeChild(oldestSegment);
    }
}
// 初始化拖尾效果
document.addEventListener('mousemove', handleMouseMove);