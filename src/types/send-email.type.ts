import { EmailType } from "./email-type.enum";

export type SendEmailData = {
    userId: string;
    email: string;
    emailType: EmailType;
}