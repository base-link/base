/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import applyMiddleware from './applyMiddleware'

const getIP = request =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress

export const getRateLimitMiddlewares = ({
  keyGenerator,
  limit = 60,
  windowMs = 60 * 1000,
  delayAfter = Math.round(10 / 2),
  delayMs = 500,
} = {}) => [
  slowDown({ delayAfter, delayMs, keyGenerator, windowMs }),
  rateLimit({ keyGenerator, max: limit, windowMs }),
]

const middlewaresPerUser = getRateLimitMiddlewares({
  keyGenerator: getIP,
})

const middlewaresGlobally = getRateLimitMiddlewares({
  keyGenerator: () => process.env.RATE_LIMIT_CACHE_TOKEN ?? 'seed',
})

const middlewares = middlewaresPerUser.concat(middlewaresGlobally)

async function applyRateLimitMiddleware(request, response) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map(middleware => middleware(request, response)),
  )
}

async function applyRateLimit(request, response) {
  try {
    await applyRateLimitMiddleware(request, response)
    return false
  } catch (e) {
    res.status(429).json({ error: 'Rate limit exceeded' })
    return true
  }
}

export default applyRateLimit
