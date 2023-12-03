package com.service;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMailler {
	public static boolean sendMail(String emailReceiver, String subject, String body) {
		try {
			String from = "tranthiendat220102@gmail.com";
			String password = "pibzwmqlclxcscra";

			String host = "smtp.gmail.com";
			String port = "587";

			Properties props = new Properties();
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", host);
			props.put("mail.smtp.port", port);

			Session session = Session.getInstance(props, new javax.mail.Authenticator() {
				protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
					return new javax.mail.PasswordAuthentication(from, password);
				}
			});

			session.getProperties().put("mail.mime.charset", "UTF-8");

			try {
				MimeMessage message = new MimeMessage(session);
				message.setFrom(new InternetAddress(from));
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(emailReceiver));
				message.setSubject(subject, "UTF-8");
				message.setText("Mật khẩu mới: " + body, "UTF-8");

				Transport.send(message);

				return true;

			} catch (MessagingException e) {
				e.printStackTrace();
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}
}
