
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


module.exports = {signupOtpVerificationMailTemplate, loginOtpVerificationMailTemplate};