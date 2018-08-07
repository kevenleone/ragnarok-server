module.exports.convertTimeSpawn = function (millisec) {
    var seconds = (millisec / 1000).toFixed(1);
    var minutes = (millisec / (1000 * 60)).toFixed(1);
    var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
        if(seconds === '0.0'){
            return "Instantâneo"
        } else {
            return seconds + " Sec";
        }
    } else if (minutes < 60) {
        return minutes + " Min";
    } else if (hours < 24) {
        return hours + " Hrs";
    } else {
        return days + " Days"
    }
}

module.exports.replaceBadChars = function(string){
    return string.replace(/'/g, '')
}

module.exports.secretKey = "wingardiumleviosa"
