document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                // Ép kiểm tra bản cập nhật mới nhất từ Render ngay lập tức
                registration.update();
       
                if (registration.active) {
                    
                } else if (registration.installing) {
                    registration.installing.addEventListener('statechange', () => {
                        if (registration.active) {
                        }
                    });
                } else if (registration.waiting) {
                }
            })
            .catch(error => {
                document.dispatchEvent(new CustomEvent('showNotification', {
                    detail: { message: 'Không thể đăng ký Service Worker: ' + error.message, type: 'error' }
                }));
            });
        navigator.serviceWorker.addEventListener('controllerchange', () => {
        });
    } 
    
});