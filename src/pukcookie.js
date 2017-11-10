var jsonObj = null;

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
    xhr.open('GET', 'http://localhost:9000/src/cookie.json', true);
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
        cookie:{
            acceptButton: '<span class="pc-acceptbutton"><button class="cookie-accept-btn">' + options.content.cookie.acceptButton + '</button></span>',
            dismissButton: '<span class="pc-dismissButton">' + options.content.cookie.dismissButton + '</span>',
            text: '<span id="cookie:desc" class="pc-message">' + options.content.cookie.copy + '</span>',
            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="pc-link" href="' + options.content.cookie.link.href + '" rel="noopener noreferrer nofollow" target="_blank">' + options.content.cookie.link.text + '</a>',
            close: '<a aria-label="dismiss cookie message" role=button tabindex="0"  class="pc-btn pc-close" onclick="closepopup()">' + options.content.cookie.close + '</a>'
        },
        donate:{
            copy: '<span class="pc-message">' + options.content.donate.copy + '</span>',
            logo: '<a href="' + options.content.donate.logohref + '"rel="noopener noreferrer nofollow" target="_blank"> <img src="' + options.content.donate.logosrc + '" class="pc-donatelogo"></a>',
            donatebutton: '<div class="pc-donatebutton"' + options.content.donate.paypal + '</div>'
        }
    };
    function setcookie(name,value,path,domain,expiryDays){
        document.cookie = "name="+ name +" value="+ value +" path=" + path + " domain=" + domain + " expires=" + expiryDays;
    }

    function createcookiepupop(){
        var divCookie = document.createElement('div');
        var cont = document.body;

        //Appending the cookie notice on the body element
        divCookie.className = "pc-wrapper cookie active";
        divCookie.innerHTML += options.elements.cookie.text;
        divCookie.innerHTML += options.elements.cookie.link;
        divCookie.innerHTML += options.elements.cookie.acceptButton;
        cont.appendChild(divCookie);
    }

    function createdonatepopup(){
        var divDonate = document.createElement('div');
        var cont = document.body;

        //Appending the donate Popup
        divDonate .className = "pc-wrapper donate ";
        divDonate.innerHTML += options.elements.donate.copy;
        divDonate.innerHTML += options.content.donate.paypal;
        divDonate.innerHTML += options.elements.donate.logo;
        divDonate.innerHTML += options.elements.cookie.close;
        cont.appendChild(divDonate);
    }

    function switchstatus(){
        var cookie = document.getElementsByClassName("cookie");
        cookie[0].classList.remove("active");
        var donate = document.getElementsByClassName("donate");
        donate[0].classList.add("active");
        var btn = document.getElementsByClassName("cookie-accept-btn");
    }

    function closepopup(){
        var donate = document.getElementsByClassName("donate");
        donate[0].classList.remove("active");
    createcookiepupop();
    createdonatepopup();
    var accBtn = document.getElementsByClassName("cookie-accept-btn");
    accBtn.onclick(setcookie(options.cookieMeta.name ,options.cookieMeta.value, options.cookieMeta.path,options.cookieMeta.domain, options.cookieMeta.expiryDays),switchstatus());
}

}

(function (pc) {
    if (pc.hasInitialised) return;

    function init() {
        getjson();
    }

    // prevent this code from being run twice
    pc.hasInitialised = true;
    window.pukcookie = pc;
    init();

}(window.pukcookie || {}));