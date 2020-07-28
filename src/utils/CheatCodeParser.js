class CheatCodeParser {
    
    static parseGBC(code) {
        let codes = [];
        
        code = code.replace(/\n/g, " ");
        code = code.split(" ");
        
        for(let c of code){
            c = c.replace(" ", "");
            
            if(c.length < 8) {
                continue;
            }
            
            let addr = c.substr(4, 4);
            let value = c.substr(0, 4);
            
            codes.push({
                addr,
                value
            });
        }
        
        return codes;
    }
    
    static parseGBA(code) {
        let codes = [];
        
        // ToDo
        
        return codes;
    }
}

module.exports = CheatCodeParser;