window.onload = function () {
    if (document.cookie.length != 0) {
        document.getElementById('ok').style.visibility = "hidden";
    }
};

function setCookiesValue() {
    var cookiesValue = "1";
    document.cookie = cookiesValue;
    document.getElementById('ok').style.visibility = "hidden";
}


var jsonObj = null;

function getjson() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                jsonObj = JSON.parse(xhr.response);
                displaypopup();
                console.log()
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

        // if false, this prevents the popup from showing (useful for giving to control to another piece of code)
        enabled: true,

        // optional (expecting a HTML element) if passed, the popup is appended to this element. default is `document.body`
        container: null,

        // defaults cookie options - it is RECOMMENDED to set these values to correspond with your server
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
            acceptButton: '<span class="pc-acceptbutton"><button>' + options.content.cookie.acceptButton + '</button></span>',
            dismissButton: '<span class="pc-dismissButton">' + options.content.cookie.dismissButton + '</span>',
            textlink: '<span id="cookie:desc" class="pc-message">' + options.content.cookie.copy + '<a aria-label="learn more about cookies" role=button tabindex="0" class="pc-link" href="' + options.content.cookie.link.href + '" rel="noopener noreferrer nofollow" target="_blank">' + options.content.cookie.link.text + '</a></span>',
            close: '<a aria-label="dismiss cookie message" role=button tabindex="0"  class="pc-btn pc-close">' + options.content.cookie.close + '</a>',
            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="pc-link" href="' + options.content.cookie.link.href + '" target="_blank">' + options.content.cookie.link.text + '</a>'
        },
        donate:{
            copy: '<span class="pc-message"><button>' + options.content.donate.copy + '</button></span>',
            logo: '<a href="' + options.content.donate.logohref + '" <img src="' + options.content.donate.logosrc + '" class="pc-logo/>'
        }
    };
    function createcookiepupop(){
        var divCookie = document.createElement('div');
        var cont = document.body;

        //Appending the cookie notice on the body element
        divCookie.className = "pc-cookie-wrapper";
        divCookie.innerHTML += options.elements.cookie.acceptButton;
        divCookie.innerHTML += options.elements.cookie.dismissButton;
        divCookie.innerHTML += options.elements.cookie.textlink;
        cont.appendChild(divCookie);
    }
    function createdonatepopup(){
        var divDonate = document.createElement('div');
        var cont = document.body;

        //Appending the donate Popup
        divDonate .className = "pc-donate-wrapper";
        divDonate.innerHTML += options.elements.donate.copy;
        divDonate.innerHTML += options.elements.donate.logo;
        divDonate.innerHTML += options.elements.donate.paypal;
    }
    

    /*function appendMarkup(markup) {
        var opts = this.options;
        var div = document.createElement('div');
        var cont = (opts.container && opts.container.nodeType === 1) ? opts.container : document.body;

        div.innerHTML = markup;

        var el = div.children[0];

        el.style.display = 'none';

        if (util.hasClass(el, 'cc-window') && cc.hasTransition) {
            util.addClass(el, 'cc-invisible');
        }

        // save ref to the function handle so we can unbind it later
        this.onButtonClick = handleButtonClick.bind(this);

        el.addEventListener('click', this.onButtonClick);

        if (opts.autoAttach) {
            if (!cont.firstChild) {
                cont.appendChild(el);
            } else {
                cont.insertBefore(el, cont.firstChild)
            }
        }

        return el;
    }*/
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