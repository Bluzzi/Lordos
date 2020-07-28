class Style {
    /**
     * 
     * @param {String} message message to transform 
     * @param {String} symbol symbols which will be around the message
     * @returns {String} the title  
     */
     
    static createTitle(message, symbol = "*"){
        let symbols = [];
        for(let i=0;i<message.length+8; i++){
            symbols.push(symbol);
        }

        return symbols.join("") + "  " + message  + "  " + symbols.join("");
    }
}

module.exports = Style;