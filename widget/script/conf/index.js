/**
 * @Author: 鑫木
 * @Date:   2017/5/4
 * @Last Modified by:   鑫木
 * @Last Modified time: 2017/5/4
 * @file 首页脚本
 */
define(['common','date'],function(common,date) {
    /**
     * @description: 新建一个类
     */
    function Index() {
        this.init();
        this.initUI();
        this.events();
    }

    /**
     * @description: 初始化参数(全局变量+常量)
     */
    Index.prototype.init = function() {
        var self = this;

        //缓存全局变量
        self.title = date.periods() + '好';

        //缓存全局dom对象
    };

    /**
     * @description: 初始化页面(首屏)
     */
    Index.prototype.initUI = function() {
        var self = this;

        common.methods().openFrame('main_frm','./html/main_frm.html',0,'',true);

        self.app = new Vue({
            el: '#app',
            data: {
                message: self.title
            },
            beforeCreate: function() {

            },
            computed: function() {

            },
            methods: function() {

            }
        });
    };

    /**
     * @description: 事件管理
     */
    Index.prototype.events = function() {
        var self = this;

        //添加数据
        $('#jAdd').click(function() {
            self.app.message = '不要点我';
        });

        //底部菜单栏导航
        $('#jFooter').on('click', '.item', function() {
            if (!$(this).hasClass('aui-active')) {
                $(this).addClass('aui-active').siblings().removeClass('aui-active');
            }
        })
    };

    /**
     * @description: ajax管理
     */
    Index.prototype.https = function() {
        var self = this;
        return {

        };
    };

    /**
     * @description: 方法管理
     */
    Index.prototype.methods = function() {
        var self = this;
        return {

        };
    };

    new Index();
});
