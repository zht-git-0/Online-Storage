var duration = 100; // 0.8s
var placeholder = document.getElementById('placeholder');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 
function check(){
    //placeholder.style.height = side.offsetHeight + 'px';
    placeholder.style.width = side.offsetWidth + 'px';
};
setInterval(check,100)