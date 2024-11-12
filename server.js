const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'michimed.veterinaria@gmail.com', // Tu correo
        pass: 'mrbq grwh rvdm woeu' // Contraseña o contraseña de aplicación
    }
});

app.post('/send-email', (req, res) => {
  const { email, nombre, asunto, mensaje } = req.body;

  if (!email) {
      return res.status(400).json({ success: false, message: 'El campo "email" es requerido.' });
  }

  const mailOptions = {
      from: 'michimed.veterinaria@gmail.com',
      to: email,  // Este es el destinatario
      subject: `Gracias por contactarnos: ${asunto}`,
      html: `
          <p>Hola ${nombre},</p>
          <p>Gracias por contactarte con nosotros. Este es el mensaje que recibimos:</p>
          <blockquote>${mensaje}</blockquote>
          <p>Nos pondremos en contacto contigo pronto.</p>
          <p>Si necesitas comunicarte rápidamente, puedes escribirnos directamente por WhatsApp:</p>
          <p><a href="https://wa.me/573134396891" target="_blank">Haz clic aquí para hablar en WhatsApp</a></p>
          <p>¡Saludos cordiales!<br>El equipo de Michimed Veterinaria</p>
      `
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error enviando correo:', error);
          return res.status(500).json({ success: false, message: `Hubo un error al enviar el correo. Error: ${error.message}` });
      }
      console.log('Correo enviado:', info.response);
      res.status(200).json({ success: true, message: 'Correo enviado con éxito' });
  });
});

app.listen(3000, () => console.log('Servidor de correo activo en el puerto 3000'));
