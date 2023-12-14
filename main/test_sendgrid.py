import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *


message = Mail()



message.subject = Subject("Your Example Order Confirmation")

message.content = [
    Content(
        mime_type="text/html",
        content="<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>"
    )
]


#
#
# message.mail_settings = MailSettings(
#     bypass_list_management=BypassListManagement(False),
#     footer_settings=FooterSettings(False),
#     sandbox_mode=SandBoxMode(False)
# )
#
# message.tracking_settings = TrackingSettings(
#     click_tracking=ClickTracking(
#         enable=True,
#         enable_text=False
#     ),
#     open_tracking=OpenTracking(
#         enable=True,
#         substitution_tag=OpenTrackingSubstitutionTag("%open-track%")
#     ),
#     subscription_tracking=SubscriptionTracking(False)
# )
sendgrid_client = SendGridAPIClient("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")
response = sendgrid_client.send(message)
