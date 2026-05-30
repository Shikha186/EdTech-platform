// mail/templates/passwordUpdated.js

exports.passwordUpdatedTemplate = (
    firstName
) => {

    return `

    <!DOCTYPE html>
    <html>

    <body style="
        background:#f4f7fc;
        font-family:Arial,sans-serif;
        padding:40px;
    ">

        <table width="100%">

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
                                background:#16a34a;
                                color:white;
                                padding:25px;
                                text-align:center;
                            ">
                                <h1>Password Updated ✅</h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:35px;">

                                <h2>Hello ${firstName}</h2>

                                <p style="
                                    font-size:16px;
                                    line-height:1.7;
                                    color:#444;
                                ">
                                    Your password has been updated successfully.
                                </p>

                                <div style="
                                    background:#dcfce7;
                                    color:#166534;
                                    padding:18px;
                                    border-radius:10px;
                                    margin:25px 0;
                                    font-weight:bold;
                                ">
                                    Your account is now secure.
                                </div>

                                <p style="
                                    font-size:14px;
                                    color:#666;
                                ">
                                    If you did not perform this action,
                                    please contact support immediately.
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
                                © 2026 EdTech Platform
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