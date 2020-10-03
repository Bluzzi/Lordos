const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const CANVAS = require("canvas");
const PATH = require("path");
const COLOR = require("../../../utils/Color");

CANVAS.registerFont(
    PATH.normalize(__dirname + "/../../../../resources/fonts/good-doggie.ttf"), 
    {
        family: "GoodDoggie"
    }
);

class GoodDoggie extends COMMAND {

    constructor(){
        super(
            "gooddoggie", 
            "Créé un meme \"Bon Toutou\" avec le pseudo de la personne mentionné et des couleurs personnalisés.", 
            "meme"
        );

        this.setAliases(["good-doggie", "bontoutou", "bon-toutou"]);
        this.setUsage("<pseudo, maximum 12 caractères> <color> ...[color]");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(args.length < 2 && args[0].length > 12) return false;

        message.channel.send(await this.generateGoodDoggie(args.shift(), args));
    }

    /**
     * Generate Good Doggie meme
     * @param {string} name 
     * @param {string[]} colors
     * @returns {DISCORD.MessageAttachment}
     */
    async generateGoodDoggie(name, colors = ["#4287f5"]){
        // Check errors :
        if(name.length > 12) throw new Error("Name parameter must be no more than 12 characters");
        
        // Format the name :
        name = name.replace(/_/g, " ");
        name = name.toUpperCase();
        
        // Convert color in a good format :
        colors = COLOR.convert(colors);
        
        // Draw the meme :
        let x, y;
        let can = CANVAS.createCanvas(256, 256);
        let ctx = can.getContext("2d");
        let imgData = await CANVAS.loadImage(__dirname + "/../../../../resources/images/good-doggie.png");
        
        ctx.drawImage(imgData, 30, 15, can.width, can.height);
        ctx.font = "italic 60px GoodDoggie";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineWidth = 3;
        
        x = 10;
        y = can.height - 50;
        
        ctx.fillText("BON", x, y);
        ctx.strokeText("BON", x, y);
        
        let fontAspect  = 60;
        
        ctx.font = `italic ${fontAspect}px GoodDoggie`;
        
        while(ctx.measureText(name).width > can.width){
            fontAspect--;
            ctx.font = `italic ${fontAspect}px GoodDoggie`;
        }
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.textBaseline = "middle";
        
        x = 1;
        y = (can.height / 1.10) - name.length;
        
        if(colors.length <= 2){
            let gradient = ctx.createLinearGradient(0, 0, colors.length * 100 + 50, colors.length * 100);
            let offset = 0;
            
            colors.forEach(function(color){
                gradient.addColorStop(offset, color);
                offset++;
            });
            
            ctx.fillStyle = gradient;
            
            ctx.fillText(name, x, y);
            ctx.strokeText(name, x, y);
        } else {
            let letters = name.split("");
            
            y = y - name.length;
            
            while(colors.length < letters.length) colors.push("#4287f5");

            for(let i = 0 ; i < colors.length ; i++){
                let letter = letters[i];

                if(i === 0){
                    x = 1;
                } else {
                    if(letter === "I"){
                        x += ctx.measureText(letter).width * 2;
                    } else {
                        if(letters[i - 1] === "I") {
                            x += ctx.measureText(letter).width / 2;
                        } else {
                            x += ctx.measureText(letter).width;
                        }
                    }
                }
                
                ctx.fillStyle = colors[i];
                
                ctx.strokeText(letter, x, y);
                ctx.fillText(letter, x, y);
            }
        }
        
        ctx.fill();
        ctx.stroke();
        
        return new DISCORD.MessageAttachment(can.toBuffer(), "good-doggie.png");
    }
}

module.exports = GoodDoggie;