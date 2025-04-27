// Menu search functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuSearchInput = document.getElementById('menu-search-input');
    if (menuSearchInput) {
        menuSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item');

            // 清除之前的"无匹配项"消息
            const noResultsMsg = document.querySelector('.no-search-results');
            if (noResultsMsg) {
                noResultsMsg.remove();
            }

            // 如果搜索词为空，显示所有菜单项
            if (searchTerm === '') {
                menuItems.forEach(function(item) {
                    item.style.display = '';
                });

                // 重置所有折叠的菜单
                document.querySelectorAll('.submenu').forEach(function(submenu) {
                    submenu.classList.remove('show');
                });
                document.querySelectorAll('.menu-toggle').forEach(function(toggle) {
                    toggle.classList.remove('open');
                    const icon = toggle.querySelector('.toggle-icon');
                    if (icon) {
                        icon.textContent = '+';
                    }
                });

                return;
            }

            // 解析搜索词，检查是否有多重约束
            const searchParts = searchTerm.split(/\s+/);
            const constraints = [];

            // 处理每个搜索部分
            searchParts.forEach(part => {
                let type = 'text';
                let value = part;

                // 检查是否是标签搜索
                if (part.startsWith('#')) {
                    type = 'tag';
                    value = part.substring(1);
                }
                // 检查是否是分类搜索
                else if (part.startsWith('@')) {
                    type = 'category';
                    value = part.substring(1);
                }
                // 检查是否是标题搜索
                else if (part.startsWith('!')) {
                    type = 'title';
                    value = part.substring(1);
                }
                // 检查是否是内容搜索
                else if (part.startsWith('~')) {
                    type = 'content';
                    value = part.substring(1);
                }

                constraints.push({ type, value });
            });

            // 查找匹配的菜单项
            let hasMatch = false;

            // 首先隐藏所有菜单项
            menuItems.forEach(function(item) {
                item.style.display = 'none';
            });

            // 然后显示匹配的菜单项
            menuItems.forEach(function(item) {
                // 默认所有约束都匹配
                let isMatch = constraints.length > 0;

                // 检查每个约束是否匹配
                for (const constraint of constraints) {
                    let constraintMatch = false;

                    if (constraint.type === 'tag') {
                        // 查找菜单项中的标签信息
                        const tags = item.getAttribute('data-tags') || '';
                        if (tags.toLowerCase().includes(constraint.value)) {
                            constraintMatch = true;
                        }

                        // 查找菜单项中的隐藏标签信息
                        const tagSpan = item.querySelector('.menu-item-tags');
                        if (tagSpan && tagSpan.textContent.toLowerCase().includes('#' + constraint.value)) {
                            constraintMatch = true;
                        }

                        // 如果菜单项文本中包含"#标签名"，也算匹配
                        const text = item.textContent.toLowerCase();
                        if (text.includes('#' + constraint.value)) {
                            constraintMatch = true;
                        }
                    } else if (constraint.type === 'category') {
                        // 查找菜单项中的分类信息
                        const category = item.getAttribute('data-category') || '';
                        if (category.toLowerCase().includes(constraint.value)) {
                            constraintMatch = true;
                        }

                        // 如果菜单项文本中包含分类名，也算匹配
                        const text = item.textContent.toLowerCase();
                        if (text.includes(constraint.value)) {
                            constraintMatch = true;
                        }
                    } else if (constraint.type === 'title') {
                        // 查找菜单项中的标题信息
                        const title = item.getAttribute('data-title') || '';
                        if (title.toLowerCase().includes(constraint.value)) {
                            constraintMatch = true;
                        }

                        // 如果菜单项文本中包含标题，也算匹配
                        const text = item.textContent.toLowerCase();
                        if (text.includes(constraint.value)) {
                            constraintMatch = true;
                        }
                    } else if (constraint.type === 'content') {
                        // 内容搜索在实时搜索中难以实现，默认匹配菜单项文本
                        const text = item.textContent.toLowerCase();
                        if (text.includes(constraint.value)) {
                            constraintMatch = true;
                        }
                    } else {
                        // 默认文本搜索
                        const text = item.textContent.toLowerCase();
                        if (text.includes(constraint.value)) {
                            constraintMatch = true;
                        }
                    }

                    // 如果任何一个约束不匹配，整个项目不匹配
                    if (!constraintMatch) {
                        isMatch = false;
                        break;
                    }
                }

                // 如果匹配，显示该菜单项
                if (isMatch) {
                    item.style.display = '';
                    hasMatch = true;

                    // 如果是子菜单项，确保其父菜单项可见并展开
                    let parent = item.parentElement;
                    while (parent) {
                        // 如果是子菜单容器
                        if (parent.classList.contains('submenu')) {
                            parent.classList.add('show');

                            // 找到对应的切换按钮并设置为打开状态
                            const toggleId = parent.id;
                            const toggle = document.querySelector(`[data-target="#${toggleId}"]`);
                            if (toggle) {
                                toggle.classList.add('open');
                                const icon = toggle.querySelector('.toggle-icon');
                                if (icon) {
                                    icon.textContent = '−';
                                }
                            }

                            // 确保父菜单项可见
                            const parentMenuItem = parent.closest('.menu-item');
                            if (parentMenuItem) {
                                parentMenuItem.style.display = '';
                            }
                        }

                        // 继续向上查找
                        parent = parent.parentElement;
                    }
                }
            });

            // 始终保持根菜单项可见
            document.querySelectorAll('.menu-root').forEach(function(root) {
                root.style.display = '';
            });

            // 如果没有找到匹配项，显示提示消息
            if (!hasMatch) {
                const msg = document.createElement('div');
                msg.className = 'no-search-results';
                msg.textContent = '没有找到匹配的项目';
                menuSearchInput.parentNode.appendChild(msg);
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Check if we're on an article page or a list page
            const articleMenu = document.querySelector('.article-menu');
            const listMenu = document.querySelector('.list-menu');

            if (articleMenu) {
                articleMenu.classList.toggle('mobile-visible');
            } else if (listMenu) {
                listMenu.classList.toggle('mobile-visible');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.article-menu') &&
            !event.target.closest('.list-menu') &&
            !event.target.closest('#mobile-menu-toggle')) {

            const mobileVisibleMenu = document.querySelector('.mobile-visible');
            if (mobileVisibleMenu) {
                mobileVisibleMenu.classList.remove('mobile-visible');
            }
        }
    });
});
