const getbyString = function(obj, str) {
    str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    str = str.replace(/^\./, '');           // strip a leading dot
    var a = str.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in obj) {
            obj = obj[k];
        } else {
            return;
        }
    }
    return obj;
}


function setbyString(obj, str, val) {
    str = str.split(".");
    while (str.length > 1)
        obj = obj[str.shift()];
    return obj[str.shift()] = val;
}

export { getbyString,setbyString};

