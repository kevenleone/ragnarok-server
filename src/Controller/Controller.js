const GlobalMethods = require('../Util/globalMethods')
const Youch = require('youch')

class Controller extends GlobalMethods {

     constructor() {
         super();
     }

     /**
      * @param {*} Request 
      * @param {*} Response
      * @param {*} NextAction
      * @param {*} data The data received from the controller, on render page opcionally can be sent the data to use on page.
      * @description This method send a success response to user
      */
     sendSuccessResponse(req, res, next, data = {}) {
         console.log(`${req.method} 200 ${req.url}`)
         res.status(200).send({status: 200,data});
         next();
     }
     /**
      * @param {*} req Request
      * @param {*} res Response
      * @param {*} next NextAction
      * @param {*} error The error caused to being here, it will shown the page error 400 and the error description
      */
    async sendErrorResponse(req, res, next, error = {}) {
        console.log(`${req.method} 404 ${req.url}`)
        console.log(error)
        const youch = new Youch(error, req)
        res.send(await youch.toHTML())

        // res.status(400).send({status: 400, error});
        next();
     }

     sendImageResponse(req, res, next, image){
        res.writeHead(200, {'content-type': 'image/jpg'});
        res.end(image);
     }
 }

 module.exports = Controller