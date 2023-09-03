const jwt = require('jsonwebtoken')
const utli = require('util')
const asyncverify = utli.promisify(jwt.verify)
const secretkey = 'kkkk'
const customError = require('./CustomError')

const authorized = async (req, res, next) => {
    const { authorization: token } = req.headers
    const decoded = await asyncverify(token, secretkey)
    if (decoded.id !== req.params.id) 
        next(customError({
            message: "Not Authorized",
            statusCode: 401
        }))
    
    next()
}
const tokenauthorized= async (req, res, next) => {
    const { authorization: token } = req.headers
    const decoded = await asyncverify(token, secretkey)
    req.id=decoded.id;
    if (!token) 
        next(customError({
            message: "Not found token",
            statusCode: 401
        }))
    
    next()
 
  }

const adminauthorized =  async (req, res, next) => {
    const { authorization: token } = req.headers
    const decoded = await asyncverify(token, secretkey)
    console.log(req.params.id)
    if (!decoded.isAdmin) 
        next(customError({
            message: "Not Authorized",
            statusCode: 401
        }))
    
    next()
}

module.exports = {authorized, tokenauthorized , adminauthorized}