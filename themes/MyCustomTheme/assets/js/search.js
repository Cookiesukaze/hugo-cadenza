// 搜索功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索表单和输入框
    const searchForms = document.querySelectorAll('.search-form');

    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search-field');
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                // 重定向到搜索结果页面
                window.location.href = `/search/?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    });

    // 处理搜索结果页面的搜索功能
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (query && document.querySelector('#search-results')) {
        document.querySelector('#search-query').textContent = query;
        performSearch(query);
    }
});

// 执行搜索
function performSearch(query) {
    const resultsContainer = document.querySelector('#search-results');
    const loadingElement = document.querySelector('#search-loading');

    if (!resultsContainer) return;

    // 显示加载状态
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }

    // 获取搜索索引
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            // 解析查询
            const { searchType, searchTerm, constraints } = parseSearchQuery(query);

            // 根据搜索类型过滤结果
            let results = [];

            if (searchType === 'multi') {
                // 多重约束搜索
                results = data;

                // 依次应用每个约束
                constraints.forEach(constraint => {
                    switch (constraint.type) {
                        case 'category':
                            results = results.filter(item => {
                                if (item.section) {
                                    return item.section.toLowerCase().includes(constraint.term.toLowerCase());
                                }
                                return false;
                            });
                            break;
                        case 'title':
                            results = results.filter(item =>
                                item.title.toLowerCase().includes(constraint.term.toLowerCase())
                            );
                            break;
                        case 'content':
                            results = results.filter(item => {
                                if (item.content) {
                                    return item.content.toLowerCase().includes(constraint.term.toLowerCase());
                                }
                                return false;
                            });
                            break;
                        case 'tag':
                            results = results.filter(item => {
                                if (item.tags && Array.isArray(item.tags)) {
                                    return item.tags.some(tag =>
                                        tag.toLowerCase().includes(constraint.term.toLowerCase())
                                    );
                                }
                                return false;
                            });
                            break;
                        default:
                            // 'all' 类型的约束
                            results = results.filter(item => {
                                // 搜索标题
                                if (item.title.toLowerCase().includes(constraint.term.toLowerCase())) {
                                    return true;
                                }

                                // 搜索内容
                                if (item.content && item.content.toLowerCase().includes(constraint.term.toLowerCase())) {
                                    return true;
                                }

                                // 搜索分类
                                if (item.section && item.section.toLowerCase().includes(constraint.term.toLowerCase())) {
                                    return true;
                                }

                                // 搜索标签
                                if (item.tags && Array.isArray(item.tags)) {
                                    return item.tags.some(tag =>
                                        tag.toLowerCase().includes(constraint.term.toLowerCase())
                                    );
                                }

                                return false;
                            });
                    }
                });
            } else {
                // 单一约束搜索
                switch (searchType) {
                    case 'category':
                        results = searchCategories(data, searchTerm);
                        break;
                    case 'title':
                        results = searchTitles(data, searchTerm);
                        break;
                    case 'content':
                        results = searchContents(data, searchTerm);
                        break;
                    case 'tag':
                        results = searchTags(data, searchTerm);
                        break;
                    default:
                        // 默认搜索所有
                        results = searchAll(data, searchTerm);
                }
            }

            // 显示结果
            displayResults(results, searchType, searchTerm, constraints);

            // 隐藏加载状态
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('搜索出错:', error);
            resultsContainer.innerHTML = '<p class="search-error">搜索时发生错误，请稍后再试。</p>';

            // 隐藏加载状态
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        });
}

// 解析搜索查询
function parseSearchQuery(query) {
    // 将查询拆分为多个部分（按空格分割）
    const queryParts = query.trim().split(/\s+/);
    const constraints = [];

    // 处理每个查询部分
    queryParts.forEach(part => {
        if (part.startsWith('#')) {
            constraints.push({ type: 'tag', term: part.substring(1).trim() });
        } else if (part.startsWith('@')) {
            constraints.push({ type: 'category', term: part.substring(1).trim() });
        } else if (part.startsWith('!')) {
            constraints.push({ type: 'title', term: part.substring(1).trim() });
        } else if (part.startsWith('~')) {
            constraints.push({ type: 'content', term: part.substring(1).trim() });
        } else {
            constraints.push({ type: 'all', term: part.trim() });
        }
    });

    // 如果没有约束，则默认搜索所有
    if (constraints.length === 0) {
        return { searchType: 'all', searchTerm: query.trim(), constraints: [{ type: 'all', term: query.trim() }] };
    }

    // 如果只有一个约束，使用旧的格式返回结果
    if (constraints.length === 1) {
        return { searchType: constraints[0].type, searchTerm: constraints[0].term, constraints };
    }

    // 如果有多个约束，返回多重约束
    return { searchType: 'multi', searchTerm: query.trim(), constraints };
}

// 搜索分类
function searchCategories(data, term) {
    const lowerTerm = term.toLowerCase();

    return data.filter(item => {
        // 1. 搜索 section 字段
        if (item.section && item.section.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 2. 搜索 categories 数组
        if (item.categories && Array.isArray(item.categories)) {
            if (item.categories.some(cat => cat.toLowerCase().includes(lowerTerm))) {
                return true;
            }
        }

        // 3. 搜索 title 字段（标题通常包含分类信息）
        if (item.title && item.title.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 4. 搜索 parent 字段（父级标题）
        if (item.parent && item.parent.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 5. 搜索 ancestors 数组（所有祖先页面）
        if (item.ancestors && Array.isArray(item.ancestors)) {
            if (item.ancestors.some(ancestor =>
                ancestor.title && ancestor.title.toLowerCase().includes(lowerTerm)
            )) {
                return true;
            }
        }

        // 6. 搜索 URL 路径部分
        if (item.permalink) {
            // 提取 URL 路径部分
            const urlPath = new URL(item.permalink).pathname;
            // 检查路径中是否包含搜索词
            if (urlPath.toLowerCase().includes('/' + lowerTerm + '/')) {
                return true;
            }

            // 检查路径的各个部分
            const pathParts = urlPath.split('/').filter(part => part);
            for (const part of pathParts) {
                if (part.toLowerCase() === lowerTerm) {
                    return true;
                }
            }
        }

        // 7. 搜索 url 和 relpermalink 字段
        if (item.url && item.url.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        if (item.relpermalink && item.relpermalink.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 8. 搜索 path 字段
        if (item.path && item.path.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        return false;
    });
}

// 搜索标题
function searchTitles(data, term) {
    const lowerTerm = term.toLowerCase();
    return data.filter(item => item.title.toLowerCase().includes(lowerTerm));
}

// 搜索内容
function searchContents(data, term) {
    const lowerTerm = term.toLowerCase();
    return data.filter(item => {
        if (item.content) {
            return item.content.toLowerCase().includes(lowerTerm);
        }
        return false;
    });
}

// 搜索标签
function searchTags(data, term) {
    const lowerTerm = term.toLowerCase();
    return data.filter(item => {
        if (item.tags && Array.isArray(item.tags)) {
            return item.tags.some(tag => tag.toLowerCase().includes(lowerTerm));
        }
        return false;
    });
}

// 搜索所有
function searchAll(data, term) {
    const lowerTerm = term.toLowerCase();
    return data.filter(item => {
        // 1. 搜索标题
        if (item.title && item.title.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 2. 搜索内容
        if (item.content && item.content.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 3. 搜索摘要
        if (item.summary && item.summary.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 4. 搜索分类
        if (item.section && item.section.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 5. 搜索 categories 数组
        if (item.categories && Array.isArray(item.categories)) {
            if (item.categories.some(cat => cat.toLowerCase().includes(lowerTerm))) {
                return true;
            }
        }

        // 6. 搜索 parent 字段（父级标题）
        if (item.parent && item.parent.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 7. 搜索 ancestors 数组（所有祖先页面）
        if (item.ancestors && Array.isArray(item.ancestors)) {
            if (item.ancestors.some(ancestor =>
                ancestor.title && ancestor.title.toLowerCase().includes(lowerTerm)
            )) {
                return true;
            }
        }

        // 8. 搜索 URL 路径
        if (item.permalink) {
            // 提取 URL 路径部分
            const urlPath = new URL(item.permalink).pathname;
            // 检查路径中是否包含搜索词
            if (urlPath.toLowerCase().includes('/' + lowerTerm + '/')) {
                return true;
            }

            // 检查路径的各个部分
            const pathParts = urlPath.split('/').filter(part => part);
            for (const part of pathParts) {
                if (part.toLowerCase() === lowerTerm) {
                    return true;
                }
            }
        }

        // 9. 搜索 relpermalink 字段

        if (item.relpermalink && item.relpermalink.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 10. 搜索 path 字段
        if (item.path && item.path.toLowerCase().includes(lowerTerm)) {
            return true;
        }

        // 11. 搜索标签
        if (item.tags && Array.isArray(item.tags)) {
            if (item.tags.some(tag => tag.toLowerCase().includes(lowerTerm))) {
                return true;
            }
        }

        return false;
    });
}

// 显示搜索结果
function displayResults(results, searchType, originalSearchTerm, constraints) {
    const resultsContainer = document.querySelector('#search-results');

    if (results.length === 0) {
        if (searchType === 'multi') {
            // 多重约束搜索无结果
            const constraintTexts = constraints.map(c => {
                if (c.type === 'tag') return `#${c.term}`;
                if (c.type === 'category') return `@${c.term}`;
                if (c.type === 'title') return `!${c.term}`;
                if (c.type === 'content') return `~${c.term}`;
                return c.term;
            }).join(' ');

            resultsContainer.innerHTML = `<p class="search-no-results">没有找到与 "${constraintTexts}" 相关的结果。</p>`;
        } else {
            // 单一约束搜索无结果
            resultsContainer.innerHTML = `<p class="search-no-results">没有找到与 "${originalSearchTerm}" 相关的${getSearchTypeName(searchType)}。</p>`;
        }
        return;
    }

    // 按相关性排序结果
    results.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // 如果是多重约束搜索
        if (searchType === 'multi' && constraints) {
            // 计算每个约束的匹配分数
            constraints.forEach(constraint => {
                // 标题匹配
                if (constraint.type === 'title' || constraint.type === 'all') {
                    if (a.title.toLowerCase().includes(constraint.term.toLowerCase())) scoreA += 3;
                    if (b.title.toLowerCase().includes(constraint.term.toLowerCase())) scoreB += 3;
                }

                // 标签匹配
                if (constraint.type === 'tag' || constraint.type === 'all') {
                    if (a.tags && a.tags.some(tag => tag.toLowerCase().includes(constraint.term.toLowerCase()))) scoreA += 2;
                    if (b.tags && b.tags.some(tag => tag.toLowerCase().includes(constraint.term.toLowerCase()))) scoreB += 2;
                }

                // 分类匹配
                if (constraint.type === 'category' || constraint.type === 'all') {
                    const lowerTerm = constraint.term.toLowerCase();

                    // 1. 检查 section 字段
                    if (a.section && a.section.toLowerCase().includes(lowerTerm)) scoreA += 1;
                    if (b.section && b.section.toLowerCase().includes(lowerTerm)) scoreB += 1;

                    // 2. 检查 categories 数组
                    if (a.categories && Array.isArray(a.categories)) {
                        if (a.categories.some(cat => cat.toLowerCase().includes(lowerTerm))) scoreA += 2;
                    }

                    if (b.categories && Array.isArray(b.categories)) {
                        if (b.categories.some(cat => cat.toLowerCase().includes(lowerTerm))) scoreB += 2;
                    }

                    // 3. 检查 title 字段（标题通常包含分类信息）
                    if (a.title && a.title.toLowerCase().includes(lowerTerm)) scoreA += 1;
                    if (b.title && b.title.toLowerCase().includes(lowerTerm)) scoreB += 1;

                    // 4. 检查 parent 字段（父级标题）
                    if (a.parent && a.parent.toLowerCase().includes(lowerTerm)) scoreA += 2;
                    if (b.parent && b.parent.toLowerCase().includes(lowerTerm)) scoreB += 2;

                    // 5. 检查 ancestors 数组（所有祖先页面）
                    if (a.ancestors && Array.isArray(a.ancestors)) {
                        if (a.ancestors.some(ancestor =>
                            ancestor.title && ancestor.title.toLowerCase().includes(lowerTerm)
                        )) scoreA += 2;
                    }

                    if (b.ancestors && Array.isArray(b.ancestors)) {
                        if (b.ancestors.some(ancestor =>
                            ancestor.title && ancestor.title.toLowerCase().includes(lowerTerm)
                        )) scoreB += 2;
                    }

                    // 6. 检查 permalink 中的路径部分
                    if (a.permalink) {
                        const urlPathA = new URL(a.permalink).pathname;
                        if (urlPathA.toLowerCase().includes('/' + lowerTerm + '/')) scoreA += 1;

                        const pathPartsA = urlPathA.split('/').filter(part => part);
                        for (const part of pathPartsA) {
                            if (part.toLowerCase() === lowerTerm) {
                                scoreA += 1;
                                break;
                            }
                        }
                    }

                    if (b.permalink) {
                        const urlPathB = new URL(b.permalink).pathname;
                        if (urlPathB.toLowerCase().includes('/' + lowerTerm + '/')) scoreB += 1;

                        const pathPartsB = urlPathB.split('/').filter(part => part);
                        for (const part of pathPartsB) {
                            if (part.toLowerCase() === lowerTerm) {
                                scoreB += 1;
                                break;
                            }
                        }
                    }

                    // 7. 检查 relpermalink 字段

                    if (a.relpermalink && a.relpermalink.toLowerCase().includes(lowerTerm)) scoreA += 1;
                    if (b.relpermalink && b.relpermalink.toLowerCase().includes(lowerTerm)) scoreB += 1;

                    // 8. 检查 path 字段
                    if (a.path && a.path.toLowerCase().includes(lowerTerm)) scoreA += 1;
                    if (b.path && b.path.toLowerCase().includes(lowerTerm)) scoreB += 1;
                }

                // 内容匹配
                if (constraint.type === 'content' || constraint.type === 'all') {
                    if (a.content && a.content.toLowerCase().includes(constraint.term.toLowerCase())) scoreA += 1;
                    if (b.content && b.content.toLowerCase().includes(constraint.term.toLowerCase())) scoreB += 1;
                }
            });
        } else {
            // 单一约束搜索
            // 标题匹配的优先级最高
            if (a.title.toLowerCase().includes(originalSearchTerm.toLowerCase())) scoreA += 3;
            if (b.title.toLowerCase().includes(originalSearchTerm.toLowerCase())) scoreB += 3;

            // 其次是标签匹配
            if (a.tags && a.tags.some(tag => tag.toLowerCase().includes(originalSearchTerm.toLowerCase()))) scoreA += 2;
            if (b.tags && b.tags.some(tag => tag.toLowerCase().includes(originalSearchTerm.toLowerCase()))) scoreB += 2;
        }

        // 如果分数不同，按分数排序
        if (scoreA !== scoreB) {
            return scoreB - scoreA;
        }

        // 最后是日期排序
        return new Date(b.date) - new Date(a.date);
    });

    // 客户端分页
    const paginateResults = (items, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    };

    // 获取当前页码和每页显示数量
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1;
    let itemsPerPage = parseInt(urlParams.get('per_page')) || 5;

    // 确保页码和每页显示数量有效
    currentPage = Math.max(1, currentPage);
    itemsPerPage = Math.max(5, Math.min(100, itemsPerPage));

    // 计算总页数
    const totalPages = Math.ceil(results.length / itemsPerPage);

    // 如果当前页码超出范围，调整为最后一页
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    // 获取当前页的结果
    const paginatedResults = paginateResults(results, currentPage, itemsPerPage);

    // 构建结果HTML
    let html = `<p class="search-count">找到 ${results.length} 个结果</p>`;
    html += '<div class="search-results-list">';

    paginatedResults.forEach(item => {
        // 获取搜索词
        let searchTerm = originalSearchTerm;
        if (searchType === 'multi' && constraints) {
            // 对于多重约束搜索，使用所有约束词
            searchTerm = constraints.map(c => c.term).join(' ');
        }

        // 提取匹配的文本段落
        let matchedText = '';

        // 根据搜索类型提取匹配文本
        if (searchType === 'content' || searchType === 'all') {
            matchedText = extractMatchedText(item.content, searchTerm);
        } else if (searchType === 'title') {
            matchedText = extractMatchedText(item.title, searchTerm);
        } else if (searchType === 'tag' && item.tags) {
            // 对于标签搜索，显示包含该标签的内容摘要
            matchedText = item.summary || item.content.substring(0, 200) + '...';
        } else if (searchType === 'category') {
            // 对于分类搜索，显示内容摘要
            matchedText = item.summary || item.content.substring(0, 200) + '...';
        } else if (searchType === 'multi') {
            // 对于多重约束搜索，尝试从内容中提取匹配文本
            for (const constraint of constraints) {
                const extractedText = extractMatchedText(item.content, constraint.term);
                if (extractedText) {
                    matchedText = extractedText;
                    break;
                }
            }

            // 如果没有找到匹配文本，使用摘要
            if (!matchedText) {
                matchedText = item.summary || item.content.substring(0, 200) + '...';
            }
        }

        // 如果没有找到匹配文本，使用摘要
        if (!matchedText) {
            matchedText = item.summary || '';
        }

        // 获取完整路径
        let fullPath = '';
        if (item.relpermalink) {
            fullPath = item.relpermalink;
        } else if (item.permalink) {
            const url = new URL(item.permalink);
            fullPath = url.pathname;
        }

        html += `
            <div class="search-result-item">
                <h3 class="search-result-title">
                    <a href="${item.permalink}">${item.title}</a>
                </h3>
                <div class="search-result-path">${fullPath}</div>
                ${matchedText ? `<div class="search-result-matched-text">${matchedText}</div>` : ''}
            </div>
        `;
    });

    html += '</div>';

    // 添加分页控件
    if (totalPages > 1) {
        html += createClientPagination(currentPage, totalPages, itemsPerPage, searchType, originalSearchTerm, constraints);
    }

    resultsContainer.innerHTML = html;

    // 添加分页事件监听器
    setTimeout(() => {
        setupClientPaginationEvents();
    }, 100);
}

