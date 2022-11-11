export interface MailConfigType {
    global: GlobalType,
    forms: FormsType,
}

export interface GlobalType {
    smtp: SmtpType,
    http: HttpType,
}

export interface SmtpType {
    host: string,
    port: number,
    user: string,
    password: string,
    disable_tls: boolean,
    from_email: string,
    from_name: string,
}

export interface HttpType {
    adress: string,
}

export interface FormsType {
    [key: string]: FormType
}

export interface FormType {
    name: string,
    key: string,
    overwrite_subject?: boolean,
    subject?: string,
    allowed_domains: string[]
    to_email: string[]
}