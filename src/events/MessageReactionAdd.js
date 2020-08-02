CLIENT.on("messageReactionAdd", (messageReaction, user) => {
    if(user.id === CLIENT.user.id) return;
});