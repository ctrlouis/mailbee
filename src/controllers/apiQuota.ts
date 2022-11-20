import type { NextFunction, Request, Response } from 'express';
import RateLimiter from 'async-ratelimiter';
import createError from 'http-errors';
import Redis from 'ioredis';
import { getClientIp } from 'request-ip';

let defaultMax = 5;
if (typeof process.env.RATE_LIMITER_MAX === 'number') defaultMax = process.env.RATE_LIMITER_MAX;

let defaultDuration = 120;
if (typeof process.env.RATE_LIMITER_DURATION === 'number') defaultDuration = process.env.RATE_LIMITER_DURATION;

/**
 * 
 * @param max The maximum number of requests within duration.
 * @param duration How long keep records of requests in secondes.
 * @returns apiQuota function to use as Middleware
 */
export default function createApiQuota(max: number = defaultMax, duration: number = defaultDuration) {
    const rateLimiter = new RateLimiter({
        db: new Redis({
            host: 'redis_mailbee',
        }),
        max: max,
        duration: duration * 1000,
    });
    
    return async function apiQuota (req: Request, res: Response, next: NextFunction) {
        console.log("apiQuota");
        const clientIp = getClientIp(req);
        const limit = await rateLimiter.get({ id: clientIp! });
      
        if (!res.writableEnded && !res.headersSent) {
            res.setHeader('X-Rate-Limit-Limit', limit.total);
            res.setHeader('X-Rate-Limit-Remaining', Math.max(0, limit.remaining - 1));
            res.setHeader('X-Rate-Limit-Reset', limit.reset);
        }
    
        if (!limit.remaining) next(createError(429, "Too many request : rate limite reach"));
        next();
    }
}