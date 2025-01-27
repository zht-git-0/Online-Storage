# AI导航搜索模块文档

## 简介

AI导航搜索模块提供了一个完整的搜索解决方案，支持在线API搜索和离线搜索功能。该模块具有以下特点：

- 支持在线/离线搜索
- 自动网络状态检测
- 搜索防抖
- 加载状态显示
- 错误处理
- 可配置的API接口

## 安装

1. 将 `search.js` 文件添加到你的项目中
2. 在HTML文件中引入脚本：

```html
<script src="assist/search.js"></script>
```

## 基本用法

```javascript
// 初始化搜索模块
const search = new AISearch({
    apiUrl: '/api/search',          // API接口地址
    defaultData: aiToolsData,       // 默认数据（用于离线搜索）
    onRender: renderCategories,     // 渲染回调函数
    debounceTime: 300              // 搜索防抖时间（毫秒）
});
```

## API文档

### 配置选项

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| apiUrl | string | '/api/search' | 搜索API的基础URL |
| debounceTime | number | 300 | 搜索防抖延迟时间（毫秒） |
| onRender | Function | () => {} | 渲染回调函数 |
| defaultData | Object | null | 默认数据，用于离线搜索 |

### 后端API要求

搜索API需要满足以下要求：

1. 接受GET请求，参数为 `q`（搜索关键词）
2. 返回JSON格式数据，结构如下：

```javascript
{
    "categories": [
        {
            "name": "分类名称",
            "tools": [
                {
                    "name": "工具名称",
                    "url": "工具链接",
                    "description": "工具描述",
                    "icon": "图标URL"
                }
                // ... 更多工具
            ]
        }
        // ... 更多分类
    ]
}
```

### HTML结构要求

搜索模块需要以下HTML结构：

```html
<div class="search-box">
    <input type="text" placeholder="搜索AI工具和资源...">
    <div class="search-status">正在搜索...</div>
</div>
```

### CSS类说明

| 类名 | 描述 |
|------|------|
| .search-box | 搜索框容器 |
| .loading | 搜索加载状态 |
| .no-results | 无搜索结果状态 |

## 功能特性

1. **在线搜索**
   - 自动调用API进行搜索
   - 支持搜索状态显示
   - 错误处理和重试机制

2. **离线搜索**
   - 自动检测网络状态
   - 在离线时使用本地数据搜索
   - 网络恢复时自动切换回在线搜索

3. **性能优化**
   - 搜索防抖
   - 状态缓存
   - 优化的DOM操作

4. **用户体验**
   - 加载状态提示
   - 错误信息显示
   - 无结果提示

## 示例代码

```javascript
// 初始化搜索模块
const search = new AISearch({
    apiUrl: '/api/search',
    defaultData: aiToolsData,
    onRender: (categories) => {
        // 渲染搜索结果
        const container = document.querySelector('.container');
        // ... 渲染逻辑
    }
});
```

## 注意事项

1. 确保HTML结构符合要求
2. 提供正确的API接口
3. 实现适当的错误处理
4. 考虑网络状态变化
5. 优化搜索性能

## 常见问题

1. **搜索不起作用？**
   - 检查API接口是否正确
   - 确认网络连接状态
   - 查看控制台错误信息

2. **离线搜索不工作？**
   - 确保提供了defaultData
   - 检查数据格式是否正确

3. **搜索结果不显示？**
   - 检查onRender回调函数
   - 确认DOM结构正确

## 更新日志

### 1.0.0
- 初始版本发布
- 支持在线/离线搜索
- 添加基本错误处理
- 实现搜索防抖 