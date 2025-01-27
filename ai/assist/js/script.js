// 加载AI工具数据
function loadAITools() {
    try {
        renderCategories(aiToolsData.categories);
    } catch (error) {
        console.error('Error loading AI tools:', error);
    }
}

// 渲染分类和工具卡片
function renderCategories(categories) {
    const container = document.querySelector('.container');
    
    // 删除现有的类别部分（保留搜索框）
    const existingSections = container.querySelectorAll('.category-section');
    existingSections.forEach(section => section.remove());

    categories.forEach(category => {
        const section = document.createElement('div');
        section.className = 'category-section';
        
        section.innerHTML = `
            <h2 class="category-title">${category.name}</h2>
            <div class="card-grid">
                ${category.tools.map(tool => `
                    <a href="${tool.url}" target="_blank" class="card">
                        <div class="card-icon">
                            <img src="${tool.icon}" alt="${tool.name} icon" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%236c5ce7%22></rect><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%220.35em%22 font-family=%22Arial%22 font-size=%2250%22 fill=%22white%22>${tool.name[0]}</text></svg>'">
                        </div>
                        <div class="card-content">
                            <h3>${tool.name}</h3>
                            <p>${tool.description}</p>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
        
        container.appendChild(section);
    });
}

// 获取初始数据
async function fetchInitialData() {
    try {
        const response = await fetch('https://zht-back-server.us.kg/api/tools');
        if (!response.ok) {
            throw new Error('Failed to fetch initial data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching initial data:', error);
        // 如果API请求失败，返回空分类列表
        return { categories: [] };
    }
}

// 添加点击创建星星的功能
function createClickStar(event) {
    // 只在背景上点击时创建星星
    if (event.target.classList.contains('tech-background') || 
        event.target.classList.contains('stars')) {
        const star = document.createElement('div');
        star.className = 'click-star';
        // 设置星星位置为点击位置
        star.style.left = event.clientX + 'px';
        star.style.top = event.clientY + 'px';
        
        // 将星星添加到背景中
        document.querySelector('.tech-background').appendChild(star);
        
        // 动画结束后移除星星元素
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    const initialData = await fetchInitialData();
    
    // Initialize search with the fetched data
    const search = new AISearch({
        apiUrl: 'https://zht-back-server.us.kg/api/search',
        defaultData: null,
        onRender: renderCategories,
        debounceTime: 300
    });
    
    // Initial render with the fetched data
    renderCategories(initialData.categories);

    // 添加点击事件监听器
    document.addEventListener('click', createClickStar);
}); 