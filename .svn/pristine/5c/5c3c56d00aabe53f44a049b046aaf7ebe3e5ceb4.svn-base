export function GMTToStr(time) {
    let date = new Date(time);
    var mn = date.getMonth() + 1;
    if (mn < 10) mn = "0" + mn;
    var d = date.getDate();
    if (d < 10) d = "0" + date.getDate();
    var h = date.getHours();
    if (h < 10) h = "0" + date.getHours();
    var m = date.getMinutes();
    if (m < 10) m = "0" + date.getMinutes();
    var s = date.getSeconds();
    if (s < 10) s = "0" + date.getSeconds();
    let Str = date.getFullYear() + '-' + mn + '-' + d + ' ' + h + ':' + m + ':' + s;
    return Str;
}