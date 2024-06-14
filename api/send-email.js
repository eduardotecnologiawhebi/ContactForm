// src/api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { department, name, email, message } = req.body;

    const departmentEmails = {
        vendas: 'vendas@example.com',
        contas: 'contas@example.com',
        sac: 'sac@example.com',
        teste: 'tecnologia.whebi@gmail.com',
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: departmentEmails[department],
        subject: `Mensagem de ${name} (${email})`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar email' });
    }
}
