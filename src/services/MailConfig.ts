import fs from 'fs';
import YAML from 'yaml';
import type { MailConfigType } from '../interfaces/MailConfig';

class MailConfig {
    private static _configPath: string = process.env.CONFIGPATH || '/mailbee/config.yml';
    private static _config: MailConfigType = MailConfig.read();

    constructor() {}

    static get() {
        return MailConfig._config;
    }

    private static read() {
        const file = fs.readFileSync(MailConfig._configPath, 'utf8');
        const config = YAML.parse(file);
        console.log(`Config ${MailConfig._configPath} loaded`);
        return config;
    }

    static get configPath() {
        return MailConfig._configPath;
    }

    static get config() {
        return MailConfig._config;
    }

    static get host() {
        return MailConfig._config.global.smtp.host;
    }

    static get port() {
        return MailConfig._config.global.smtp.port;
    }

    static get user() {
        return MailConfig._config.global.smtp.user;
    }

    static get password() {
        return MailConfig._config.global.smtp.password;
    }

    static get disable_tls() {
        return MailConfig._config.global.smtp.disable_tls;
    }

    static get fromEmail() {
        return MailConfig._config.global.smtp.from_email;
    }

    static get fromName() {
        return MailConfig._config.global.smtp.from_name;
    }

    static get forms() {
        return MailConfig._config.forms;
    }
}

export default MailConfig;