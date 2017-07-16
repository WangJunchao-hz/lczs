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
    function Main() {
        this.init();
        this.initUI();
        this.events();
    }

    /**
     * @description: 初始化参数(全局变量+常量)
     */
    Main.prototype.init = function() {
        var self = this;

        //缓存全局变量
        self.title = date.periods() + '好';

        //缓存全局dom对象
        self.footerDom = $('#jFooter');
    };

    /**
     * @description: 初始化页面(首屏)
     */
    Main.prototype.initUI = function() {
        var self = this;

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
    Main.prototype.events = function() {
        var self = this;

    };

    /**
     * @description: ajax管理
     */
    Main.prototype.https = function() {
        var self = this;
        return {

        };
    };

    /**
     * @description: 方法管理
     */
    Main.prototype.methods = function() {
        var self = this;
        return {

        };
    };

    new Main();
});