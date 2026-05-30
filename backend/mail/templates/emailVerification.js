// mail/templates/emailVerification.js

exports.emailVerificationTemplate = (
    firstName,
    otp
) => {

    return `

    <!DOCTYPE html>
    <html>

    <body style="
        background:#f4f7fc;
        font-family:Arial,sans-serif;
        padding:40px;
    ">

        <table width="100%" cellspacing="0" cellpadding="0">

            <tr>
                <td align="center">

                    <table width="550"
                    style="
                        background:white;
                        border-radius:12px;
                        overflow:hidden;
                        box-shadow:0 4px 10px rgba(0,0,0,0.1);
                    ">

                        <tr>
                            <td style="
                                background:#1e293b;
                                color:white;
                                padding:25px;
                                text-align:center;
                            ">
                                <h1>Email Verification</h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:35px;">

                                <h2>Hello ${firstName} 👋</h2>

                                <p style="
                                    font-size:16px;
                                    line-height:1.7;
                                    color:#444;
                                ">
                                    Use the OTP below to verify your email address.
                                </p>

                                <div style="
                                    text-align:center;
                                    margin:35px 0;
                                ">

                                    <span style="
                                        background:#2563eb;
                                        color:white;
                                        padding:18px 40px;
                                        border-radius:10px;
                                        font-size:32px;
                                        letter-spacing:6px;
                                        font-weight:bold;
                                        display:inline-block;
                                    ">
                                        ${otp}
                                    </span>

                                </div>

                                <p style="
                                    color:#666;
                                    font-size:14px;
                                ">
                                    This OTP is valid for 10 minutes.
                                </p>

                            </td>
                        </tr>

                        <tr>
                            <td style="
                                background:#f8fafc;
                                padding:20px;
                                text-align:center;
                                font-size:13px;
                                color:#64748b;
                            ">
                                EdTech Learning Platform
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>

        </table>

    </body>
    </html>

    `;
};