/** /
new Vue({

    //el: 'head',

    render (createElement) {
        return [
            createElement(
                'script',
                {
                    attrs: {
                        // тут должно быть навешивание свойста v-bind:is="currentView"
                        'async': "async",
                        'defer': "defer",
                        'src': "https://apis.google.com/js/platform.js?onload=init"
                    }
                }
            ),
            createElement(
                'script',
                {
                    attrs: {
                        // тут должно быть навешивание свойста v-bind:is="currentView"
                        'async': "async",
                        'src': "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.ru.OJ73qm2Ow7U.O/m=signin2/rt=j/sv=1/d=1/ed=1/am=AQE/rs=AGLTcCMdmnobHNfiU8BYhAB27btjQPKtKg/cb=gapi.loaded_0"
                    }
                }
            )
        ]
    },

}).$mount('head');
/** /

 // путь в нитуда (еще раз инициализирует уже инициализированный скрипт который еще раз вызывает ошибку кук)


function init() {
console.log('init() ... ok');
	gapi.load('auth2', {
//console.log('gapi.load ... ok');

        callback: function() {
            // Handle gapi.client initialization.
            //initGapiClient();
            console.log('gapi.load ...ok');
            gapi.auth2.init({
                apiKey: "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbQXgj97m6JkOogACR8hXHEWPo3rzBmDguRx+C8RePDG9S8a8oWLZZiyEMhA4ke5pZYbrbkw5kaTkw4EqMPo2vZKHT8bRH04YQi3iOkt2DxDfbTyT+92T2nW4t7X/IkgJbg2Rrift1zFC5cUwx0EyvcUzRtmwUxrWwLfI2h7nNwzAqlkeRJW47kHuCgiFz5yTI2il7ktaxvgntbEQCZutZfk2Ypp/UlKDiUHIkQIPoVtBuFvFAGI5bc0pJz8mDh549cFsfqzuCy4SShtrry9vHNDct3OIWZjfR6JnK5fO6Up7EUJ/qIHCGy9gw8O2j+Tg555XRkfzrozrV8ZE4n2bhAgMBAAECggEABACrH9mC6fCDCpfV9+1E7CZjyBrvtKmjk2cbUgZMXUhosXOkWHzYwuhJL14DUbPHcvPn5/G3p41eS28hYeIqF8Q3TzgcTdSfYHthhdK1y/gT2PM+btW2xkxAzSWiD3Qa9CQ4E1UN4OueBklkUZWTSAvCo1aVvM+CizC0jZ0IPGyYNWxgqTkUzsJtphh+gIL1J1hSM3als+R1M+FtRdHpH+O3eIp6SHa3KUuVZoowPvfntcvfCRoz5pko6hUhwv6k9ei6D1vNAGKVfa0cRNZ9WRoxxys+0IsTjEBXpjf0uRbzAkqOL4CL35MLZv6qt3yfLsf28WTTpOJhv5TWsFERAQKBgQDahK8rNEO3LkJiD9l2lDmSDowJ8jGcvwl4LzlBPi0lKyyYFK3hXX3lUN5W4xk74T3Ml1XIUyXJtekpETd5eb28cN6WP1/XdpAsymcZKZAYawijI0zxvrqrWZkc0ZkHG11uRHOVjPseHPvAbUPQYR0o+tcSkmINOoYTGvq4NtOlAQKBgQC14t/xkWz456o+i/HvJ4WClVbS2anaW/wEqx8uf4rWtlQd16ds+QrKleR9dyB8c7sD2w92TofrsmKzW/A/nhM9yOK9bLuXJ/q4ppwJVrtUgyo1h8WyPlrnpaAm9xjXFHELGHCBtPdRYbvBYCEf1STib6LXyR7RmSRetmHFqRZh4QKBgCxegp7YJuO77dixdSthn2rrrz2Zwr8b/xU7KXn44PvKD2z1zfSToit8xxiHVilVa9Ht7IoXb/XMDQK8rzHoKUFo/ZkuVwyN02p00ohGay66FO/jDA2N96MxNyil2leaE9d+6KU2EgskQW3qAbn+7gfTHvZzaJtdBbo9YSkkYMcBAoGAFAS1WxQDZ12v+hRS+1xhMF8ZYDl+nT7UfPsMgoSdFkaY+XPbxH2gd22J6VksJSZjpef9SqsYAJPwkwcCaS4PthQfCHQoLVnEGYCU2d5G3eVVxvB7jMOaI7ax6rf1bu6cBnmZIF13fuh/zqey3ZsK5TUeOhuznaP6QcZW+ndCtGECgYAuh9qXeof/0xnjjU2THfjfG/4uzYrVh/1sJxSYB0VwkyXsG6DIGCnlGJMXjcOgTlO5WwPFRQii7SppBSPUe4YY8QxakCT+ZI32ssMAejmhQ7bNOYso0xbjcoVykzIZb4NQrVZ9TfJR9vUKKCB9gdZET8+waddRR+6aNmOyo+dxcw==",
                discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                clientId: "763445920258-dt1182u020g1k2bcs42rtlnh0eguodau.apps.googleusercontent.com",
                scope: ["identity", "profile"]
            }).then(function () {
                console.log('gapi.auth2.init ... ok')
                // Listen for sign-in state changes.
                //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
                // Handle the initial sign-in state.
                //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                console.log(gapi.auth2.getAuthInstance().isSignedIn);
            })
        },
        onerror: function() {
            // Handle loading error.
            alert('gapi.client failed to load!');
        },

	})//end gapi.load

    //console.log(gapi);

    //console.log(gapi.auth2.getAuthInstance());

}//end init
*/


