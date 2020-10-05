class Color {
    
    /**
     * @param {string} color 
     */
    static isColor(color){
        let isColor = require("is-color");

        if(Array.isArray(color)){
            for(let element of color){
                if(!isColor(element)){
                    return false;
                }
            }
            
            return true;
        } else {
            return isColor(color);
        }
    }
    
    /**
     * @param {string[]} colors 
     * @returns {string[]}
     */
    static convert(colors){
        let res = [];
        
        for(let color of colors){
            if(this.isHex(color)){
                let rgb = this.hexToRgb(color);
                
                if(rgb) color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
            }
            
            res.push(color);
        }
        
        return res;
    }
    
    /**
     * @param {string} color 
     * @returns {RegExpMatchArray}
     */
    static isHex(color){
        return color.match(/^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/ig);
    }
    
    /**
     * @param {string} hex 
     * @returns {{r: int, g: int, b: int}|null}
     */
    static hexToRgb(hex){
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : undefined;
    }
}

module.exports = Color;