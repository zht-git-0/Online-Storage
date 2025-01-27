/**
 * AI导航搜索模块
 * 提供在线API搜索和离线搜索功能
 */
class AISearch {
    /**
     * 初始化搜索模块
     * @param {Object} config 配置项
     * @param {string} config.apiUrl API基础URL
     * @param {number} config.debounceTime 防抖延迟时间（毫秒）
     * @param {Function} config.onRender 渲染回调函数
     * @param {Object} config.defaultData 默认数据
     */
    constructor(config) {
        this.config = {
            apiUrl: '/api/search',
            debounceTime: 300,
            onRender: () => {},
            defaultData: null,
            ...config
        };

        this.searchBox = document.querySelector('.search-box');
        this.searchInput = this.searchBox.querySelector('input');
        this.searchStatus = this.searchBox.querySelector('.search-status');
        this.searchTimeout = null;
        this.isOffline = false;

        this.init();
    }

    /**
     * 初始化搜索功能
     * @private
     */
    init() {
        this.setupSearchListener();
        this.setupNetworkListeners();
    }

    /**
     * 设置搜索监听器
     * @private
     */
    setupSearchListener() {
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim().toLowerCase();
            clearTimeout(this.searchTimeout);

            if (!searchTerm) {
                this.resetSearch();
                return;
            }

            this.searchTimeout = setTimeout(() => {
                this.performSearch(searchTerm);
            }, this.config.debounceTime);
        });
    }

    /**
     * 设置网络状态监听器
     * @private
     */
    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOffline = false;
            this.searchInput.dispatchEvent(new Event('input'));
        });

        window.addEventListener('offline', () => {
            this.isOffline = true;
            this.searchStatus.textContent = '已切换到离线搜索模式';
        });
    }

    /**
     * 执行搜索
     * @private
     * @param {string} searchTerm 搜索关键词
     */
    async performSearch(searchTerm) {
        try {
            this.setLoading(true);

            let data;
            if (this.isOffline) {
                data = this.performLocalSearch(searchTerm);
            } else {
                data = await this.performAPISearch(searchTerm);
            }

            this.handleSearchResults(data);
        } catch (error) {
            this.handleSearchError(error);
        }
    }

    /**
     * 执行API搜索
     * @private
     * @param {string} searchTerm 搜索关键词
     * @returns {Promise<Object>} 搜索结果
     */
    async performAPISearch(searchTerm) {
        const response = await fetch(`${this.config.apiUrl}?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('搜索请求失败');
        return await response.json();
    }

    /**
     * 执行本地搜索
     * @private
     * @param {string} searchTerm 搜索关键词
     * @returns {Object} 搜索结果
     */
    performLocalSearch(searchTerm) {
        const filteredCategories = this.config.defaultData.categories.map(category => ({
            name: category.name,
            tools: category.tools.filter(tool => 
                tool.name.toLowerCase().includes(searchTerm) ||
                tool.description.toLowerCase().includes(searchTerm)
            )
        })).filter(category => category.tools.length > 0);

        return { categories: filteredCategories };
    }

    /**
     * 处理搜索结果
     * @private
     * @param {Object} data 搜索结果数据
     */
    handleSearchResults(data) {
        this.setLoading(false);

        if (data.categories.length === 0 || data.categories.every(cat => cat.tools.length === 0)) {
            this.showNoResults();
        } else {
            this.searchBox.classList.remove('no-results');
            this.config.onRender(data.categories);
        }
    }

    /**
     * 处理搜索错误
     * @private
     * @param {Error} error 错误对象
     */
    handleSearchError(error) {
        console.error('搜索出错:', error);
        this.setLoading(false);
        this.searchBox.classList.add('no-results');
        this.searchStatus.textContent = '搜索出错，请稍后重试';
    }

    /**
     * 设置加载状态
     * @private
     * @param {boolean} isLoading 是否正在加载
     */
    setLoading(isLoading) {
        if (isLoading) {
            this.searchBox.classList.add('loading');
            this.searchStatus.textContent = '正在搜索...';
        } else {
            this.searchBox.classList.remove('loading');
        }
    }

    /**
     * 显示无结果状态
     * @private
     */
    showNoResults() {
        this.searchBox.classList.add('no-results');
        this.searchStatus.textContent = '未找到相关工具';
        this.config.onRender([]);
    }

    /**
     * 重置搜索状态
     * @private
     */
    resetSearch() {
        this.searchBox.classList.remove('loading', 'no-results');
        this.config.onRender(this.config.defaultData.categories);
    }
} 