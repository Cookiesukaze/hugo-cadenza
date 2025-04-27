// 处理嵌套分类的交互
document.addEventListener('DOMContentLoaded', function() {
    // 为所有有子菜单的分类项添加展开/折叠功能
    const categoryItems = document.querySelectorAll('.menu-item-category');
    
    categoryItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            // 默认折叠子菜单
            submenu.style.display = 'none';
            
            // 创建展开/折叠指示器
            const indicator = document.createElement('span');
            indicator.className = 'category-toggle';
            indicator.innerHTML = '▶';
            indicator.style.marginRight = '5px';
            indicator.style.cursor = 'pointer';
            indicator.style.fontSize = '0.8em';
            
            // 将指示器添加到分类链接前面
            const link = item.querySelector('a');
            link.parentNode.insertBefore(indicator, link);
            
            // 添加点击事件
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (submenu.style.display === 'none') {
                    submenu.style.display = 'block';
                    indicator.innerHTML = '▼';
                } else {
                    submenu.style.display = 'none';
                    indicator.innerHTML = '▶';
                }
            });
        }
    });
});
