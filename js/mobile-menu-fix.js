<<<<<<< HEAD
// 最简单直接的移动菜单实现
window.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu fix script loaded');
    
    // 直接获取移动菜单按钮
    var mobileMenu = document.querySelector('.mobile-menu');
    var navWrapper = document.querySelector('.nav-wrapper');
    
    if (mobileMenu && navWrapper) {
        console.log('Mobile menu elements found');
        
        // 直接添加点击事件，不使用任何复杂的处理
        mobileMenu.onclick = function(e) {
            console.log('Mobile menu button clicked');
            
            // 切换active类
            navWrapper.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // 阻止事件冒泡和默认行为
            e.preventDefault();
            e.stopPropagation();
            
            return false;
        };
        
        // 添加点击事件到移动菜单中的图标（以防事件目标是图标而不是父div）
        var menuIcon = mobileMenu.querySelector('i');
        if (menuIcon) {
            menuIcon.onclick = function(e) {
                console.log('Menu icon clicked');
                
                // 触发父元素的点击事件
                var clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                mobileMenu.dispatchEvent(clickEvent);
                
                // 阻止事件冒泡和默认行为
                e.preventDefault();
                e.stopPropagation();
                
                return false;
            };
        }
        
        // 下拉菜单处理
        var dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(function(dropdown) {
            var link = dropdown.querySelector('.nav-link');
            if (link) {
                link.onclick = function(e) {
                    if (window.innerWidth <= 768) {
                        console.log('Dropdown clicked');
                        dropdown.classList.toggle('active');
                        e.preventDefault();
                        return false;
                    }
                };
            }
        });
    } else {
        console.error('Mobile menu elements not found!');
    }
});
=======
// Script específico para arreglar el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu fix script loaded');
    
    // Seleccionar el botón del menú móvil y el contenedor del menú
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    if (mobileMenuBtn && navWrapper) {
        console.log('Mobile menu elements found');
        
        // Asegurarse de que el botón sea visible en móvil
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'flex';
        }
        
        // Agregar evento de clic al botón del menú
        mobileMenuBtn.addEventListener('click', function(e) {
            console.log('Mobile menu button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Alternar la clase active para mostrar/ocultar el menú
            navWrapper.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Manejar los dropdowns en móvil
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            
            if (dropdownLink) {
                dropdownLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    } else {
        console.error('Mobile menu elements not found');
    }
});
>>>>>>> da413b58bff9f299fb94f2354221c20899028e68
