/**
 * @Author: 鑫木
 * @Date:   2017/5/4
 * @Last Modified by:   鑫木
 * @Last Modified time: 2017/5/4
 * @file 常用的方法
 */
// 数据库表名
var diaries = 'diaries'; // 实时记录表


function setHeader($api, id) {
    var headerDom = $api.byId(id);
    if (headerDom) {
        $api.fixStatusBar(headerDom);
    }
}

function closeWin() {
    api.closeWin();
}

function openFrame($api, name, url, position, param, isBounces) {
    var delay = 0;
    if (api.systemType != 'ios') {
        delay = 300;
    }
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
        delay: delay
    });
}

function openWin(name, url, param, isBounces) {
    var delay = 0;
    if (api.systemType != 'ios') {
        delay = 300;
    }
    api.openWin({
        name: name,
        url: url, //以当前窗口为相对路径而不是js
        delay: delay,
        bounces: isBounces || false,
        pageParam: param || ''
    });
}

/**
 * @description 参数继承
 * @param defaults[JSON] 默认参数
 * @param news[JSON] 用户自定义参数
 * @return defaults[JSON] 返回扩展后的参数
 */
function extend(defaults, news) {
    for (var item in news) {
        defaults[item] = news[item];
    }
    return defaults;
}

function readFile(name) { // 读取数据
    try {
        var path = name.indexOf('widget') != -1 ? name : ('fs://data/' + name + '.json');
        var data = api.readFile({
            sync: true,
            path: path
        });
        return JSON.parse(data);
    } catch (e) {
        showMsg("读取数据失败");
    }
}

function deleteData(name, id,tip) { //删除数据
    if(typeof tip === 'undefined'){
        var tip = '删除成功';
    }
    try {
        var all = readFile(name);
        var index;
        for (var i = 0; i < all.contents.length; i++) {
            if (all.contents[i].id == id) {
                index = i;
                break;
            }
        }
        if(index != 'undefined'){
            all.contents.splice(index, 1);
            writeFile(name,all,tip);
        }else {
            showMsg("删除失败");
        }
    } catch (e) {
        showMsg("删除失败");
    }
}

function queryData(name, id) { //查询数据
    try {
        var all = readFile(name);
        var result;
        for (var i = 0; i < all.contents.length; i++) {
            if (all.contents[i].id == id) {
                result = all.contents[i];
                break;
            }
        }
        return result;
    } catch (e) {
        showMsg("查询数据失败");
    }
}

function upDateData(name,id,data,tip) { // 更新数据
    try{
        var all = readFile(name);
        for (var i = 0; i < all.contents.length; i++) {
            if (all.contents[i].id == id) {
                all.contents[i] = extend(all.contents[i],data);
                break;
            }
        }
        writeFile(name,all,tip);
    }catch (e){
        showMsg('更新数据失败');
    }
}

function addData(name, param, tip) { // 添加数据
    try {
        var json = {"contents": []}, newData;
        var oldData = readFile(name);
        if (oldData && (typeof oldData == 'object')) {
            oldData.contents.unshift(param);
            newData = oldData;
        } else {
            json.contents.unshift(param);
            newData = json;
        }
        writeFile(name,newData,tip);
    } catch (e) {
        showMsg("添加数据失败");
    }
}

function writeFile(name,data,tip) { // 存入数据
    api.writeFile({
        path: 'fs://data/' + name + '.json',
        data: JSON.stringify(data)
    }, function (ret, err) {
        if (ret.status) {
            showMsg(tip);
        } else {
            showMsg(JSON.stringify(err));
        }
    });
}

function toThousands(num) { //金额转化千位分隔符
    var val = parseFloat(num || 0).toFixed(2) + '';
    var a = val.split('.');
    var b = (a[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return b + '.' + a[1];
}

function uuid(len, radix) { //生成唯一标识 len长度 radix进制
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
}

function showMsg(msg) { //弹出提示信息
    api.toast({
        msg: msg,
        duration: 2000,
        location: 'middle'
    });
}

function strToFloat(str) { // 字符串转浮点数
    try{
        var newStr,res;
        if(str.indexOf(',') != -1){
            newStr = str.split(',').join('');
        }else {
            newStr = str;
        }
        return parseFloat(newStr);
    }catch (e){
        showMsg('参数格式不正确');
    }
}

function getPercent(num1,num2) { // 计算百分比
    try{
        var res = '0.00';
        if(typeof num1 == 'number' && typeof num1 == 'number' && num1 != 0){
            res = (num2/num1).toFixed(2);
        }
        return res;
    }catch (e){
        showMsg('参数格式不正确');
    }
}
