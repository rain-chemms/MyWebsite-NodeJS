// 自定义光标元素
const customCursor = document.getElementById('customCursor');
const clickEffectsContainer = document.getElementById('clickEffects');

// 鼠标移动事件 - 更新光标位置
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

// 鼠标按下事件 - 光标变化
document.addEventListener('mousedown', () => {
    customCursor.classList.add('active');
});

// 鼠标释放事件 - 光标恢复
document.addEventListener('mouseup', () => {
    customCursor.classList.remove('active');
});

// 鼠标进入可点击元素
document.querySelectorAll('button, a, .nav-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('active');
    });
});

// 鼠标点击事件 - 创建点击特效
document.addEventListener('click', (e) => {
    createRippleEffect(e.clientX, e.clientY);
    createStarBurst(e.clientX, e.clientY);
});

// 创建圆形波纹效果
function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    clickEffectsContainer.appendChild(ripple);

    // 动画结束后移除元素
    setTimeout(() => {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 800);
}

// 创建星星爆炸效果
function createStarBurst(x, y) {
    const starCount = 8; // 爆炸星星数量

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = x + 'px';
        star.style.top = y + 'px';

        // 随机方向
        const angle = (i / starCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        star.style.setProperty('--tx', tx + 'px');
        star.style.setProperty('--ty', ty + 'px');

        // 随机延迟
        star.style.animationDelay = (Math.random() * 0.3) + 's';

        clickEffectsContainer.appendChild(star);

        // 动画结束后移除元素
        setTimeout(() => {
            if (star.parentNode) star.parentNode.removeChild(star);
        }, 1000);
    }
}

// 侧边栏切换
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleIcon = document.querySelector('.toggle-btn i');
    const toggle = document.querySelector('.toggle-btn');/*fuckyou*/


    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.classList.remove('fa-chevron-left');
        toggleIcon.classList.add('fa-chevron-right');
        toggle.style.width = sidebar.style.width;
    } else {
        toggleIcon.classList.remove('fa-chevron-right');
        toggleIcon.classList.add('fa-chevron-left');
        toggle.style.width = '25px';
    }
}

// 页面切换
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // 移除所有激活状态
        document.querySelectorAll('.nav-item').forEach(i => {
            i.classList.remove('active');
        });

        // 添加当前激活状态
        e.currentTarget.classList.add('active');

        // 切换内容
        const targetId = e.currentTarget.dataset.target;
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');

        // 滚动到顶部
        document.querySelector('.content-container').scrollTop = 0;
    });
});

// 初始化星空
function createStars() {
    const container = document.getElementById('stars');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 3}s`;

        container.appendChild(star);
    }
}

// 添加随机星星
function addRandomStar() {
    const container = document.getElementById('stars');
    const star = document.createElement('div');
    star.className = 'star';

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${Math.random() * 3}s`;

    container.appendChild(star);
}

// 显示提示信息
function showMessage() {
    alert('分析报告生成中，请稍候...');
}

// 保存设置
function saveSettings() {
    alert('设置已保存成功！');
}

// 更新个人资料
function updateProfile() {
    alert('个人资料更新成功！');
}

// 初始化
createStars();