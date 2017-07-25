# assets
## 技术结构：aui + requireJS + vue + apiCloud
## 项目结构：
    widget(根目录)
        ||css
            ||apicloud(apicloud官方提供的css)
            ||aui(aui样式组件)
            ||conf(项目样式)
        ||fonts(阿里巴巴字体图标)
        ||html
        ||icon
        ||image
        ||launch
        ||script
            ||conf(项目脚本)
            ||lib(公用的JS库)
            ||plugins(当前项目用到的插件或自己编写的插件)
            app.js(requireJS配置脚本)
        config.xml(配置)
        index.html(入口)
        README.md(说明文档)

## 缓存
    isFist----是否首次安装app
## 数据库表名
    accounts----存储账户信息
## 字典
### 账户类型
        0----现金
        1----储蓄卡
        2----支付宝
        3----微信钱包
        4----投资账户
        5----虚拟币账户
        6----彩票账户
        7----固定理财
        8----其它账户
