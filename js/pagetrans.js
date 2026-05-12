document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.classList.add('loaded');
    }
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.id === 'fallback-auth-link' || !link.href || link.href === '#' || link.href === window.location.href) return;

        e.preventDefault(); 
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.classList.add('fading');
            setTimeout(() => {
                window.location.href = link.href;
            }, 1000); 
        } else {
            window.location.href = link.href;
        }
    });
});