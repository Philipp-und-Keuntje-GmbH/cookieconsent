// the function - set var up just in case
// the timer isn't running yet
var timer = null;
function startSetInterval() {
    timer = setInterval( showDiv, 5000);
}
// start function on page load
startSetInterval();

// hover behaviour
$('#slide-show-overall').hover(function() {
    clearInterval(timer);
},function() {
    startSetInterval();
});

// the function - set var up just in case
// the timer isn't running yet
var timer = null;
function startSetInterval() {
    timer = setInterval( showDiv, 5000);
}
// start function on page load
startSetInterval();

// hover behaviour
// $('.pc-wrapper').hover(function() {
//     clearInterval(timer);
// },function() {
//     startSetInterval();
// });

// WORKING !!!
window.onload=function(){
    document.getElementsByClassName("pc-message-popup")[0].onmouseover=function()
    {
        this.style.backgroundColor = "blue";
        // clearInterval(myTimer);
    };
    document.getElementsByClassName("pc-message-popup")[0].onmouseout=function()
    {
        this.style.backgroundColor = "red";
        // clearInterval(myTimer);
    };
};