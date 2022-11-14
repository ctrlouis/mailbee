import fs from 'fs';
import ejs from 'ejs';

class MailTemplate {

    private static _templatePath: string = process.env.TEMPLATEPATH || '/mailbee/template.html';
    private static _template: string = MailTemplate.read();

    constructor() {}

    private static read() {
        const template = fs.readFileSync(MailTemplate._templatePath, 'utf8');
        console.log(`Template ${MailTemplate._templatePath} loaded ✅`);
        return template;
    }

    static render(data: any) {
        const html = ejs.render(MailTemplate._template, data);
        return html;
    }

    static get templatePath() {
        return MailTemplate._templatePath;
    }

    static get template() {
        return MailTemplate._template;
    }

}

export default MailTemplate;