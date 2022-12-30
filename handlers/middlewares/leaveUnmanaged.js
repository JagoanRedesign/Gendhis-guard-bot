'use strict';

const { managesGroup, migrateGroup } = require('../../stores/group');

const { chats = {} } = require('../../utils/config').config;

const pkg = require('../../package.json');


const caption = `\
Maaf, Anda perlu menyiapkan instance Anda sendiri \ untuk menggunakan saya di grup Anda atau jaringan grup. 

Jika Anda tidak ingin menghosting sendiri,\ Anda dapat mencoba @Qya4bot sebagai gantinya.
`;

const inline_keyboard = [ [ {
	text: 'Owner Bot',
	url: 'https://t.me/Mazekubot',
} ] ];

const reply_markup = JSON.stringify({ inline_keyboard });

const gifIds = [
	'xTk9ZBWrma4PIC9y4E',
	'l2Sqc3POpzkj5r8SQ',
	'StaMzjNkq5PqM',
	'fjYDN5flDJ756',
	'3XiQswSmbjBiU',
];

const gifs = gifIds.map(x => `https://media.giphy.com/media/${x}/giphy.gif`);


/**
 * @template T
 * @param {Array<T>} arr
 */
const randomChoice = arr => arr[Math.floor(Math.random() * arr.length)];


/** @param { import('telegraf').Context } ctx */
const leaveUnmanagedHandler = async (ctx, next) => {
	if (!ctx.message) return next();
	if (ctx.message.migrate_from_chat_id) {
		return migrateGroup(ctx.message.migrate_from_chat_id, ctx.chat.id);
	}

	if (
		ctx.chat.type === 'private' ||
		Object.values(chats).includes(ctx.chat.id) ||
		await managesGroup({ id: ctx.chat.id })) {
		return next();
	}

	try {
		await ctx.replyWithVideo(randomChoice(gifs), { caption, reply_markup });
	} catch (err) {
		// do nothing
	}
	// kode keluar
};

module.exports = leaveUnmanagedHandler;
