CLIENT.on("message", (message) => {
    console.log(message.author.username + " : " + message.content);
});