import { Request, Response } from 'express';
import { SendMail } from '../services/MailSender';
import { findForm, validateFormData } from '../services/Forms';
import { allowOrigin } from '../services/Origin';
import type { FormData } from '../interfaces/FormData';

export async function SendForm (req: Request, res: Response) {
    let message = "";
    let status = 200;
    try {
        const body = req.body;
        const formData = validateFormData(body);

        // check if form exist
        const formKey = req.params.formKey;
        const form = findForm(formKey);
        if (form === null) throw new Error(`Form ${formKey} not found`);

        // check if origin domain is allowed
        const origin = req.get('origin') || "";
        const allowedOrigin = allowOrigin(origin, form.allowed_domains);
        if (allowedOrigin === null) throw new Error(`Request origin is not allowed`);

        // send form response by emails
        await SendMail(form, formData);
        status = 200;
        message = "Form send";
    } catch (error :any) {
        console.error(error);
        status = 500;
        message = error.message;
    }
    res
        .status(status)
        .json({
            message: message,
        });
}