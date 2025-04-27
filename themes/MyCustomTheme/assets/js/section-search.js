// 区域内搜索功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取菜单搜索输入框
    const menuSearchInput = document.getElementById('menu-search-input');
    
    if (menuSearchInput) {
        // 获取当前区域
        const currentSection = getCurrentSection();
        
        // 添加键盘事件监听器
        menuSearchInput.addEventListener('keypress', function(e) {
            // 如果按下回车键
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                
                if (searchTerm) {
                    // 重定向到搜索结果页面，添加区域约束
                    let searchQuery = searchTerm;
                    
                    // 如果搜索词不是以@开头，添加当前区域约束
                    if (!searchTerm.includes('@') && currentSection) {
                        searchQuery = `@${currentSection} ${searchTerm}`;
                    }
                    
                    window.location.href = `/search/?q=${encodeURIComponent(searchQuery)}`;
                }
            }
        });
    }
});

// 获取当前区域
function getCurrentSection() {
    // 尝试从菜单根标题获取当前区域
    const menuRootTitle = document.querySelector('.menu-root-title a');
    if (menuRootTitle) {
        const href = menuRootTitle.getAttribute('href');
        if (href) {
            // 从URL中提取区域名称
            const match = href.match(/\/(.*?)\//);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        // 如果无法从URL获取，尝试从文本内容获取
        return menuRootTitle.textContent.trim();
    }
    
    return '';
}
