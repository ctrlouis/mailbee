import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { totalFormSubmissions } from '../controllers/Prometheus';
import { SendMail } from '../services/MailSender';
import { findForm, validateFormData } from '../services/Forms';
import { allowOrigin } from '../services/Origin';

export async function SendForm (req: Request, res: Response, next :NextFunction) {
    try {
        const formData = req.body;

        // check require data
        validateFormData(formData, (err: string) => { throw createError(400, err) });

        // check if form exist
        const formKey = req.params.formKey;
        const form = findForm(formKey);
        if (form === null) throw createError(400, `Form ${formKey} not found`);

        // check if origin domain is allowed
        const origin = req.get('origin') || "";
        const allowedOrigin = allowOrigin(origin, form!.allowed_domains);
        if (!allowedOrigin) throw createError(400, `Request origin is not allowed`);

        // send form response by emails
        await SendMail(form!, formData);
        totalFormSubmissions.inc({ formName: form.name }, 1);
        
        if (typeof req.query.redirect === 'string') {
            res.redirect(req.query.redirect);
        } else {
            res.json({
                message: "Form send",
            });
        }
    } catch (error :any) {
        if (typeof req.query.redirect_error === 'string') {
            res.redirect(req.query.redirect_error);
        } else if (typeof req.query.redirect === 'string') {
            res.redirect(req.query.redirect);
        } else {
            next(error);
        }
    }
}