import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import type { Transporter, SentMessageInfo, SendMailOptions } from "nodemailer";

@Injectable()
export class SendEmailUseCase {
    private transporter: Transporter<SentMessageInfo>;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOSTNAME,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_LOGIN,
                pass: process.env.SMTP_PASSWORD,
            },
        }) as Transporter<SentMessageInfo>;
    }

    async execute(to: string, code: string,): Promise<SentMessageInfo> {
        const mailOptions: SendMailOptions = {
            from: `"Tocaqui LTDA" <${process.env.SMTP_LOGIN}>`,
            to,
            subject: "Seu código de verificação 🔐",
            html: `
                <html>
                    <body style="margin:0; padding:0; background-color:#121212; font-family: Arial, sans-serif; color:#ffffff;">
                        <table width="100%" height="100%" cellpadding="0" cellspacing="0" style="background-color:#121212;">
                            <tr>
                                <td align="center" valign="middle">
                                    <table width="600" cellpadding="0" cellspacing="0" style="text-align:center;">
                                        <tr>
                                            <td style="padding: 20px 0;">
                                                <img src="https://i.ibb.co/PZrQTYjg/logo.png" alt="Logo" width="120" style="display:block; margin:0 auto;" />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 10px 0; font-size:24px; font-weight:bold;">
                                                Olá!
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 10px 0; font-size:16px;">
                                                Use o código abaixo para validar seu login:
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 20px 0;">
                                                <span style="
                                                    font-size:32px; 
                                                    background:#1E1E1E; 
                                                    padding:15px 30px; 
                                                    border-radius:8px; 
                                                    display:inline-block;
                                                    letter-spacing:3px;
                                                    font-weight:bold;
                                                ">
                                                    ${code}
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 10px 0; font-size:14px; color:#BBBBBB;">
                                                O código expira em <b>5 minutos</b>.
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 30px 0; font-size:12px; color:#888888;">
                                                Se você não fez essa solicitação, ignore este e-mail.
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
            `,
        };

        return this.transporter.sendMail(mailOptions);
    }
}
