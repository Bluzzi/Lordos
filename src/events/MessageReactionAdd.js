const EMBED = require("../utils/Embed");
const COOL_DISCORD_THINGS = require("../utils/CoolDiscordThings");

CLIENT.on("messageReactionAdd", (messageReaction, user) => {
    if(user.id === CLIENT.user.id) return;

    // Game support :
    messageReaction.message.embeds.forEach(function(embed){
        if(!embed.description) return;

        let splitMessage = embed.description.split(" ");

        if(splitMessage[0]){
            switch(splitMessage[0].replace("**<", "").replace(">**", "")){
                case "TicTacToe":
                    let playerOne = messageReaction.message.guild.member(COOL_DISCORD_THINGS.getMemberIdFromStringMention(embed.description));
            
                    console.log(playerOne.user.id,  messageReaction.message.author.id);
                    if(playerOne.user.id === messageReaction.message.author.id){
                        messageReaction.remove();

                        EMBED.send("Vous ne pouvez pas vous affronté vous même !", messageReaction.message.channel);
                    } else {
                        //EMBED.send("La partie entre " + a + " et " + b + " commence...", messageReaction.message.channel);
                    }
                break;
            }
        }
    });
});

//show the game grid
/*showGrid(grid, message){
    let text = "";
    
    for(let i = 0; i < 3; i++){
        text += grid.slice(3*i, 3*(i+1)).join("")+"\n";
    }
    
    message.channel.send(text).then((msg)=>{
        msg.react("1️⃣");
        msg.react("2️⃣");
        msg.react("3️⃣");
    })
    this.verifyGrid(grid)
}

verifyGrid(grid){
    let isEnd = []
    for(let i = 0; i < 3; i++){
        isEnd.push(grid[i] == grid[i + 3] && grid[i + 3] == grid[i+6] && grid[i] != ":white_square_button:")
    }
    for(let i = 0; i < 3; i++){
        isEnd.push(grid[i] == grid[i*3] && grid[i*3+1] == grid[i*3+2] && grid[i] != ":white_square_button:")
    }
    isEnd.push(grid[0] == grid[4] && grid[8] == grid[0] && grid[0] != ":white_square_button:")
    isEnd.push(grid[2] == grid[4] && grid[6] == grid[0] && grid[2] != ":white_square_button:")
    console.log(isEnd)
}*/