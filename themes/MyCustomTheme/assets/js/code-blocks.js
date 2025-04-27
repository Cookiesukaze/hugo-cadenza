document.addEventListener('DOMContentLoaded', function() {
    // Process all code blocks
    processCodeBlocks();
});

function processCodeBlocks() {
    // Find all pre > code elements
    const codeBlocks = document.querySelectorAll('pre > code');

    codeBlocks.forEach((codeBlock, index) => {
        // Get the parent pre element
        const preElement = codeBlock.parentNode;

        // Skip if already processed
        if (preElement.classList.contains('processed')) {
            return;
        }

        // Mark as processed
        preElement.classList.add('processed');

        // Get language from class (e.g., language-javascript)
        let language = 'text';
        codeBlock.classList.forEach(className => {
            if (className.startsWith('language-')) {
                language = className.replace('language-', '');
            }
        });

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        // Create header
        const header = document.createElement('div');
        header.className = 'code-block-header';

        // Create header left section
        const headerLeft = document.createElement('div');
        headerLeft.className = 'header-left';

        // Add fold button
        const foldButton = document.createElement('button');
        foldButton.className = 'fold-button';
        foldButton.setAttribute('aria-label', '折叠/展开代码');
        foldButton.setAttribute('aria-expanded', 'true');
        foldButton.setAttribute('title', '折叠/展开代码');
        foldButton.innerHTML = '<span class="icon">▼</span>';
        foldButton.onclick = function() {
            toggleCodeVisibility(this, contentContainer);
        };
        headerLeft.appendChild(foldButton);

        // Add language indicator
        const languageIndicator = document.createElement('span');
        languageIndicator.className = 'code-language';
        languageIndicator.textContent = language;
        headerLeft.appendChild(languageIndicator);

        header.appendChild(headerLeft);

        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';
        copyButton.setAttribute('aria-label', '复制代码');
        copyButton.onclick = function() {
            copyCodeToClipboard(codeBlock.textContent, copyButton);
        };
        header.appendChild(copyButton);

        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'code-block-content';

        // Create container for line numbers and code
        const codeWithLineNumbers = document.createElement('div');
        codeWithLineNumbers.className = 'code-with-line-numbers';

        // Create line numbers
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';

        // Count lines
        const lines = codeBlock.textContent.split('\n');
        const lineCount = lines.length;

        // Add line numbers
        for (let i = 1; i <= lineCount; i++) {
            const lineNumber = document.createElement('span');
            lineNumber.className = 'line-number';
            lineNumber.textContent = i;
            lineNumbers.appendChild(lineNumber);
        }

        // Create code content container
        const codeContent = document.createElement('div');
        codeContent.className = 'code-content';
        codeContent.appendChild(codeBlock.cloneNode(true));

        // Assemble the structure
        codeWithLineNumbers.appendChild(lineNumbers);
        codeWithLineNumbers.appendChild(codeContent);
        contentContainer.appendChild(codeWithLineNumbers);

        wrapper.appendChild(header);
        wrapper.appendChild(contentContainer);

        // Replace the original pre element with our enhanced version
        preElement.parentNode.replaceChild(wrapper, preElement);
    });
}

function toggleCodeVisibility(button, contentContainer) {
    // Toggle folded class on button
    button.classList.toggle('folded');

    // Toggle visibility of code content
    if (button.classList.contains('folded')) {
        contentContainer.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
    } else {
        contentContainer.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
    }
}

function copyCodeToClipboard(code, button) {
    navigator.clipboard.writeText(code).then(function() {
        // Success feedback
        const originalText = button.textContent;
        button.textContent = '已复制!';
        button.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(function() {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }, function(err) {
        console.error('无法复制代码: ', err);
        button.textContent = '复制失败';

        // Reset after 2 seconds
        setTimeout(function() {
            button.textContent = '复制';
        }, 2000);
    });
}
