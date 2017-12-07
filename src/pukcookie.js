var jsonObj = null;
var cont = document.body;
var amount='1.00';

function getjson(user_options) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                jsonObj = JSON.parse(xhr.response);
                displaypopup(user_options);
            }
            else {
                //make another ajax call to get the local json
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        jsonObj = JSON.parse(xhr.response);
                        displaypopup(user_options);
                    }
                };
                xhr.open('GET', 'http://localhost:9000/src/cookie.json'/*'https://raw.githubusercontent.com/Philipp-und-Keuntje-GmbH/cookieconsent/master/src/cookie.json'*/, true);
                xhr.send();
            }
        }
    };
    xhr.open('GET', 'http://localhost:9000/src/cookie.json', true);
    xhr.send();
}

function displaypopup(user_options) {
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
                timer:jsonObj.unicef.cookie.timer,
                copyDonate: jsonObj.unicef.donate.copy,
                logosrc: jsonObj.unicef.donate.logo.src,
                logosrcMini:jsonObj.unicef.donate.logo.srcmini,
                logohref: jsonObj.unicef.donate.logo.href,
                paypalImg: jsonObj.unicef.donate.paypalimg,
                paypalLink: jsonObj.unicef.donate.paypallink,
                copyWindow: jsonObj.unicef.donate.window.copy,
                placeholderWindow:jsonObj.unicef.donate.window.placeholder,
                successWindow:jsonObj.unicef.donate.success.text,
                returntext:jsonObj.unicef.donate.returntext,
                returnurl:jsonObj.unicef.donate.returnurl
        }
    };
    if (isPlainObject(user_options)) {
        deepExtend(options, user_options);
    }

    options.elements = {
        cookie: {
            acceptButton: '<span class="pc-acceptbutton"><button class="cookie-accept-btn">' + options.content.acceptButton + '</button></span>',
            dismissButton: '<span class="pc-dismissButton">' + options.content.dismissButton + '</span>',
            text: '<div id="cookie-desc" class="pc-message-popup">' + options.content.copyCookie + '<a class="pc-cookie-info" href="'+ options.content.link.href + '" target="_blank">'+options.content.link.text +'</a> <button class="cookie-accept-btn">' + options.content.acceptButton + '</button></div>',
            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="pc-link" href="' + options.content.link.href + '" rel="noopener noreferrer nofollow" target="_blank">' + options.content.link.text + '</a>',
            close: '<img class="pc-close" src="' + options.content.close + '">'
        },
        donate: {
            copy: '<span class="pc-message-popup">' + options.content.copyDonate +'</span>',
            logo: '<a href="' + options.content.logohref + '" rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.logosrc + '" class="pc-donatelogo-popup"></a>',
            logopaypal:'<a href="' + options.content.paypalLink + '" rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.paypalImg + '" class="pc-donatelogo-popup"></a>',
            timer:'<img class="pc-timer" src="'+ options.content.timer +'">',
            donatebutton: '<img class="pc-donatebuttonimg" src="' + options.content.paypal + '">',
            window:{
                logo:'<a href="' + options.content.logohref + '" rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.logosrc + '" class="pc-windowlogo"></a>',
                copy: '<div class="pc-message-window">' + options.content.copyWindow + '</div>',
                submit: '<input type="text" placeholder="'+ options.content.placeholderWindow+'" class="pc-input-window">',
                paypalbutton:
                '<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_blank" class="paypalform">' +
                '        <input type="hidden" name="cmd" value="_s-xclick">'+
                '        <input type="hidden" name="image_url" value="https://i.pinimg.com/736x/94/d4/c9/94d4c90934ffcfc00e48bcb01bae8d5a--unicef-logo-a-well.jpg">'+
                '        <input type="hidden" name="hosted_button_id" value="JGB6CLUXU4Q7U">'+
                '        <input type="hidden" name="return" value="'+options.content.returnurl+'">' +
                '        <input type="hidden" name="charset" value="utf-8">' +
                '        <input type="hidden" name="item_number" value="144001">' +
                '        <input type="hidden" name="cbt" value="'+options.content.returntext+'">' +
                '        <input type="hidden" name="lc" value="DE">' +
                '        <input type="hidden" name="image_url" value="'+options.content.logosrcMini+'">' +
                '        <input type="image" src="https://www.sandbox.paypal.com/de_DE/DE/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.">' +
                '        <img alt="" border="0" src="https://www.sandbox.paypal.com/de_DE/i/scr/pixel.gif" width="1" height="1">' +
                '    </form>' ,
                success:'<div class="pc-sucess-text">'+options.content.sucessWindow+ amount +'</div>'
            }
        }
    };


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

    function createdonatepopup() {
        var divDonate = document.createElement('div');
        var buttonwrapper = document.createElement('div');

        //Appending the donate Popup
        divDonate.className = "pc-wrapper donate ";
        buttonwrapper.className = "pc-button-wrapper";

        divDonate.innerHTML += options.elements.donate.copy;
        buttonwrapper.innerHTML += options.elements.donate.logo;
        buttonwrapper.innerHTML += options.elements.donate.logopaypal;
        buttonwrapper.innerHTML += options.elements.donate.window.paypalbutton;
        divDonate.appendChild(buttonwrapper);

        divDonate.innerHTML += options.elements.donate.timer;
        divDonate.innerHTML += options.elements.cookie.close;

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

    }
    function removewindow(classname){
        cont.removeChild(classname);
    }
    function acceptclick() {
        console.log("text");
        setcookie(options.cookieMeta.name, options.cookieMeta.value, options.cookieMeta.path, options.cookieMeta.domain, options.cookieMeta.expiryDays);
        switchstatus();
        //setTimeout(closepopup, 15000);
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

    function closepopup() {
        var donate = document.getElementsByClassName("donate");
        donate[0].classList.remove("active");
        var cookie = document.getElementsByClassName("cookie");
        cookie[0].classList.remove("active");
    }
    function showendscreen(name, value){
        console.log(name,value);
        var success = document.createElement('div');
        success.className("pc-window success");
        amount = value;
        success.innerHTML += options.elements.donate.window.logo;
        success.innerHTML += options.elements.window.success;

        cont.appendChild(success);
        //var copy = "Vielen Dank für deine Spende von "+ amount + "€ du bist toll, "+ name;
    }
    //calling the functions to load html
    createcookiepopup();
    createdonatepopup();
}

(function (pc) {
    if (pc.hasInitialised) return;

    pc.initialise=function(user_options) {
        if (!document.cookie) {
            getjson(user_options);
        }
    };

    // prevent this code from being run twice
    pc.hasInitialised = true;
    window.pukcookie = pc;

}(window.pukcookie || {}));
