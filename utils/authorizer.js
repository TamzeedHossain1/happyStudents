import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createError } from './error.js'
dotenv.config()

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(createError(401, 'You are not authenticated!'))
  }
  const user = jwt.verify(token, process.env.JWT)
  if (!user) return next(createError(403, 'Token is not valid!'))
  else {
    req.user = user
    next()
  }
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isArchive || req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, 'You are not authorized!'))
    }
  })
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin === true) {
      next()
    } else {
      return next(createError(403, 'You are not authorized!'))
    }
  })
}
