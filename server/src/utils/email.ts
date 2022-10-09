import dotenv from "dotenv";
import nodemailer from "nodemailer";
import pug from "pug";
import htmlToText from "html-to-text";
class Email {
  from: string;
  to: string;
  firstName: string;
  constructor(user: { name: string; email: string }, public url: string) {
    this.from = `Tran Minh Phat<${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
  }
  createTransport() {
    //
    if (process.env.NODE_ENV === "production") {
      // sendinBLue
      const host = process.env.MAILJET_HOST!;
      const port = process.env.MAILJET_PORT!;
      return nodemailer.createTransport({
        // @ts-ignore
        host,
        port,
        auth: {
          user: process.env.MAILJET_CREDENTIALS_PUBLIC,
          pass: process.env.MAILJET_CREDENTIALS_PRIVATE,
        },
      });
    }
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5517b79fa4c25c",
        pass: "e057395709464e",
      },
    });
  }
  async send(template: string, subject: string) {
    // create pub html for email
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };
    // send
    return await this.createTransport()?.sendMail(emailOptions);
  }
  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Reset your password (TOKEN ONLY VALID FOR 10MINS)"
    );
  }
  async sendWelcome() {
    await this.send("welcome", "HEllo to my first MERN PROEJCT.");
  }
}
export default Email;
