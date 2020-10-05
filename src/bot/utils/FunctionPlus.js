class FunctionPlus {

    static range(start = 0, end = 10){
        return [...Array(end - start + 1).keys()].map(i => i + start);
    }
    
    static characterRange(startChar, endChar){
        return String.fromCharCode(...this.range(startChar.charCodeAt(0), endChar.charCodeAt(0))).split("");
    }

    /**
     * Return object with day, hour, minute and seconds.
     * @param {int} milliseconds 
     * @returns {{day: int, hour: int, minute: int, second: int}}
     */
    static convertMS(milliseconds){
        let day, hour, minute, second;

        second = Math.floor(milliseconds / 1000);
        minute = Math.floor(second / 60);
        second = second % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;

        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second
        };
    }
}

module.exports = FunctionPlus;