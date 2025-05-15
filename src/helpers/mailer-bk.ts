import User from "@/models/userModel";
import { EmailType } from "@/types/email-type.enum";
import { SendEmailData } from "@/types/send-email.type";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { generateEmailTemplate } from "./email-template";

export const sendEmail = async (data: SendEmailData) => {
    try {
        const hashedUserId = await bcryptjs.hash(data.userId.toString(), 10);

        if (data.emailType === EmailType.VERIFY_USER) {
            await User.findByIdAndUpdate(
                data.userId,
                {
                    verifyToken: hashedUserId,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            );
        }

        if (data.emailType === EmailType.FORGOT_PASSWORD) {
            await User.findByIdAndUpdate(
                data.userId,
                {
                    forgotPasswordToken: hashedUserId,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            );
        }

        const transport = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT as unknown as number,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const { subject, html } = generateEmailTemplate(data.emailType, hashedUserId);

        const mailOptions = {
            from: "user@gmail.com",
            to: data.email,
            subject,
            html
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error.message);
    }
};