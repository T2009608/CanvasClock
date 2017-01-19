/**
 * Created by admin on 2017/1/19.
 */
var clock = document.getElementById("clock");
var ctx = clock.getContext("2d");
var w = ctx.canvas.width;
var h = ctx.canvas.height;
var r = w / 2;
var rem = w / 200;
// Canvas元素默认宽 300px, 高 150px, 设置其宽高可以使用如下方法：
// 方法一：
// 1 <canvas width="500" height="500"$amp;>amp;$lt;/canvas>
// 方法二：使用HTML5 Canvas API操作
// 1 var canvas = document.getElementById('欲操作canvas的id');
// 2 canvas.width = 500;
// 3 canvas.width = 500;
//
// 若通过如下方法设置宽高，那么Canvas元素将由原来大小被拉伸到所设置的宽高：
// 方法一：使用CSS 会被拉伸
// 1 #欲操作canvas的id｛
// 2     width:1000px;
// 3     height:1000px;
// 4 ｝
//
// 也包含了行间样式中的 style="" 。也就是上面的例子，也会产生拉伸的情况。
// 方法二：使用HTML5 Canvas API操作 会被拉伸
// 1 var canvas = document.getElementById('欲操作canvas的id');
// 2 canvas.style.width = "1000px";
// 3 canvas.style.height = "1000px";
// 方法三 ：用jquery的$("#id").width(500);会被拉伸
//
// 其它：canvas的width和height也不能用百分比表示。canvas会将百分值当成数值显示
function db() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.stroke();

    var hNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    hNumbers.forEach(function(number, index){
        var rad = 2 * Math.PI / 12 * index;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.font = rem * 18 + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(number, x, y);
    })
    for (var i = 0;i < 60;i ++){
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if(i % 5 == 0){
            ctx.fillStyle = "#000";
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI);
        }
        else{
            ctx.fillStyle = "#ccc";
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI);
        }
        ctx.fill();
    }
}
function dHourStick(hour, minute){
    // console.log(hour + " " + minute);
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}
function dMinuteStick(minute, second){
    // console.log(minute + " " + second);
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    var srad = 2 * Math.PI / 3600 * second;
    ctx.rotate(rad + srad);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = "round";
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r + 35 * rem);
    ctx.stroke();
    ctx.restore();
}
function dSecondStick(second){
    // console.log(second);
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#ccc";
    var rad = 2 * Math.PI / 60 * second;
    console.log(rad);
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem, 18 * rem);
    ctx.lineTo(2, 18);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(-1, -r + 18 * rem);
    ctx.fill();
    ctx.restore();
}
function dDot() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI);
    ctx.fill();
}
function dClock(){
    ctx.clearRect(0, 0, w, h);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //console.log(hour + " " + minute + " " + second);
    db();
    dHourStick(hour, minute);
    dMinuteStick(minute, second);
    dSecondStick(second);
    dDot();
    ctx.restore();
}

dClock();
setInterval(dClock, 1000);