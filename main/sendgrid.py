from django.contrib.auth.models import User

from base_project.settings import SENDGRID_API_KEY
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *

from main.models import ClientCompany


class Sendgrid:
    #https://docs.sendgrid.com/api-reference/mail-send/mail-send
    def __init__(self):
        self.message = Mail()

    def set_from_veisais(self):
        self.message.from_email = From(
            email="veisais.aca@gmail.com",
            name="Veisais",
            p=1
        )

    def set_to_email_veisais(self):
        self.message.to = [
            To(
                email="veisais.aca@gmail.com",
                name="Veisais",
                p=0
            )
        ]

    def set_reply_to_veisais(self):
        self.message.reply_to = ReplyTo(
            email="veisais.aca@gmail.com",
            name="Veisais"
        )

    def set_subject(self, subject):
        self.message.subject = Subject(subject)


    def send_quotation_request(self,
                                        requesting_user: User,
                                        style_model_numbers,
                                        company: ClientCompany,
                                        request_notes):
        request_from = requesting_user.email if requesting_user.email else requesting_user.username
        content = ""
        content = content + f"<p>Quotation Request from {request_from} (company: {company.company_name})</p>"
        content = content + f"<p>Company info below: </p>"
        content = content + f"<p>Company name: {company.company_name}</p>"
        content = content + f"<p>Main Contact: {company.main_contact_name}</p>"
        content = content + f"<p>Email: {company.email}</p>"
        if company.phone_number:
            content = content + f"<p>Phone Number: {company.phone_number}</p>"
        if company.website:
            content = content + f"<p>Website: {company.website}</p>"
        if company.address:
            content = content + f"<p>Address: {company.address}</p>"
        if company.city:
            content = content + f"<p>City: {company.city}</p>"
        if company.zip_code:
            content = content + f"<p>State: {company.zip_code}</p>"
        if company.additional_information:
            content = content + f"<p>Additional info: {company.additional_information}</p>"

        content = content + f"<p>Requested model numbers: {str(style_model_numbers)}</p>"
        content = content + f"<p>Additional request notes: {request_notes}</p>"
        self.message.content = [
            Content(
                mime_type="text/html",
                content=content
            )
        ]

        try:
            sendgrid_client = SendGridAPIClient(SENDGRID_API_KEY)
            response = sendgrid_client.send(self.message)
        except Exception as e:
            print(f"Error sending quotation request email: {str(e)}")









