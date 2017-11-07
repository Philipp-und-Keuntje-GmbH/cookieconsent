window.onload=function () {
    if(document.cookie.length !=0){
       document.getElementById('ok').style.visibility="hidden";
    }
}

function  setCookiesValue() {
    var cookiesValue = "1" ;
    document.cookie = cookiesValue;
    document.getElementById('ok').style.visibility="hidden";
}



var jsonObj = null;
function getjson(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (request.status >= 200 && request.status < 300){
                jsonObj = JSON.parse(xhr.response);
            }
            else{
                jsonObj = JSON.parse
            }
        }
    };
    xhr.open('GET', 'http://localhost:9000/src/cookie.json', true);
    xhr.send(null);
}

(function(pc) {
    if (pc.hasInitialised) return;
    getjson();
    function display(){
        var defaultOptions = {

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
            acceptButton: jsonObj.unicef.cookie.acceptButton,
            dismissButton: jsonObj.unicef.cookie.dismissButton,
            denyButton: jsonObj.unicef.cookie.denyButton,
            link:{
                text: jsonObj.unicef.cookie.link.text,
                href: jsonObj.unicef.cookie.link.href
            },
            copy: jsonObj.unicef.cookie.copy,
            close: jsonObj.unicef.cookie.close,
            cookieMeta:{
                name: jsonObj.unicef.cookie.cookieMeta.name,
                value: jsonObj.unicef.cookie.cookieMeta.value,
                expiryDays: jsonObj.unicef.cookie.cookieMeta.expiryDays,
                domain: jsonObj.unicef.cookie.cookieMeta.name.domain,
                path: jsonObj.unicef.cookie.cookieMeta.name.path
            }
        },
            elements: {
                acceptbutton: '<span class="pc-acceptbutton">{{acceptButton}}</span>;',
                dismissButton: '<span class="pc-dismissButton">{{dismissButton}}</span>',
                textlink: '<span id="cookie:desc" class="cc-message">{{copy}} <a aria-label="learn more about cookies" role=button tabindex="0" class="pc-link" href="{{link.href}}" rel="noopener noreferrer nofollow" target="_blank">{{link.text}}</a></span>',
                denyButton: '<a aria-label="dismiss cookie message" role=button tabindex="0" class="cp-btn cp-dismiss">{{denyButton}}</a>',
                close: '<a aria-label="dismiss cookie message" role=button tabindex="0"  class="cc-btn cc-close">{{close}}</a>',
                link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{link.href}}" target="_blank">{{link.text}}</a>',
            }
    }
        function appendMarkup(markup) {
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
        }
    }
    // prevent this code from being run twice
    pc.hasInitialised = true;
    if (pc.hasInitialised) return;
    window.pukcookie = pc;

}(window.pukcookie || {}));