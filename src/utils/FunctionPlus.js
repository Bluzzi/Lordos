class FunctionPlus {

    static range(start = 0, end = 10){
        return [...Array(end - start + 1).keys()].map(i => i + start);
    }
    
    static characterRange(startChar, endChar){
        return String.fromCharCode(...this.range(startChar.charCodeAt(0), endChar.charCodeAt(0))).split("");
    }
}

module.exports = FunctionPlus;