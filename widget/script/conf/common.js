/**
 * @Author: 鑫木
 * @Date:   2017/5/4
 * @Last Modified by:   鑫木
 * @Last Modified time: 2017/5/4
 * @file 常用的方法
 */
define(["zepto", "api", "vue"], function ($, $api, Vue) {
    /**
     * @description: 新建一个类
     */
    function Common() {
        this.init();
        this.initUI();
        this.events();
    }

    /**
     * @description: 初始化参数(全局变量+常量)
     */
    Common.prototype.init = function () {
        var self = this;
        window.$ = $;
        window.$api = $api;
        window.Vue = Vue;

        api.parseTapmode(); //优化点击

        var delay = 0;
        if (api.systemType != 'ios') {
            delay = 300;
        }
        window.delay = delay;
        self.delay = delay; //页面打开延时

        //判断页面是否登录
        self.userId = $api.getStorage("userId"); //获取用户ID
    };

    /**
     * @description: 初始化页面(首屏)
     */
    Common.prototype.initUI = function () {
        var self = this;

        var headerDom = $api.byId("jHeader");
        if (headerDom) {
            $api.fixStatusBar($api.byId("jHeader"));
        }
    };

    /**
     * @description: 事件管理
     */
    Common.prototype.events = function () {
        var self = this;
        var hasBack = $('#jBack').length != 0 ? true : false;
        if (hasBack) {
            $('html').on('click', '#jBack', function () {
                api.closeWin();
            });
        }
    };

    /**
     * @description: ajax管理
     */
    Common.prototype.https = function () {
        var self = this;
        return {};
    };

    /**
     * @description: 方法管理
     */
    Common.prototype.methods = function () {
        var self = this;
        return {
            /**
             * @param name[String] 窗口名称
             * @param url[String] 窗口地址
             * @param param[JSON] 传入参数
             * @param isBounces[Boolean] 窗口是否弹动
             */
            openWin: function (name, url, param, isBounces) {
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
            openFrame: function (name, url, position, param, isBounces) {
                var headEl = $api.byId("jHeader");
                var footEl = $api.byId("jFooter");
                var headerH = 0, footerH = 0;
                switch (position) {
                    case 0:
                        if (headEl) {
                            headerH = $api.offset(headEl).h;
                        }
                        if (footEl) {
                            footerH = $api.offset(footEl).h;
                        }
                        break;
                    case 1:
                        if (footEl) {
                            footerH = $api.offset(footEl).h;
                        }
                        break;
                    case 2:
                        if (headEl) {
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
            },
            readFile: function (name) { // 读取数据
                try {
                    var path = name.indexOf('widget') != -1 ? name : ('fs://data/' + name + '.json');
                    var data = api.readFile({
                        sync: true,
                        path: path
                    });
                    return JSON.parse(data);
                }catch (e){
                    self.methods().showMsg("读取数据失败");
                }
            },
            queryData: function (name,id) { //查询数据
                try{
                    var all = self.methods().readFile(name);
                    var result;
                    $.each(all.contents,function (i,obj) {
                        if(obj.id == id){
                            result = obj;
                            return false;
                        }
                    });
                    return result;
                }catch (e){
                    self.methods().showMsg("查询数据失败");
                }
            },
            writeFile: function (name, param, tip) { // 本地存储数据
                try {
                    var json = {"contents":[]},newData;
                    var oldData = self.methods().readFile(name);
                    if(oldData && (typeof oldData == 'object')){
                        oldData.contents.unshift(param);
                        newData = JSON.stringify(oldData);
                    }else {
                        json.contents.unshift(param);
                        newData = JSON.stringify(json);
                    }
                    api.writeFile({
                        path: 'fs://data/' + name + '.json',
                        data: newData
                    }, function (ret, err) {
                        if (ret.status) {
                            self.methods().showMsg(tip);
                        } else {
                            self.methods().showMsg(JSON.stringify(err));
                        }
                    });
                }catch (e){
                    self.methods().showMsg("写入数据失败");
                }
            },
            toThousands: function (num) { //金额转化千位分隔符
                var val = parseFloat(num || 0).toFixed(2) + '';
                var a = val.split('.');
                var b = (a[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                return b + '.' + a[1];
            },
            uuid: function (len, radix) { //生成唯一标识 len长度 radix进制
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    var r;
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            },
            showMsg:function (msg) { //弹出提示信息
                api.toast({
                    msg: msg,
                    duration: 2000,
                    location: 'middle'
                });
            }
        };
    };
    return new Common();
});
