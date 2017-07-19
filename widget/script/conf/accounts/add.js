/**
 * @Author: 鑫木
 * @Date:   2017/5/4
 * @Last Modified by:   鑫木
 * @Last Modified time: 2017/5/4
 * @file 添加账户脚本
 */
define(['common'],function(common) {
    /**
     * @description: 新建一个类
     */
    function Add() {
        this.init();
        this.initUI();
        this.events();
    }

    /**
     * @description: 初始化参数(全局变量+常量)
     */
    Add.prototype.init = function() {
        var self = this;

        //缓存全局变量


        //缓存全局dom对象

    };

    /**
     * @description: 初始化页面(首屏)
     */
    Add.prototype.initUI = function() {
        var self = this;

        self.app = new Vue({
            el: '#app',
            data: {

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
    Add.prototype.events = function() {
        var self = this;
        // $('#jBack').click(function () {
        //     alert('sss');
        //     api.closeWin();
        // });
    };

    /**
     * @description: ajax管理
     */
    Add.prototype.https = function() {
        var self = this;
        return {

        };
    };

    /**
     * @description: 方法管理
     */
    Add.prototype.methods = function() {
        var self = this;
        return {

        };
    };

    new Add();
});