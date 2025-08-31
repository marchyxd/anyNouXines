// 语言选择器交互
// 下拉菜单点击切换

document.addEventListener('DOMContentLoaded', () => {
    // 移动菜单切换
    const mobileMenu = document.querySelector('.mobile-menu');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (mobileMenu && navWrapper) {
        mobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navWrapper.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            console.log('Mobile menu clicked!');
        });
    }

    // 下拉菜单交互（移动端）
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // 语言选择器交互
    const languageSelectors = document.querySelectorAll('.language-selector select');
    languageSelectors.forEach(selector => {
        selector.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            console.log(`Selected language: ${selectedLanguage}`);
            
            // 这里可以添加实际的语言切换逻辑
            // 例如：切换页面内容、更新 URL、存储语言偏好等
            
            // 示例：简单的本地存储
            try {
                localStorage.setItem('selectedLanguage', selectedLanguage);
            } catch (error) {
                console.error('Unable to save language preference', error);
            }
        });

        // 恢复之前保存的语言偏好
        try {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                selector.value = savedLanguage;
            }
        } catch (error) {
            console.error('Unable to retrieve language preference', error);
        }
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
