/**
 * @Author: 鑫木
 * @Date:   2017/5/4
 * @Last Modified by:   鑫木
 * @Last Modified time: 2017/5/4
 * @file 常用的方法
 */
define(["zepto","api","vue"],function($,$api,Vue) {
    /**
     * @description: 新建一个类
     */
    function Common() {
        this.init();
        this.initUI();
    }

    /**
     * @description: 初始化参数(全局变量+常量)
     */
    Common.prototype.init = function() {
        var self = this;
        window.$ = $;
        window.$api = $api;
        window.Vue = Vue;

        api.parseTapmode(); //优化点击

        var delay = 0;
        if (api.systemType != 'ios') {
            delay = 300;
        }
        self.delay = delay; //页面打开延时
    };

    /**
     * @description: 初始化页面(首屏)
     */
    Common.prototype.initUI = function() {
        var self = this;
        var headerDom = $api.byId("jHeader");
        if(headerDom){
            $api.fixStatusBar($api.byId("jHeader"));
        }
    };

    /**
     * @description: 事件管理
     */
    Common.prototype.events = function() {
        var self = this;

    };

    /**
     * @description: ajax管理
     */
    Common.prototype.https = function() {
        var self = this;
        return {};
    };

    /**
     * @description: 方法管理
     */
    Common.prototype.methods = function() {
        var self = this;
        return {
            /**
             * @param name[String] 窗口名称
             * @param url[String] 窗口地址
             * @param param[JSON] 传入参数
             * @param isBounces[Boolean] 窗口是否弹动
             */
            openWin: function(name, url, param, isBounces) {
                api.openWin({
                    name: name,
                    url: url, //以当前窗口为相对路径而不是js
                    delay: self.delay,
                    bounces: isBounces || false,
                    pageParam: param || ''
                });
            },
            /**
             * @param name[String] 窗口名称
             * @param url[String] 窗口地址
             * @param position[number] 窗口的位置 默认:0 0:根据win决定 1:无头部 2:无底部 3:全屏
             * @param param[JSON] 传入参数
             * @param isBounces[Boolean] 窗口是否弹动
             */
            openFrame: function(name, url,position, param, isBounces) {
            	var headEl = $api.byId("jHeader");
            	var footEl = $api.byId("jFooter");
            	var headerH = 0,footerH = 0;
            	switch (position){
            		case 0:
            			if(headEl){
            				headerH = $api.offset(headEl).h;
            			}
            			if(footEl){
            				footerH = $api.offset(footEl).h;
            			}
            			break;
            		case 1:
            			if(footEl){
            				footerH = $api.offset(footEl).h;
            			}
            			break;
            		case 2:
            			if(headEl){
            				headerH = $api.offset(headEl).h;
            			}
            			break;
            	}
                api.openFrame({
                    name: name,
                    url: url, //以当前窗口为相对路径而不是js
                    rect: {
                        x: 0, //左上角x坐标
                        y: headerH, //左上角y坐标
                        w: 'auto', //宽度，若传'auto'，页面从x位置开始自动充满父页面宽度
                        h: api.winHeight - headerH - footerH // 打开窗口高度
                    },
                    bounces: isBounces || false,
                    pageParam: param || '',
                    delay: self.delay
                });
            }
        };
    };
    return new Common();
});
