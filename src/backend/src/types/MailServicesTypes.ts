interface Email {
    from?: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

interface MailServiceData {
    name: string,
    smtphost: string,
    smtpport: number
}

interface MailService {
    name: string,
    host: string,
    port: number
}

const processMailService = (data: MailServiceData): MailService => {
    return {
        name: data.name,
        host: data.smtphost,
        port: data.smtpport
    };
}

export {
    Email,
    MailServiceData,
    MailService,
    processMailService
}
