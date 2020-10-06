BOT.CLIENT.on("messageReactionAdd", (messageReaction, user) => {
    if(user.id === BOT.CLIENT.user.id) return;
});