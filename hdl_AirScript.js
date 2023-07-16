
//海底捞小程序 for wps AirScript
//抓域名https://superapp-public.kiwa-tech.com/ 请求头headers中_haidilao_app_token 填入envVariable
const $ = Env("测试")
let envVariable = ``
let VariableList
function task(i) {
    let index = VariableList.indexOf(i);
    $.DoubleLog(`------ 开始第${index + 1}个账号 ------`)
    if (i.indexOf("@") !== -1) {
        let arr = i.split("&");
        console.log(`账号一的参数${arr[0]}`);
        console.log(`账号一的参数${arr[1]}`);
    }

    //初始化变量
    let token = ""
    //执行代码
    //任务1
    //apipost(i)//测试
    user_info(i)
    sign_in(i)
    //任务2
    //任务3
}
function apipost() {
    let url = "https://echo.apipost.cn/get.php"
    let options = {
        method: "GET",
        headers: {},
    }
    let result = $.httpRequest(url, options)
    $.DoubleLog(result)
}
function user_info(i) {
    let url = `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/queryFragment`
    let options = {
        method: "POST",
        headers: {
            'Host': 'superapp-public.kiwa-tech.com',
            'deviceid': 'null',
            'accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4435 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/2585 MicroMessenger/8.0.32.2300(0x2800205D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx1ddeb67115f30d1a',
            'reqtype': 'APPH5',
            '_haidilao_app_token': i,
            'origin': 'https://superapp-public.kiwa-tech.com',
            'x-requested-with': 'com.tencent.mm',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://superapp-public.kiwa-tech.com/app-sign-in/?SignInToken=TOKEN_APP_43d25436-b429-4233-b8b2-1154d2f20cb1&source=MiniApp',
        },
        body: ''
    }
    let result = $.httpRequest(url, options)
    try {
        result = JSON.parse(result)
    } catch (error) {

    }
    if (result.success == true) {
        $.DoubleLog(`账号  ck验证成功: 剩余[${result.data.total}] `);

    } else {
        $.DoubleLog(`账号  ck验证失效:,原因未知！`);
        console.log(result);
    }

}

function sign_in(i) {
    let url = `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/signin`
    let options = {
        method: "POST",
        headers: {
            'Host': 'superapp-public.kiwa-tech.com',
            'deviceid': 'null',
            'accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4435 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/2585 MicroMessenger/8.0.32.2300(0x2800205D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx1ddeb67115f30d1a',
            'reqtype': 'APPH5',
            '_haidilao_app_token': i,
            'origin': 'https://superapp-public.kiwa-tech.com',
            'x-requested-with': 'com.tencent.mm',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://superapp-public.kiwa-tech.com/app-sign-in/?SignInToken=TOKEN_APP_43d25436-b429-4233-b8b2-1154d2f20cb1&source=MiniApp',
        },
        body: JSON.stringify({ "signinSource": "MiniApp" })
    }
    let result = $.httpRequest(url, options)
    try {
        result = JSON.parse(result)
    } catch (error) {

    }
    if (result.success == true) {
        $.DoubleLog(`账号  签到成功: `);

    } else {
        $.DoubleLog(`账号  签到失效:,原因未知！`);
        console.log(result);
    }
}
main()
function main() {
    $.wait(5000)
    $.start()
    Notice()
    VariableList = $.checkEnv()
    if (Array.isArray(VariableList) ){
        for (let i of VariableList) {
            task(i)
        }
    }else{
        task(VariableList)
    }

    //$.sendNotify()
    $.done()
}

function Notice() {
    let url = "https://fastly.jsdelivr.net/gh/smallfawn/Note@main/Notice.json"
    let options = {
        method: "GET",
        headers: {},
    }
    let result = $.httpRequest(url, options)
    $.DoubleLog(result.notice)
}

// Env for wps AirScript(JavaScript)
// @time 2023-7-16
// @Author: smallfawn 
// @Github: https://github.com/smallfawn 
function Env(name) {
    const env = {};
    // 定义属性
    env.property = "value";
    // 定义方法
    env.name = name;
    env.startTime = Date.now();
    env.msg = ""
    env.DoubleLog = function (message) {
        console.log(message);
        this.msg += `\n ${message}`
    }
    env.start = function () {
        this.DoubleLog(`🔔${this.name}, 开始! 🕛`)
    }
    env.checkEnv = function () {
        if (envVariable.indexOf("@") !== -1) {
            var str = envVariable;
            var arr = str.split("@");
            console.log(arr);
            return arr
        }else{
            return envVariable
        }
    }
    env.httpRequest = function (url, options) {
        return HTTP.fetch(url, options).json();
    }
    env.sendNotify = function () {
        let body = {
            token: "",
            title: "来自airScript的消息通知",
            content: this.msg,
            topic: "",
        };
        let url = "https://www.pushplus.plus/send"
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }
        let result = this.httpRequest(url, options)
        console.log(result);
    }
    env.timestamp = function () {
        return Date.now();
    }
    env.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    env.MD5 = function (data) {
        return Crypto.createHash("md5").update(data).digest("hex")
    }
    env.SHA1 = function (data) {
        return Crypto.createHash("sha1").update(data).digest("hex")
    }
    env.SHA256 = function (data) {
        return Crypto.createHash("sha256").update(data).digest("hex")
    }
    env.HAMCMD5 = function (data, key) {
        return Crypto.createHmac("md5", key).update(data).digest('hex')
    }
    env.HAMCSHA1 = function (data, key) {
        return Crypto.createHmac("sha256", key).update(data).digest('hex')
    }
    env.HAMCSHA256 = function (data, key) {
        return Crypto.createHmac("sha256", key).update(data).digest('hex')
    }
    env.wait = function (time) {
        return Time.sleep(time) // 休眠一秒
    }
    env.done = function () {
        const endTime = Date.now();
        const costTime = (endTime - this.startTime) / 1000;
        this.DoubleLog(`🔔${this.name}, 结束! 🕛 ${costTime} 秒`);
    }
    return env;
}