// 获取搜索类型名称
function getSearchTypeName(searchType) {
    switch (searchType) {
        case 'category':
            return '分类';
        case 'title':
            return '标题';
        case 'content':
            return '内容';
        case 'tag':
            return '标签';
        default:
            return '结果';
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

// 提取匹配的文本段落并高亮
function extractMatchedText(content, term, contextLength = 100) {
    if (!content || !term) return '';

    const lowerContent = content.toLowerCase();
    const lowerTerm = term.toLowerCase();
    const index = lowerContent.indexOf(lowerTerm);

    if (index === -1) return '';

    // 计算上下文的起始和结束位置
    let start = Math.max(0, index - contextLength);
    let end = Math.min(content.length, index + term.length + contextLength);

    // 调整起始位置到单词边界
    while (start > 0 && content[start] !== ' ' && content[start] !== '.') {
        start--;
    }

    // 调整结束位置到单词边界
    while (end < content.length && content[end] !== ' ' && content[end] !== '.') {
        end++;
    }

    // 提取上下文
    let extractedText = content.substring(start, end);

    // 如果不是从头开始，添加省略号
    if (start > 0) {
        extractedText = '...' + extractedText;
    }

    // 如果不是到末尾结束，添加省略号
    if (end < content.length) {
        extractedText = extractedText + '...';
    }

    // 高亮匹配的词
    const regex = new RegExp(escapeRegExp(term), 'gi');
    return extractedText.replace(regex, match => `<mark>${match}</mark>`);
}

// 转义正则表达式中的特殊字符
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 创建客户端分页控件
function createClientPagination(currentPage, totalPages, itemsPerPage, searchType, searchTerm, constraints) {
    const paginationRange = 3;

    // 计算显示的页码范围
    const startPage = Math.max(1, currentPage - paginationRange);
    const endPage = Math.min(totalPages, currentPage + paginationRange);

    let html = '<div class="pagination-container">';

    // 分页导航
    html += '<div class="pagination">';

    // 首页按钮
    if (currentPage !== 1) {
        html += `<a href="javascript:void(0);" class="pagination-item pagination-first" data-page="1" title="首页">
            <span class="pagination-icon">«</span>
        </a>`;
    } else {
        html += `<span class="pagination-item pagination-first disabled" title="首页">
            <span class="pagination-icon">«</span>
        </span>`;
    }

    // 上一页按钮
    if (currentPage > 1) {
        html += `<a href="javascript:void(0);" class="pagination-item pagination-prev" data-page="${currentPage - 1}" title="上一页">
            <span class="pagination-icon">‹</span>
        </a>`;
    } else {
        html += `<span class="pagination-item pagination-prev disabled" title="上一页">
            <span class="pagination-icon">‹</span>
        </span>`;
    }

    // 如果起始页不是1，显示省略号
    if (startPage > 1) {
        html += `<a href="javascript:void(0);" class="pagination-item" data-page="1">1</a>`;
        if (startPage > 2) {
            html += `<span class="pagination-item pagination-ellipsis">...</span>`;
        }
    }

    // 显示页码
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            html += `<span class="pagination-item active">${i}</span>`;
        } else {
            html += `<a href="javascript:void(0);" class="pagination-item" data-page="${i}">${i}</a>`;
        }
    }

    // 如果结束页不是最后一页，显示省略号
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<span class="pagination-item pagination-ellipsis">...</span>`;
        }
        html += `<a href="javascript:void(0);" class="pagination-item" data-page="${totalPages}">${totalPages}</a>`;
    }

    // 下一页按钮
    if (currentPage < totalPages) {
        html += `<a href="javascript:void(0);" class="pagination-item pagination-next" data-page="${currentPage + 1}" title="下一页">
            <span class="pagination-icon">›</span>
        </a>`;
    } else {
        html += `<span class="pagination-item pagination-next disabled" title="下一页">
            <span class="pagination-icon">›</span>
        </span>`;
    }

    // 末页按钮
    if (currentPage !== totalPages) {
        html += `<a href="javascript:void(0);" class="pagination-item pagination-last" data-page="${totalPages}" title="末页">
            <span class="pagination-icon">»</span>
        </a>`;
    } else {
        html += `<span class="pagination-item pagination-last disabled" title="末页">
            <span class="pagination-icon">»</span>
        </span>`;
    }

    html += '</div>'; // 结束 pagination

    // 页码跳转
    html += `<div class="pagination-jump">
        <form class="pagination-jump-form" action="javascript:void(0);">
            <span class="pagination-jump-text">跳转到</span>
            <input type="number" class="pagination-jump-input" min="1" max="${totalPages}" value="${currentPage}" aria-label="页码">
            <span class="pagination-jump-text">页</span>
            <button type="submit" class="pagination-jump-button">确定</button>
        </form>
    </div>`;

    // 每页显示数量选择器
    html += `<div class="pagination-size-selector">
        <span class="pagination-size-text">每页显示:</span>
        <select class="pagination-size-select">`;

    // 每页显示数量选项
    [5, 10, 20, 50, 100].forEach(size => {
        html += `<option value="${size}" ${itemsPerPage === size ? 'selected' : ''}>${size}</option>`;
    });

    html += `</select>
    </div>`;

    html += '</div>'; // 结束 pagination-container

    return html;
}

// 设置客户端分页事件监听器
function setupClientPaginationEvents() {
    // 页码按钮点击事件
    document.querySelectorAll('.pagination-item[data-page]').forEach(item => {
        item.addEventListener('click', function() {
            const page = parseInt(this.getAttribute('data-page'));
            navigateToPage(page);
        });
    });

    // 页码跳转表单提交事件
    document.querySelector('.pagination-jump-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('.pagination-jump-input');
        const page = parseInt(input.value);
        const max = parseInt(input.max);

        if (page && page > 0 && page <= max) {
            navigateToPage(page);
        }
    });

    // 每页显示数量选择事件
    document.querySelector('.pagination-size-select')?.addEventListener('change', function() {
        const size = parseInt(this.value);
        navigateToPage(1, size);
    });
}

// 导航到指定页码
function navigateToPage(page, perPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPerPage = perPage || urlParams.get('per_page') || 5;
    const query = urlParams.get('q') || '';

    // 构建新的URL
    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(query)}&page=${page}&per_page=${currentPerPage}`;
    window.location.href = newUrl;
}
