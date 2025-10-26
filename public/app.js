const visitsNumberLabel = document.getElementById('visits-number-label');
async function loadMessage() {
  try {
    //获取并渲染当前用户信息
    const userRes = await fetch('/api/user-info');
    if (!userRes.ok) throw new Error('获取用户信息失败');
    //const user = await userRes.json();
    //获取并渲染当日访客列表
    const visitsRes = await fetch('/api/visits');
    if (!visitsRes.ok) throw new Error('获取访客列表失败');
    const visits = await visitsRes.json();

    if(visitsNumberLabel != null) {
      visitsNumberLabel.textContent = `${visits.length}`;
    }

    } catch (err) {
    console.error('数据加载失败:', err);
    visitsNumberLabel.textContent = "获取访客数据失败"
  }
}

loadMessage();