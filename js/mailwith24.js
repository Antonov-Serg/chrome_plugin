/**/
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
                    'src': "https://apis.google.com/js/platform.js"
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

}).$mount('haed');
/**/




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
                    <div">
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        <!--a href="https://accounts.google.com/o/oauth2/auth?client_id=763445920258-cvfpsq2e12bmtjucan5tbfteah74kt13.apps.googleusercontent.com&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords&redirect_uri=urn:ietf:wg:oauth:2.0:oob&access_type=offline&prompt=consent" target="_parent">Auth</a-->
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
        }else{
            /*
            *
            *  если доступов нет - получаем
            *
            * */
            //let ajax_headers = new Headers();
            //ajax_headers.set('Content-Type','application/x-www-form-urlencoded');
            //let ajax_params = {method: 'POST', ajax_headers, withCredentials: true}
            //fetch('https://www.googleapis.com/oauth2/v4/token', ajax_params)//куда стучим
                //.then((response) => {
                    //if(response.ok){
                        /* *
                        *
                        * если ответ не ошибка
                        *
                        * */
                        //console.log(response.headers);
                        //return response.json();// отдали JSON
                    //}else{
                        /* *
                        *
                        * если ответ ошибка
                        *
                        * */
                        //throw new Error('error AJAX response');// генерация обишки в вслучае если !response.ok
                    //}
                //})

                //.then((json) => {

                    /* *
                    *   тут то что мы даелм в ответом.
                    *   в нашем случае если все ок - ложим в localStorage токен от гугли и отдаем вторую форму
                    **/

                    //if(json._token !== null){
                        //window.localStorage.setItem('auth_token', json._token);// записали в localStorage полученный токен
                        //this.rotate_forms();// сротатили формочки, теперь у нас показывается формочка для того самого, отпрвки
                    //}
                //})

                //.catch((error) => {
                    //console.log(error);
                //});

        }

        fetch(this.endpoint)//куда стучим
        .then((response) => {
            if(response.ok){
                /* *
                *
                * если ответ не ошибка
                *
                * */
                return response.json();// отдали JSON
            }else{
                /* *
                *
                * если ответ ошибка
                *
                * */
                throw new Error('error AJAX response');// генерация обишки в вслучае если !response.ok
            }
        })

        .then((json) => {

            /* *
            *   тут то что мы даелм в ответом.
            *   в нашем случае если все ок - ложим в localStorage токен от гугли и отдаем вторую форму
            **/

            if(json._token !== null){
                window.localStorage.setItem('auth_token', json._token);// записали в localStorage полученный токен
                this.rotate_forms();// сротатили формочки, теперь у нас показывается формочка для того самого, отпрвки
            }
        })

        .catch((error) => {
            console.log(error);
        });

    }
    //

})/*.$mount('app')*/;



/***************************************************************** GOOGLE OAuth2 *****************************************************************/

/*
var config = {
    apiKey: "763445920258-cvfpsq2e12bmtjucan5tbfteah74kt13.apps.googleusercontent.com",
    databaseURL: "https://763445920258-cvfpsq2e12bmtjucan5tbfteah74kt13.firebaseio.com",
    storageBucket: "763445920258-cvfpsq2e12bmtjucan5tbfteah74kt13.appspot.com"
};
firebase.initializeApp(config);
*/

function onSignIn(googleUser) {

/*
    var config = {
        apiKey: '763445920258-cvfpsq2e12bmtjucan5tbfteah74kt13.apps.googleusercontent.com'
    };
    firebase.initializeApp(config);

    function initApp() {
        // Listen for auth state changes.
        firebase.auth().onAuthStateChanged(function(user) {
            console.log('User state change detected from the Background script of the Chrome Extension:', user);
        });
    }

    window.onload = function() {
        initApp();
    };
*/




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
