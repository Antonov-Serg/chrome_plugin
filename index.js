const log = console.log;

const r = require('request-promise-native');

const getGToken = async () => {
	return new Promise((go, stop) => {
		chrome.identity.getAuthToken({
			interactive: true,
			scopes: [ 'https://www.googleapis.com/auth/userinfo.email' ],
		}, (token) => {
			if (chrome.runtime.lastError) return stop(new Error(chrome.runtime.lastError));
			return go(token);
		});
	});
};

const getLToken = async (g_auth_token) => {
	let res = await r(`http://localhost:8081/auth/gettoken/${g_auth_token}`).catch((e) => { console.error(e); });
	if (! res) throw new Error(`NO L_TOKEN: ${res}`);
	if (typeof(res) === 'string') res = JSON.parse(res);
	if (! ('token' in res)) throw new Error(`NO L_TOKEN: ${res}`);
	if (! res.token) throw new Error(`NO L_TOKEN: ${res}`);
	return res.token;
};

(async () => {
	var v_app = new Vue({
		el: 'components',
		data: {
			show_authform: false,
			show_sendform: true,
			g_auth_token: '',
			l_auth_token: '',
			endpoint: 'http://homestead.test/test.html',
			currentView: 'login_form',
		},
		components: {
			login_form: {
				template: `<div>login_form</div>`
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

				return this.currentView;
			},
		},
		beforeCreate () {
			this.currentView = 'send_form';
		},
		async created () {
			window.localStorage.removeItem('g_auth_token');
			window.localStorage.removeItem('l_auth_token');
			let g_auth_token = window.localStorage.getItem('g_auth_token');
			let l_auth_token = window.localStorage.getItem('l_auth_token');
			if (! g_auth_token) {
				g_auth_token = await getGToken().catch((e) => { console.error(e); });
				window.localStorage.setItem('g_auth_token', g_auth_token);
			};
			if (! l_auth_token) {
				l_auth_token = await getLToken(g_auth_token).catch((e) => { console.error(e); });
				window.localStorage.setItem('l_auth_token', l_auth_token);	
			};
		}
	});
})();