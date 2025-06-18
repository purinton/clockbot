// events/messageCreate.mjs
export default async function ({ log, msg }, message) {
    log.debug('messageCreate', { id: message.id });
    if (message.author.bot) return;
    const locale = message.guild?.preferredLocale || 'en-US';
    if (message.content === '!time') {
        const handler = (await import('../commands/time.mjs')).default;
        await handler({
            log,
            msg: (key, defaultMsg) => msg(locale, key, defaultMsg, log)
        }, message);
        return;
    }
    if (message.content === '!sun') {
        const handler = (await import('../commands/sun.mjs')).default;
        await handler({
            log,
            msg: (key, defaultMsg) => msg(locale, key, defaultMsg, log)
        }, message);
        return;
    }
}