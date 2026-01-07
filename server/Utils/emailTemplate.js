require('dotenv').config();

const signupOtpVerificationMailTemplate = (msg)=>{
    return (`
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
             <h2 style="text-align: center; color: #15803d; margin-bottom: 10px;">
              Kartikey Keep Notes
            </h2>

            <p style="font-size: 16px; color: #333;">
              Hello,
            </p>

            <p style="font-size: 15px; color: #555;">
              Thank you for creating an account with <strong>Kartikey Keep Notes</strong>.
              Please use the OTP below to verify your account.
            </p>
             <div style="margin: 25px 0; text-align: center;">
              <span style="display: inline-block; font-size: 26px; letter-spacing: 6px; font-weight: bold; color: #ffffff; background-color: #15803d; padding: 12px 20px; border-radius: 6px;">
                ${msg}
              </span>
            </div>

            <p style="font-size: 14px; color: #555;">
              This OTP is valid for <strong>10 minutes</strong>.  
              Please do not share it with anyone.
            </p>

            <p style="font-size: 14px; color: #777; margin-top: 25px;">
              If you did not request this, you can safely ignore this email.
            </p>
            <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;" />

            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Kartikey Keep Notes. All rights reserved.
            </p>
        </div>
    </div>
    `);
}

const loginOtpVerificationMailTemplate = (otp) => {
  return(`
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

        <h2 style="text-align: center; color: #15803d; margin-bottom: 10px;">
          Kartikey Keep Notes
        </h2>

        <p style="font-size: 16px; color: #333;">
          Hello,
        </p>

        <p style="font-size: 15px; color: #555;">
          We noticed a login attempt to your <strong>Kartikey Keep Notes</strong> account.
          For security reasons, we need to verify it's really you.
        </p>

        <p style="font-size: 15px; color: #555;">
          Please enter the OTP below to complete your login.
          <strong>This is a one-time verification.</strong>
        </p>

        <div style="margin: 25px 0; text-align: center;">
          <span style="display: inline-block; font-size: 26px; letter-spacing: 6px; font-weight: bold; color: #ffffff; background-color: #15803d; padding: 12px 20px; border-radius: 6px;">
            ${otp}
          </span>
        </div>

        <p style="font-size: 14px; color: #555;">
          This OTP is valid for <strong>10 minutes</strong>.  
          Please do not share it with anyone.
        </p>

        <p style="font-size: 14px; color: #777; margin-top: 25px;">
          If you did not attempt to log in, please ignore this email or secure your account.
        </p>

        <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
          © ${new Date().getFullYear()} Kartikey Keep Notes. All rights reserved.
        </p>

      </div>
    </div>
  `);
};

const contactMailTemplate = (email, message) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 520px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

        <h2 style="text-align: center; color: #15803d; margin-bottom: 10px;">
          New Contact Message
        </h2>

        <p style="font-size: 15px; color: #555;">
          You have received a new message from your website contact form.
        </p>

        <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 6px;">
          <p style="font-size: 14px; color: #333; margin: 0;">
            <strong>Sender Email:</strong>
          </p>
          <p style="font-size: 14px; color: #15803d; margin-top: 4px;">
            ${email}
          </p>
        </div>

        <div style="margin: 20px 0;">
          <p style="font-size: 14px; color: #333;">
            <strong>Message:</strong>
          </p>
          <div style="margin-top: 8px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #15803d; border-radius: 6px; color: #444; font-size: 14px; line-height: 1.6;">
            ${message}
          </div>
        </div>

        <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
          © ${new Date().getFullYear()} Kartikey Keep Notes. All rights reserved.
        </p>

      </div>
    </div>
  `;
};

const contactAcknowledgementMailTemplate = (email) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 520px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

        <h2 style="text-align: center; color: #15803d; margin-bottom: 10px;">
          Kartikey Keep Notes
        </h2>

        <p style="font-size: 16px; color: #333;">
          Hello,
        </p>

        <p style="font-size: 15px; color: #555;">
          Thank you for reaching out to <strong>Kartikey Keep Notes</strong>.
          We have successfully received your message and our team will get back to you as soon as possible.
        </p>

        <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #15803d; border-radius: 6px;">
          <p style="font-size: 14px; color: #333; margin: 0;">
            <strong>Your Email:</strong>
          </p>
          <p style="font-size: 14px; color: #15803d; margin-top: 4px;">
            ${email}
          </p>
        </div>

        <p style="font-size: 15px; color: #555;">
          If your query is urgent, you can also reach us through the following channels:
        </p>

        <ul style="font-size: 14px; color: #555; line-height: 1.8; padding-left: 18px;">
          <li>Email: <strong>${process.env.ADMIN_USERID}</strong></li>
        </ul>

        <p style="font-size: 14px; color: #777; margin-top: 20px;">
          Please do not reply to this automated email.  
          Our team will contact you shortly if required.
        </p>

        <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
          © ${new Date().getFullYear()} Kartikey Keep Notes. All rights reserved.
        </p>

      </div>
    </div>
  `;
};


module.exports = {signupOtpVerificationMailTemplate, loginOtpVerificationMailTemplate, contactMailTemplate, contactAcknowledgementMailTemplate};