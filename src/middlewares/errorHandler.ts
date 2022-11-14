import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export function errorHandler (err :any, req :Request, res :Response, next :NextFunction) {
    console.log(err);
    let statusCode = 500;
    if (createError.isHttpError(err)) statusCode = err.status;
    res.status(statusCode);
    res.json({ error: err });
}