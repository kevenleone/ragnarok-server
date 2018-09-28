var ip = require('ip')
var ENV = process.env
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
    var str = `${string}`
    return str.replace(/'/g, '')
}

module.exports.verifyToken = function(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        var bearer = bearerHeader.split(' ')
        var bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        console.log('access denied')
        res.status(401).json({Error: "Access Denied"})
    }   
}

if(ENV.ENV == "DEV"){
    module.exports.URL = `${ip.address()}:${ENV.PORT}`
} else {
    module.exports.URL = "https://ragnarokdb.herokuapp.com"
}

module.exports.secretKey = "wingardiumleviosa123"
