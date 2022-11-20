import moment from 'moment';
import nodemailer from 'nodemailer';
import MailConfig from './MailConfig';
import MailTemplate from './MailTemplate';
import type { FormType } from '../interfaces/MailConfig';
import type { FormData } from '../interfaces/FormData';

export async function SendMail(form: FormType, formData: FormData) {
    try {
        const transporter = nodemailer.createTransport({
            host: MailConfig.host,
            port: MailConfig.port,
            secure: !MailConfig.disable_tls, // true for 465, false for other ports
            auth: {
                user: MailConfig.user, // generated ethereal user
                pass: MailConfig.password, // generated ethereal password
            },
        });

        const to = form.to_email.join(',');

        // set subject
        let subject = form.subject || process.env.DEFAULT_SUBJECT || "New message ✉️";
        if (form.overwrite_subject && formData.subject) {
            subject = formData.subject;
        }
        
        // generate html content
        const data = {
            formName: form.name,
            name: formData.name,
            email: formData.email,
            content: formData.content,
            time: moment().format('h:mm:ss a - MMMM Do YYYY'),
        };
        const html = MailTemplate.render(data);

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"${MailConfig.fromName}" <${MailConfig.fromEmail}>`, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        });
    } catch (error) {
        throw new Error("SMTP configuration error");
    }
}