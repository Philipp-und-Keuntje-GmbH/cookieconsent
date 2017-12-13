##Cookies for Good

Cookies for Good is a Javascript based Cookie-Plugin. In advance to a Cookie notice it also displays an appeal to donate money for a good cause.

This Plugin is based on some functions of [Cookie Consent](https://cookieconsent.insites.com).

To use it implement the pukcookie.js and thepukcookie.css file into your Site.<br>Also call the initialise function in your Script:
```html
<script>
    window.pukcookie.initialise({
        content:{
            acceptButton:"OK",
            copyCookie:"Diese Website verwendet Cookies. Durch Verwendung dieser Website ohne die Cookie-Einstellungen Ihres Browsers zu ändern stimmen sie der Verwendung der Cookies zu. Weitere Informationen finden Sie in unseren ",
            returnurl:"https://philippundkeuntje.de",
            returntext:"Zurück zu Philipp und Keuntje"
        },
        cookieMeta:{
            name:"Testing"
        }
    });
</script>
```

You can also implement your own texts and Cookie Metainformation and other options.
You can check texts that are changeable in the pukcookie.js under the variable options.

We recommend to change the **returntext** and the **returnurl**, to the Information you want to be displayed at the end of the Paypal Workflow. 