

function searchToObject() {
    var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;
    for (i in pairs) {
        if (pairs[i] === "") continue;
        pair = pairs[i].split("=");
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return obj;
}


//获取当前网址，如： http://localhost:8080/Tmall/index.jsp 
var curWwwPath = window.document.location.href; 
//获取主机地址之后的目录如：/Tmall/index.jsp 
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
 
var serverip = curWwwPath.substring(0, pos); //"http://192.168.1.100";

var schoolid = 1;
var bjid = 4;
var njid = 1;
var jsid = 1;
var schoolmc = "";
var bjmc = "";
var jsmc = "";
var xlh = "";
var bptype = 1;

try {

    serverip = ECPJS.getvalue("serverip");
    schoolid = ECPJS.getvalue("schoolid");
    bjid = ECPJS.getvalue("bjid");
    njid = ECPJS.getvalue("njid");
    jsid = ECPJS.getvalue("jsid");
    bptypex = ECPJS.getvalue("bplx");

    schoolmc = ECPJS.getvalue("schoolmc");
    bjmc = ECPJS.getvalue("bjmc");
    jsmc = ECPJS.getvalue("jsmc");
    xlh = ECPJS.getxlh();

}
catch(e){}



function DoClock() {
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
    this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    $("#date_day").text(this.year + "年" + this.month + "月" + this.date + "日 ");
    $("#date_clock").text(this.hour + ":" + this.minute + ":" + this.second);
    $("#date_week").text(this.day);
}

function get_weather() { 
    jQuery.getJSON('http://api.map.baidu.com/telematics/v3/weather?location=杭州&output=json&ak=iw5m2G7ayDow8ofDdDGVUMB3&mcode=com.BaiduWeather&callback=?', function (data) {
 
        var r = data.results[0];
        var city = r.currentCity;
        var pm25 = r.pm25;
        var datas = r.weather_data;
        var today = datas[0];
        var pic = today.dayPictureUrl.substring(today.dayPictureUrl.lastIndexOf('/'));

        var temper = today.date.substring(today.date.indexOf('：'));
        temper = temper.replace(')', '');
        temper = temper.replace('：', '');

        $('#weather_current').text(temper);
        $('#weather_icon').attr('src', '../../images/days' + pic);
    });
}



function IsURL(str_url) {
    var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184  
        + '|'  // 允许IP和DOMAIN（域名） 
        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名  
        + '[a-z]{2,6})' // first level domain- .com or .museum  
        + '(:[0-9]{1,5})?' // 端口- :80 
        + '((/?)|' // a slash isn't required if there is no file name  
        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
    var re = new RegExp(strRegex);  //re.test()  
    if (re.test(str_url)) { return (true); }
    else { return (false); }
}



function searchToObject() {
    var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;
    for (i in pairs) {
        if (pairs[i] === "") continue;
        pair = pairs[i].split("=");
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return obj;
}


function ChangeDateFormat(jsondate) {
    jsondate = jsondate.replace("/Date(", "").replace(")/", "");
    if (jsondate.indexOf("+") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    }
    else if (jsondate.indexOf("-") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    }

    var date = new Date(parseInt(jsondate, 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return date.getFullYear()
        + "年"
        + month
        + "月"
        + currentDate
        + "日"
}


function get_class_mc() {
    $.jsonp({
        url: serverip + "/bpxt/bpxt/bpxtapi/GetClassInfo",
        callback: "callback", data: { token: token, schoolid: schoolid },
        success: function (data) {
            if (data != null) {
                $("#bjname").text(data.NJ + " " + data.Name);
            }
        },
        complete: function (xOptions, textStatus) { },
        error: function (xOptions, textStatus) { }
    });
}
