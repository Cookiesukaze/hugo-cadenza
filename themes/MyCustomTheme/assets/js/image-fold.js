document.addEventListener('DOMContentLoaded', function() {
    // 处理单个图片折叠
    const imageFoldToggles = document.querySelectorAll('.image-fold-toggle');
    imageFoldToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const container = this.closest('.image-fold-container');
            container.classList.toggle('open');
            this.classList.toggle('folded');

            // 更新aria属性
            if (container.classList.contains('open')) {
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.setAttribute('aria-expanded', 'false');
            }

            // 更新内容区域显示状态
            const content = container.querySelector('.image-fold-content');
            if (!container.classList.contains('open')) {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // 处理图片集折叠
    const imageGalleryToggles = document.querySelectorAll('.image-gallery-toggle');
    imageGalleryToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const container = this.closest('.image-gallery-container');
            container.classList.toggle('open');
            this.classList.toggle('folded');

            // 更新aria属性
            if (container.classList.contains('open')) {
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.setAttribute('aria-expanded', 'false');
            }

            // 更新内容区域显示状态
            const content = container.querySelector('.image-gallery-content');
            if (!container.classList.contains('open')) {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // 保持标题点击也能折叠的功能
    const imageFoldHeaders = document.querySelectorAll('.image-fold-header');
    imageFoldHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // 如果点击的是按钮或按钮内的元素，不处理
            if (e.target.closest('.image-fold-toggle')) {
                return;
            }

            // 触发按钮的点击事件
            const toggle = this.querySelector('.image-fold-toggle');
            if (toggle) {
                toggle.click();
            }
        });
    });

    // 保持标题点击也能折叠的功能
    const imageGalleryHeaders = document.querySelectorAll('.image-gallery-header');
    imageGalleryHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // 如果点击的是按钮或按钮内的元素，不处理
            if (e.target.closest('.image-gallery-toggle')) {
                return;
            }

            // 触发按钮的点击事件
            const toggle = this.querySelector('.image-gallery-toggle');
            if (toggle) {
                toggle.click();
            }
        });
    });

    // 图片点击放大功能
    const galleryImages = document.querySelectorAll('.gallery-image-img, .image-fold-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // 创建模态框
            const modal = document.createElement('div');
            modal.className = 'image-modal';

            // 创建大图
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.className = 'image-modal-content';

            // 创建关闭按钮
            const closeBtn = document.createElement('span');
            closeBtn.className = 'image-modal-close';
            closeBtn.innerHTML = '&times;';

            // 添加到DOM
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);

            // 显示模态框
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);

            // 关闭模态框
            closeBtn.onclick = function() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            };

            // 点击模态框背景也关闭
            modal.onclick = function(e) {
                if (e.target === modal) {
                    closeBtn.onclick();
                }
            };
        });
    });
});
