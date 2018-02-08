var jsonObj = null;
var cont = document.body;
var amount = '1.00';

function getjson(user_options) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                jsonObj = JSON.parse(xhr.response);
                displaypopup(user_options);
            }
            else {
                //Fallback to the local json
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        jsonObj = JSON.parse(xhr.response);
                        displaypopup(user_options);
                    }
                };
                xhr.open('GET', 'https://raw.githubusercontent.com/Philipp-und-Keuntje-GmbH/cookieconsent/blob/langweiledichnicht-MASTER/src/langweiledichnicht.json', true);


                xhr.send();
            }
        }
    };
    xhr.open('GET', 'http://localhost:9000/src/cookie.json', true);
    xhr.send();
}

//wrapping function after the
function displaypopup(user_options) {
    //function to load the data that is given in the intitialise function by the user
    function deepExtend(target, source) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (prop in target && isPlainObject(target[prop]) && isPlainObject(source[prop])) {
                    deepExtend(target[prop], source[prop]);
                } else {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    }

    function isPlainObject(obj) {
        // The code "typeof obj === 'object' && obj !== null" allows Array objects
        return typeof obj === 'object' && obj !== null && obj.constructor === Object;
    }

    var options = {
        enabled: true,
        container: null,
        cookieMeta: {
            name: jsonObj.unicef.cookie.cookieMeta.name,
            value: jsonObj.unicef.cookie.cookieMeta.value,
            path: jsonObj.unicef.cookie.cookieMeta.path,
            domain: jsonObj.unicef.cookie.cookieMeta.domain,
            expiryDays: jsonObj.unicef.cookie.cookieMeta.expiryDays
        },

        content: {
            acceptButton: jsonObj.unicef.cookie.acceptButton,
            dismissButton: jsonObj.unicef.cookie.dismissButton,
            link: {
                text: jsonObj.unicef.cookie.link.text,
                href: jsonObj.unicef.cookie.link.href
            },
            copyCookie: jsonObj.unicef.cookie.copy,
            close: jsonObj.unicef.cookie.close,
            timer: jsonObj.unicef.cookie.timer,
            copyDonate: jsonObj.unicef.donate.copy,
            logosrc: jsonObj.unicef.donate.logo.src,
            logosrcMini: jsonObj.unicef.donate.logo.srcmini,
            logohref: jsonObj.unicef.donate.logo.href,
            paypalImg: jsonObj.unicef.donate.paypalimg,
            paypalLink: jsonObj.unicef.donate.paypallink,
            copyWindow: jsonObj.unicef.donate.window.copy,
            placeholderWindow: jsonObj.unicef.donate.window.placeholder,
            successWindow: jsonObj.unicef.donate.success.text,
            returntext: jsonObj.unicef.donate.returntext,
            returnurl: jsonObj.unicef.donate.returnurl
        }
    };
    if (isPlainObject(user_options)) {
        deepExtend(options, user_options);
    }


    // HTML Elements that are rendered later on
    options.elements = {
        cookie: {
            // acceptButton: '<span class="pc-acceptbutton"><button class="cookie-accept-btn" onclick="">' + options.content.acceptButton + '</button></span>',
            acceptButton: '<span class="pc-acceptbutton"><button class="cookie-accept-btn" onclick="myTimerObj.start()">' + options.content.acceptButton + '</button></span>',
            dismissButton: '<span class="pc-dismissButton">' + options.content.dismissButton + '</span>',
            // text: '<div id="cookie-desc" class="pc-message-popup">' + options.content.copyCookie + '<a class="pc-cookie-info" href="' + options.content.link.href + '" target="_blank">' + options.content.link.text + '</a> <button class="cookie-accept-btn test" onclick="myTimerObj.run_clock()">' + options.content.acceptButton + '</button></div>',
            text: '<div id="cookie-desc" class="pc-message-popup">' + options.content.copyCookie + '<a class="pc-cookie-info" href="' + options.content.link.href + '" target="_blank">' + options.content.link.text + '</a> <button class="cookie-accept-btn test" onclick="countdownHover()">' + options.content.acceptButton + '</button></div>',
            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="pc-link" href="' + options.content.link.href + '" rel="noopener noreferrer nofollow" target="_blank">' + options.content.link.text + '</a>',
            close: '<img class="pc-close" src="' + options.content.close + '">'
        },
        donate: {
            copy: '<span class="pc-message-popup">' + options.content.copyDonate + '</span>',
            logo: '<a href="' + options.content.logohref + '" rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.logosrc + '" class="pc-donatelogo-popup"></a>',
            logopaypal: '<a href="' + options.content.paypalLink + '" rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.paypalImg + '" class="pc-donatelogo-popup"></a>',
            // timer: '<img class="pc-timer" src="' + options.content.timer + '">',
            timer: '<span id="time"></span>\n',

            donatebutton: '<img class="pc-donatebuttonimg" src="' + options.content.paypal + '">',
            window: {
                logo: '<a href="' + options.content.logohref + '" rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.logosrc + '" class="pc-windowlogo"></a>',
                copy: '<div class="pc-message-window">' + options.content.copyWindow + '</div>',
                submit: '<input type="text" placeholder="' + options.content.placeholderWindow + '" class="pc-input-window">',
                paypalbutton:
                '<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_blank" class="paypalform">' +
                '        <input type="hidden" name="cmd" value="_s-xclick">' +
                '        <input type="hidden" name="image_url" value="https://i.pinimg.com/736x/94/d4/c9/94d4c90934ffcfc00e48bcb01bae8d5a--unicef-logo-a-well.jpg">' +
                '        <input type="hidden" name="hosted_button_id" value="JGB6CLUXU4Q7U">' +
                '        <input type="hidden" name="return" value="' + options.content.returnurl + '">' +
                '        <input type="hidden" name="charset" value="utf-8">' +
                '        <input type="hidden" name="item_number" value="144001">' +
                '        <input type="hidden" name="cbt" value="' + options.content.returntext + '">' +
                '        <input type="hidden" name="lc" value="DE">' +
                '        <input type="hidden" name="image_url" value="' + options.content.logosrcMini + '">' +
                '        <input type="image" src="https://www.sandbox.paypal.com/de_DE/DE/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.">' +
                '        <img alt="" border="0" src="https://www.sandbox.paypal.com/de_DE/i/scr/pixel.gif" width="1" height="1">' +
                '    </form>',
                success: '<div class="pc-sucess-text">' + options.content.sucessWindow + amount + '</div>'
            }
        }
    };


    //function to render the html for the cookie notice
    function createcookiepopup() {
        var divCookie = document.createElement('div');

        //Appending the cookie notice on the body element
        divCookie.className = "pc-wrapper cookie active";
        divCookie.innerHTML += options.elements.cookie.text;
        cont.appendChild(divCookie);

        // Eventhandler on button
        var accbtn = divCookie.getElementsByClassName("cookie-accept-btn");
        accbtn[0].addEventListener("click", acceptclick);
    }

    //function to render the html for the donate notice
    function createdonatepopup() {
        var divDonate = document.createElement('div');
        var buttonwrapper = document.createElement('div');
        var unicefwrapper = document.createElement('div');
        var closewrapper = document.createElement('div');

        //Appending the donate Popup

        // Parent-Wrapper
        divDonate.className = "pc-wrapper donate ";
        // Child-Wrapper -> Unicef
        divDonate.appendChild(unicefwrapper);
        unicefwrapper.className = "unicef-wrapper";

        // Parent Button-Wrapper
        buttonwrapper.className = "pc-button-wrapper";
        unicefwrapper.innerHTML += options.elements.donate.logo;

        // Unicef-Message (standalone)
        divDonate.innerHTML += options.elements.donate.copy;

        // Child from Button-Wrapper
        divDonate.appendChild(buttonwrapper);
        // Donate-Button
        buttonwrapper.innerHTML += options.elements.donate.window.paypalbutton;
        // PayPal
        buttonwrapper.innerHTML += options.elements.donate.logopaypal;

        // Parent Close-Wrapper
        closewrapper.className = "close-wrapper";

        // Child frome Close-Wrapper
        divDonate.appendChild(closewrapper);
        // Countdown
        closewrapper.innerHTML += options.elements.donate.timer;
        // Close-Icon
        closewrapper.innerHTML += options.elements.cookie.close;


        cont.appendChild(divDonate);

        //Buttonhandler for exit Button
        var closebtn = divDonate.getElementsByClassName("pc-close");
        closebtn[0].addEventListener("click", closepopup);

        // creates a layer that locks the site for paypal
        //var donatebtn = document.getElementsByClassName("pc-donatebuttonimg");
        var layer = document.createElement('div');
        layer.className = "pc-disablingdiv";
        var donatewindow = document.createElement('div');
        donatewindow.className = "pc-paypal-window";

        // add a overlaywindow to the layer
        donatewindow.innerHTML += options.elements.donate.window.logo;
        donatewindow.innerHTML += options.elements.donate.window.copy;
        donatewindow.innerHTML += options.elements.donate.window.submit;
        donatewindow.innerHTML += options.elements.donate.window.paypalsmartbutton;

        //adding eventlistener
        //donatebtn[0].addEventListener("click",closepopup);

        // donatebtn[0].addEventListener("click",function(){
        //     //cont.appendChild(layer);
        //     //cont.appendChild(donatewindow);
        //     paypal.Button.render({
        //
        //         env: 'sandbox',
        //
        //         client: {
        //             sandbox:'AWsXtDKsAy3KSbrQ83zF0dSCLu2NtwBZVA4aRqtBPasNQmo40CLzcaI-NcX8-U3MSRyysXsd3jrigZVI'
        //         },
        //
        //         commit: true,
        //
        //         payment: function(data, actions) {
        //             return actions.payment.create({
        //                 payment: {
        //                     transactions: [
        //                         {
        //                             amount: { total: amount, currency: 'EUR' }
        //                         }
        //                     ]
        //                 }
        //             });
        //         },
        //
        //         onAuthorize: function(data, actions) {
        //             console.log('onAuth');
        //             return actions.payment.execute().then(function(payment) {
        //                 console.log('then');
        //
        //                 removewindow("pc-window donate");
        //                 showendscreen(payment.payer.payer_info.first_name ,payment.transactions[0].amount.total);
        //             });
        //         }
        //     }, '.pc-paypal-window');
        // });
        /*
                function tbd(){
                    //adding a Eventlistener to input field to override the
                    var submit = donatewindow.getElementsByClassName("pc-input-window");
                    submit[0].addEventListener("keyup",function(){
                        console.log(submit[0].selectionStart, submit[0].selectionEnd);
                        if (this.value) {
                            if (this.value.substr(-1) !== "€") {
                                this.value += "€"
                            }
                            if(this.selectionStart === this.value.length){
                                this.value.setSelectionRange(submit[0].value.length -1, submit[0].value.length -1)
                            }
                        }
                    });
                }
        */
    }

    /*
    function removewindow(classname){
        cont.removeChild(classname);
    }
    */
    function acceptclick() {
        setcookie(options.cookieMeta.name, options.cookieMeta.value, options.cookieMeta.path, options.cookieMeta.domain, options.cookieMeta.expiryDays);
        switchstatus();

        // CLOSE-POPUP Countdown 15s ( -> kann hier raus )
        // setTimeout(closepopup, 15000);
        // var hourglass = document.getElementsByClassName("pc-timer");
        // fadeOut(hourglass[0]);
    }

    function fadeOut(image) {
        var opacity = 1;
        var timer = setInterval(function () {
            if (opacity < 0.1) {
                clearInterval(timer);
            }
            image.style.opacity = opacity;
            opacity -= 0.1;
        // }, 1000);
        }, 10000000);
    }

    function setcookie(name, value, path, domain, expiryDays) {
        var cookiestring = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (path) {
            cookiestring += ";  path=" + path;
        }
        if (domain) {
            cookiestring += "; domain=" + domain;
        }
        if (expiryDays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + parseInt(expiryDays));
            cookiestring += "; expires=" + exdate.toUTCString();
        }
        document.cookie = cookiestring;
        console.log(cookiestring);
    }

    function switchstatus() {
        var cookie = document.getElementsByClassName("cookie");
        cookie[0].classList.remove("active");
        var donate = document.getElementsByClassName("donate");
        donate[0].classList.add("active");
    }

    //function to shut down the the popup
    function closepopup() {
        var donate = document.getElementsByClassName("donate");
        donate[0].classList.remove("active");
        var cookie = document.getElementsByClassName("cookie");
        cookie[0].classList.remove("active");
    }

    /*
    function showendscreen(name, value){
        console.log(name,value);
        var success = document.createElement('div');
        success.className("pc-window success");
        amount = value;
        success.innerHTML += options.elements.donate.window.logo;
        success.innerHTML += options.elements.window.success;

        cont.appendChild(success);
        //var copy = "Vielen Dank für deine Spende von "+ amount + "€,  "+ name;
    }
*/
    //calling the functions to load html
    createcookiepopup();
    createdonatepopup();
}

