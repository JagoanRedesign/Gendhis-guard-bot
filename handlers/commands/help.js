'use strict';
const { Markup } = require('telegraf');
const { homepage } = require('../../package.json');

const message = `\
Hai!

Saya adalah bot <b>administrasi</b> yang membantu Anda mempertahankan \ <b>grup</b> Anda aman dari <b>spammer.</b> 

Kirim /commands  untuk mendapatkan daftar perintah yang tersedia. 

Jika Anda ingin menggunakan saya untuk grup Anda, \ perhatikan bahwa saya lebih berguna di jaringan grup dan \ Anda juga perlu <b>menyiapkan bot baru.</b> 

Jadi jika Anda tidak ingin menghosting sendiri, @Qya4bot \ mungkin pilihan yang lebih baik untuk Anda.
`;

/** @param { import('../../typings/context').ExtendedContext } ctx */
const helpHandler = (ctx) => {
	if (ctx.chat.type !== 'private') return null;

	return ctx.replyWithHTML(
		message,
		Markup.inlineKeyboard([
			Markup.button.url('Owner Bot', 'https://t.me/Mazekubot')
		])
	);
};

module.exports = helpHandler;
