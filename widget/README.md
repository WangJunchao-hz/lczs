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
## 数据库表名+字段
    accounts----表名存储账户信息
        contents----所有账户信息
            id----账户id
            type----账户类型
            name----账户名
            remark----账户备注
            color----账户颜色
            balance----余额
            amount----本金
            rose----涨幅
            roseType----涨幅类型 0涨 1跌
            inflow----流入
            outflow----流出
            addDate----添加时间
            upDate----更新时间
            details----每笔流入流出详细记录
                id----账单id

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
