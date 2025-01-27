class StarryBackground {
    constructor() {
        this.background = document.querySelector('.tech-background');
        this.init();
        this.generateStars();
    }

    init() {
        // 添加点击事件监听
        document.addEventListener('click', this.createStar.bind(this));
    }

    // 生成随机星星
    generateStars() {
        // 生成小星星
        const smallStars = this.generateStarGradients(15, 1, 0.9);
        // 生成中星星
        const mediumStars = this.generateStarGradients(15, 1.5, 1);

        // 创建样式元素
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .tech-background::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: ${smallStars};
                background-size: 550px 550px;
                animation: twinkleSmall 3s ease-in-out infinite;
            }
            
            .tech-background::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: ${mediumStars};
                background-size: 400px 400px;
                animation: twinkleMedium 4s ease-in-out infinite;
            }
        `;

        // 移除旧的样式（如果存在）
        const oldStyle = document.getElementById('dynamic-stars');
        if (oldStyle) {
            oldStyle.remove();
        }

        // 添加新的样式
        styleElement.id = 'dynamic-stars';
        document.head.appendChild(styleElement);
    }

    // 生成星星渐变
    generateStarGradients(count, size, opacity) {
        const gradients = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * 100; // 随机x位置
            const y = Math.random() * 100; // 随机y位置
            const starOpacity = opacity * (0.8 + Math.random() * 0.2); // 随机不透明度
            gradients.push(
                `radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255, 255, 255, ${starOpacity}) 50%, transparent)`
            );
        }
        return gradients.join(',');
    }

    createStar(event) {
        // 只在背景上点击时创建星星
        if (event.target.classList.contains('tech-background') || 
            event.target.classList.contains('stars')) {
            const star = document.createElement('div');
            star.className = 'click-star';
            
            // 设置星星位置为点击位置
            star.style.left = `${event.clientX}px`;
            star.style.top = `${event.clientY}px`;
            
            // 将星星添加到背景中
            this.background.appendChild(star);
            
            // 动画结束后移除星星元素
            star.addEventListener('animationend', () => {
                star.remove();
            });
        }
    }
}

// 页面加载完成后初始化背景
document.addEventListener('DOMContentLoaded', () => {
    new StarryBackground();
}); 