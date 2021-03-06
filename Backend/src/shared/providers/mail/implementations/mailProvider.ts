
import nodemailer, { Transporter } from 'nodemailer';
import handlebar from 'handlebars';
import fs from 'fs';
import ISendMail from '../model/ISendMail';
import { resolve } from 'path'

class NodeMailerProvider implements ISendMail {

    private client: Transporter;

    public async sendEmail(to: string, subject: string, variables: object, model: string): Promise<string> {
        await this.configureTranporter();

        const path = resolve(__dirname, "..", "views", model);
        const templateFileContent = fs.readFileSync(path).toString('utf-8');
        const mailTemplateParse = handlebar.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        const msg = await this.client.sendMail({
            to,
            subject,
            html,
            from: 'matheuslima20111997@gmail.com'
        });

        return nodemailer.getTestMessageUrl(msg).toString();

    }

    public async configureTranporter() {
        await nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }
}

export default NodeMailerProvider;