
var i = 0;

function timedCount() {
    i++;
    postMessage(i);
    setTimeout("timedCount()",30000);
}

timedCount();
    


