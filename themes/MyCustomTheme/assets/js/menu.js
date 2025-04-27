document.addEventListener('DOMContentLoaded', function() {
    // 处理菜单的展开/折叠
    const toggles = document.querySelectorAll('.menu-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // 切换当前菜单项的展开/折叠状态
            this.classList.toggle('open');

            // 更新图标
            const icon = this.querySelector('.toggle-icon');
            if (icon) {
                icon.textContent = this.classList.contains('open') ? '−' : '+';
            }

            // 获取目标子菜单
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                const targetMenu = document.querySelector(targetId);
                if (targetMenu) {
                    targetMenu.classList.toggle('show');
                }
            }
        });
    });
});
