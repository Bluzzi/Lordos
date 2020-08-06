MAIN.CLIENT.on("messageReactionAdd", (messageReaction, user) => {
    if(user.id === MAIN.CLIENT.user.id) return;
});