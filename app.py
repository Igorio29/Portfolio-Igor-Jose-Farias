from flask import Flask, render_template, redirect, request, flash
from flask_mail import Mail, Message
from config import email,senha

app = Flask(__name__)
app.secret_key = "Fartech"

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": email,
    "MAIL_PASSWORD": senha 
}

app.config.update(mail_settings)

mail = Mail(app)

class Contato:
    def __init__(self, nome, email, mensagem):
        self.nome = nome
        self.email = email
        self.mensagem = mensagem

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send():
    if request.method == 'POST':
        formContato = Contato(
            request.form["nome"],
            request.form["email"],
            request.form["mensagem"]
        )
        msg = Message(
            subject=f'{formContato.nome} te enviou uma mensagem no portfólio',
            sender=app.config.get("MAIL_USERNAME"),  # Corrigido
            recipients=['igorjosefarias3@gmail.com', app.config.get("MAIL_USERNAME")],  # Corrigido
            body=f'''
                {formContato.nome} com o email {formContato.email}, te enviou a seguinte mensagem:

                {formContato.mensagem}

                Responda assim que possível!
            '''
        )

        mail.send(msg)

        msg_confirmacao = Message(
            subject='Confirmação de envio de mensagem',
            sender=app.config.get("MAIL_USERNAME"),
            recipients=[formContato.email],
            body=f'''
                Olá {formContato.nome},

                Sua mensagem foi recebida com sucesso! Obrigado por entrar em contato.
                Responderemos o mais breve possível.

                Atenciosamente,
                Igor
            '''
        )

        mail.send(msg_confirmacao)

        flash('Mensagem enviada com sucesso!')
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)