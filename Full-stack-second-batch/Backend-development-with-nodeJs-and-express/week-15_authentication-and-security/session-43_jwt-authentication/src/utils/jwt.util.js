import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m"
const ACCESS_TOKEN_SECRETE  = process.env.ACCESS_TOKEN_SECRETE || "15m"

export function signAccessToken(payload) {
return jwt.sign(payload, ACCESS_TOKEN_SECRETE, {expiresAt: ACCESS_TOKEN_EXPIRES_IN})
}


export function verifyAccessToken(token) {
return jwt.verify(token, ACCESS_TOKEN_SECRETE)
}

export function decodeToken(token) {
return jwt.decode(token , {complete: true})
}
