const log = console.log;
const $ = require('jquery');
const axios = require('axios');
const util = require('util');

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

const addSendAnonButton = async (composeButton) => {
	setTimeout(() => {
		let parentTds = document.getElementsByClassName('gU Up');
		for (let i = 0; i < parentTds.length; i++) {
			if (parentTds[i].getAttribute('mailwith24-exhanced') === 'yes') continue;
			let sendBtn = parentTds[i].children[0].children[1];
			let asendBtn = sendBtn.cloneNode(true);
			asendBtn.innerText = 'Send anonymously';
			asendBtn.onclick = async (ev) => {
				let formParent = ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				let formId = formParent.children[1].children[0].getAttribute('id');
				let divs = document.getElementsByTagName('div');
				let recipients = [];
				let message = '';
				for (let k = 0; k < divs.length; k++) {
					if (divs[k].getAttribute('aria-label') === 'Message Body') {
						divs[k].click();
						let td = divs[k].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
						if (td.children[0].getAttribute('id') === formId) {
							divs[k].click();
							message = divs[k].innerText;
							let spansContainer = formParent.children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0];
							if (spansContainer.children[1].tagName.toLowerCase() === 'textarea') {
								alert('YOU HAVE TO PROVIDE RECIPIENT[S]');
							} else {
								for (let j = 1; j < spansContainer.children.length; j++) {
									if (('children' in spansContainer.children[j]) && spansContainer.children[j].children.length) {
										if (spansContainer.children[j].children[0].textContent !== 'CcBcc') {
											recipients.push(spansContainer.children[j].children[0].textContent);
										};
									};
								};
							};
						};
					};
				};
				log(`${message} to ${recipients}`);
				log(window.l_auth_token);
				let res = await axios({
					method: 'post',
					url: 'http://localhost:8081/mail',
					data: {
						from: window.userEmail,
						to: recipients[0].toString(),
						message,
					},
					json: true,
					headers: {
						'Authorization': `Bearer ${window.l_auth_token}`,
					},
				});
				log(`res: ${util.inspect(res)}`);
			};
			sendBtn.parentNode.appendChild(asendBtn);
			parentTds[i].setAttribute('mailwith24-exhanced', 'yes');
		};
	}, 500);
};

(async () => {
	window.g_auth_token = await csGet('g_auth_token');
	window.l_auth_token = await csGet('l_auth_token');
	window.userEmail = await csGet('userEmail');
	document.addEventListener('click', async (ev) => {
		let target = ev.target;
		if (('innerText' in target) && (target.innerText.toLowerCase() === 'compose')) await addSendAnonButton(ev.target);
	});
})();