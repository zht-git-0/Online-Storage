class MouseTrail {
    constructor(options = {}) {
        this.options = {
            trailLength: 10,     // 拖尾长度，决定跟随鼠标的点的数量
            smoothing: 0,     // 平滑系数(0-1): 
                                // - 值越小(接近0)，运动越平滑，但跟随延迟越大
                                // - 值越大(接近1)，跟随越快，但可能出现抖动
                                // - 0.15是一个比较好的平衡值，既保证了平滑性又不会有太大延迟
            ...options
        };
        
        this.trails = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastTime = performance.now();
        
        this.init();
    }
    
    init() {
        // 创建拖尾元素
        for (let i = 0; i < this.options.trailLength; i++) {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            document.body.appendChild(trail);
            this.trails.push({
                element: trail,
                x: 0,
                y: 0,
                scale: 1 - (i * 0.1)  // 逐渐缩小的尺寸
            });
        }
        
        // 添加事件监听
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('mouseout', this.handleMouseOut.bind(this));
        
        // 启动动画循环
        this.animate();
    }
    
    handleMouseMove(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        
        // 显示所有拖尾元素
        this.trails.forEach(trail => {
            trail.element.style.opacity = Math.max(1 - (this.trails.indexOf(trail) * 0.04), 0.1);
        });
    }
    
    handleMouseOut() {
        // 鼠标离开窗口时保持最后的状态
        this.trails.forEach(trail => {
            trail.element.style.opacity = Math.max(1 - (this.trails.indexOf(trail) * 0.04), 0.1);
        });
    }
    
    animate() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 16; // 基于60fps归一化
        this.lastTime = currentTime;
        
        let currentX = this.mouseX;
        let currentY = this.mouseY;
        
        this.trails.forEach((trail, index) => {
            // 平滑跟随计算:
            // 1. smoothing * deltaTime: 根据帧率调整平滑系数，保证不同帧率下的表现一致
            // 2. dx和dy: 计算当前点到目标位置的距离
            // 3. trail.x/y += dx/dy * smoothing: 每帧移动一小段距离(比例由smoothing决定)
            const smoothing = this.options.smoothing * deltaTime;
            const dx = currentX - trail.x;  // x方向上距离目标位置的差值
            const dy = currentY - trail.y;  // y方向上距离目标位置的差值
            
            trail.x += dx * smoothing;  // 向目标位置移动一小段距离
            trail.y += dy * smoothing;  // 距离由smoothing系数控制
            
            // 更新元素位置和样式
            const scale = trail.scale;
            trail.element.style.transform = `translate(${trail.x - 4}px, ${trail.y - 4}px) scale(${scale})`;
            
            // 更新下一个点的目标位置
            currentX = trail.x;
            currentY = trail.y;
        });
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// 页面加载完成后初始化鼠标拖尾效果
document.addEventListener('DOMContentLoaded', () => {
    new MouseTrail({
        trailLength: 10,     // 拖尾长度
        smoothing: 0.6     // 平滑系数
    });
}); 