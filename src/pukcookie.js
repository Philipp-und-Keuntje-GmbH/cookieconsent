var jsonObj = null;
var cont = document.body;

function getjson() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                jsonObj = JSON.parse(xhr.response);
                displaypopup();
            }
            else {
                //make another ajax call to get the local json
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        jsonObj = JSON.parse(xhr.response);
                        displaypopup();
                    }
                };
                xhr.open('GET', 'http://localhost:9000/src/cookie.json', true);
                xhr.send();
            }
        }
    };
    xhr.open('GET', 'https://raw.githubusercontent.com/Philipp-und-Keuntje-GmbH/cookieconsent/master/src/cookie.json', true);
    xhr.send();
}

function displaypopup() {
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
            cookie: {
                acceptButton: jsonObj.unicef.cookie.acceptButton,
                dismissButton: jsonObj.unicef.cookie.dismissButton,
                link: {
                    text: jsonObj.unicef.cookie.link.text,
                    href: jsonObj.unicef.cookie.link.href
                },
                copy: jsonObj.unicef.cookie.copy,
                close: jsonObj.unicef.cookie.close
            },
            donate: {
                copy: jsonObj.unicef.donate.copy,
                logosrc: jsonObj.unicef.donate.logo.src,
                logohref: jsonObj.unicef.donate.logo.href,
                paypal: jsonObj.unicef.donate.paypal
            }
        }
    };

    options.elements = {
        cookie: {
            acceptButton: '<span class="pc-acceptbutton"><button class="cookie-accept-btn">' + options.content.cookie.acceptButton + '</button></span>',
            dismissButton: '<span class="pc-dismissButton">' + options.content.cookie.dismissButton + '</span>',
            text: '<span id="cookie:desc" class="pc-message">' + options.content.cookie.copy + '</span>',
            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="pc-link" href="' + options.content.cookie.link.href + '" rel="noopener noreferrer nofollow" target="_blank">' + options.content.cookie.link.text + '</a>',
            close: '<a aria-label="dismiss cookie message" role=button tabindex="0"  class="pc-btn pc-close">' + options.content.cookie.close + '</a>'
        },
        donate: {
            copy: '<span class="pc-message">' + options.content.donate.copy + '</span>',
            logo: '<a href="' + options.content.donate.logohref + '" rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.donate.logosrc + '" class="pc-donatelogo"></a>',
            donatebutton: '<div class="pc-donatebutton"' + options.content.donate.paypal + '</div>'
        }
    };


    function createcookiepopup() {
        var divCookie = document.createElement('div');

        //Appending the cookie notice on the body element
        divCookie.className = "pc-wrapper cookie active";
        divCookie.innerHTML += options.elements.cookie.text;
        divCookie.innerHTML += options.elements.cookie.link;
        divCookie.innerHTML += options.elements.cookie.acceptButton;
        cont.appendChild(divCookie);

        // Eventhandler on button
        var accbtn = divCookie.getElementsByClassName("cookie-accept-btn");
        accbtn[0].addEventListener("click", acceptclick);

    }

    function createdonatepopup() {
        var divDonate = document.createElement('div');

        //Appending the donate Popup
        divDonate.className = "pc-wrapper donate ";
        divDonate.innerHTML += options.elements.donate.copy;
        divDonate.innerHTML += options.content.donate.paypal;
        divDonate.innerHTML += options.elements.donate.logo;
        divDonate.innerHTML += options.elements.cookie.close;
        cont.appendChild(divDonate);

        var closebtn = divDonate.getElementsByClassName("pc-close");
        closebtn[0].addEventListener("click", closepopup);
    }

    function acceptclick() {
        console.log("text");
        setcookie(options.cookieMeta.name, options.cookieMeta.value, options.cookieMeta.path, options.cookieMeta.domain, options.cookieMeta.expiryDays);
        switchstatus();
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

    //calling the functions to load html
    createcookiepopup();
    createdonatepopup();


}

(function (pc) {
    if (pc.hasInitialised) return;

    function init() {
        if (!document.cookie) {
            getjson();
        }

    }

    // prevent this code from being run twice
    pc.hasInitialised = true;
    window.pukcookie = pc;
    init();

}(window.pukcookie || {}));