const log = console.log;

const r = require('request-promise-native');
const util = require('util');

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

const csSet = async (k, v) => {
	return new Promise((go, stop) => {
		chrome.storage.sync.set({ [k]: v }, () => {
			return go();
		});
	});
};
const csGet = async (k) => {
	return new Promise((go, stop) => {
		chrome.storage.sync.get(k, (v) => {
			if (k in v) return go(v[k]);
			return go(undefined);
		});
	});
};

(async () => {
	var app = new Vue({
		el: 'app',
		data: {
			showAuth: true,
			g_auth_token: '',
			l_auth_token: '',
			currentView: 'mainView',
		},
		methods: {
			performAuth: async () => {
				if (this.g_auth_token.length) return undefined;
				this.g_auth_token = await getGToken().catch((e) => { console.error(e); });
				await csSet('g_auth_token', this.g_auth_token);
				if (! this.l_auth_token.length) {
					this.l_auth_token = await getLToken(this.g_auth_token).catch((e) => { console.error(e); });
					await csSet('l_auth_token', this.l_auth_token);
				};
				this.showAuth = false;
			},
		},
		beforeCreate () {
			this.currentView = 'mainView';
		},
		async created () {
			this.g_auth_token = await csGet('g_auth_token');
			this.l_auth_token = await csGet('l_auth_token');
			if (this.g_auth_token.length) this.showAuth = false;
		}
	});
})();