var v_app = new Vue({

    el: 'components', // элемент который мы работаем

    data: {
        show_authform: true,
        show_sendform: false,

        auth_token: '',
        endpoint: 'http://homestead.test/test.html',

        currentView: 'login_form',
    },

    components: {

        login_form: {
            template: `
				            <div>
				                <div class="g-signin2" data-onsuccess="onSignIn"></div>
				            </div>`
        },

        send_form: {
            template: `<form method="post"">
				                    <input type="text" name="name_user" />
				                    <input type="email" name="email_user" />
				                    <textarea name="comment_user"></textarea>
				                    <input type="hidden" name="mail_date" />
				                    <input type="hide" name="token" />
				                    <button type="submit">Send</button>
				                </form>`
        },
    },

    methods: {
        rotate_forms: function () {
            if(this.show_sendform == true){
                this.currentView = 'send_form';
            }else{
                this.currentView = 'login_form';
            }

            this.show_authform = !this.show_authform;// true=>false || false=>true
            this.show_sendform = !this.show_sendform;// true=>false || false=>true

            console.log(this.currentView);
            return this.currentView;
        },

        get_temporary_token: function(){

            //

        }


    },

    beforeCreate(){
        console.log('new Vue ... ok');
        this.currentView = 'login_form';
    },

    created(){
        window.localStorage.removeItem('auth_token');//#################################################### DEBUG !!!
        if(window.localStorage.getItem('auth_token') !== null){
            /*
            *
            * если токен у нас есть - проверяем время жизни
            *
            * */
            console.log('token exists');
        }else{
            /*
            *
            *  если доступов нет - получаем
            *
            * */
            console.log('token N2O exists');
            this.currentView = 'login_form';
            chrome.identity.getAuthToken({
                'interactive': true,
                //account: accounts[0],   //  вот тут по хорошему надо сначала спросить юзера какой акк юзать, но для тестов юзаем тупо первый
                scopes: ["https://www.googleapis.com/auth/userinfo.email"],  //  скопы из манифеста
            }, (token) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                };
                console.log(token);
            });
            /*chrome.identity.getAccounts((accounts) => {
                if (! accounts.length) {
                    chrome.identity.getAuthToken({
                        'interactive': true,
                        scopes: ["https://www.googleapis.com/auth/userinfo.email"],  //  скопы из манифеста
                    }, (token) => {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        };
                        console.log(token);
                    });
                } else {

                };
            });*/
        }
    }
});// end Vue obj
//console.log(v_app.currentView);

function onSignIn(googleUser) {
    console.log('here');
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
};