(function (pc) {
    if (pc.hasInitialised) return;

    pc.initialise = function (user_options) {
        var checkcookie = "CookieforGood";
        if (user_options.cookieMeta.name) {
            checkcookie = user_options.cookieMeta.name;
        }
        if (document.cookie.search(checkcookie)) {
            getjson(user_options);
        }
    };

    // prevent this code from being run twice
    pc.hasInitialised = true;
    window.pukcookie = pc;

}(window.pukcookie || {}));


//
// COUNTDOWN Donate -> onHover = Pause / OnMouseOut = Resume

function countdownHover(){

    // CLOSE-Function
    function closepopup() {
        var donate = document.getElementsByClassName("donate");
        donate[0].classList.remove("active");
        var cookie = document.getElementsByClassName("cookie");
        cookie[0].classList.remove("active");
    }

// 15 seconds from now
var time_in_minutes = 0.25;

// set time
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes*60*1000);

// time-remaining
function time_remaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

// time-interval
var timeinterval;
function run_clock(id,endtime){
    var clock = document.getElementById(id);
    function update_clock(){
        var t = time_remaining(endtime);
        clock.innerHTML = t.seconds;
        if(t.total<=0){
            clearInterval(timeinterval);
            closepopup();
        }
    }
    // update-clock
    update_clock(); // run function once at first to avoid delay
    timeinterval = setInterval(update_clock,1000);
}
// RUN
run_clock('time',deadline);


var paused = false; // is the clock paused?
var time_left; // time left on the clock when paused

// pause
function pause_clock(){
    if(!paused){
        paused = true;
        clearInterval(timeinterval); // stop the clock
        time_left = time_remaining(deadline).total; // preserve remaining time
    }
}

// resume
function resume_clock(){
    if(paused){
        paused = false;

        // update the deadline to preserve the amount of time remaining
        deadline = new Date(Date.parse(new Date()) + time_left);

        // start the clock
        run_clock('time',deadline);
    }
}

    // HOVERFUNCTION -> OnMouseOut = Pause / OnMouseOut = Resume

    document.getElementsByClassName("donate")[0].onmouseover=function()
    {
        // this.style.backgroundColor = "blue";
        pause_clock();
    };
    document.getElementsByClassName("donate")[0].onmouseout=function()
    {
        // this.style.backgroundColor = "red";
        resume_clock();
    };

}


