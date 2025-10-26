//为页面添加搜索标签时使用id="xxx"为目标。page建立索引
//"xxx"即为搜索的内容

/* 以下内容很重要 */
//"xxx"索引标签必须大写
//搜索框不区分大小写，但会自动转换为大写
//搜索范围仅限当前激活的页面
//搜索框id="search-bar" 搜索按钮id="search-btn",它们是唯一的
/* 以上内容很重要 */

const searchButton = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
// 搜索功能
searchButton.addEventListener('click', function () {
    const targetId = searchBar.value.trim();
    if (!targetId) {
        alert('请输入些东西让我找吧!(>_<)');
        return;
    }

    //检查目前激活的页面
    let activePage = document.querySelector('.page.active');
    
    console.log(activePage);
    let targetElement = activePage.querySelector('#'+targetId.toUpperCase());
    
    if (!targetElement) {
        alert(`没找到你要的 "${targetId}" (>_<)`);
        return;
    }
    //平滑滚动到目标元素
    targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    return;
});