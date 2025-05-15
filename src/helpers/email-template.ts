import { EmailType } from "@/types/email-type.enum";

type EmailTemplate = {
    subject: string;
    html: string;
}

export function generateEmailTemplate(emailType: EmailType, token: string): EmailTemplate {
    const emailConfig: Record<EmailType, { subject: string; path: string; actionText: string }> = {
        [EmailType.VERIFY_USER]: {
            subject: 'Verify your email',
            path: 'verifyemail',
            actionText: 'verify your email'
        },
        [EmailType.FORGOT_PASSWORD]: {
            subject: 'Forgot Password',
            path: 'forgot-password',
            actionText: 'reset your password'
        },
        [EmailType.RESET_PASSWORD]: {
            subject: 'Reset your password',
            path: 'reset-password',
            actionText: 'reset your password'
        }
    };

    const config = emailConfig[emailType];
    const url = `${process.env.DOMAIN}/${config.path}?token=${token}`;
    const html = `<p>Click <a href="${url}">here</a> to ${config.actionText}</p><br>OR Copy and paste this link in your browser: ${url}`;

    return {
        subject: config.subject,
        html
    };
}
