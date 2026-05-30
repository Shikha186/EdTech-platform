// mail/templates/courseEnrollmentEmail.js

exports.courseEnrollmentEmail = (
    firstName,
    courseName,
    courseThumbnail
) => {

    return `
    
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8" />
        <title>Course Enrollment</title>
    </head>

    <body style="
        margin:0;
        padding:0;
        background-color:#f4f7fc;
        font-family:Arial,sans-serif;
    ">

        <table width="100%" cellspacing="0" cellpadding="0">

            <tr>
                <td align="center">

                    <table width="600" cellspacing="0" cellpadding="0"
                    style="
                        background:#ffffff;
                        margin:40px auto;
                        border-radius:12px;
                        overflow:hidden;
                        box-shadow:0 4px 10px rgba(0,0,0,0.1);
                    ">

                        <!-- Header -->
                        <tr>
                            <td align="center"
                            style="
                                background:#0f172a;
                                color:white;
                                padding:30px;
                            ">
                                <h1 style="margin:0;">
                                    Welcome to EdTech 🚀
                                </h1>
                            </td>
                        </tr>

                        <!-- Thumbnail -->
                        <tr>
                            <td align="center" style="padding:25px;">

                                <img 
                                    src="${courseThumbnail}"
                                    alt="Course Thumbnail"
                                    width="500"
                                    style="
                                        border-radius:10px;
                                        max-width:100%;
                                    "
                                />

                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding:30px; color:#333333;">

                                <h2>
                                    Congratulations ${firstName}! 🎉
                                </h2>

                                <p style="
                                    font-size:16px;
                                    line-height:1.7;
                                ">
                                    You have successfully enrolled in:
                                </p>

                                <div style="
                                    background:#eff6ff;
                                    padding:15px;
                                    border-radius:8px;
                                    margin:20px 0;
                                    text-align:center;
                                    font-size:20px;
                                    font-weight:bold;
                                    color:#2563eb;
                                ">
                                    ${courseName}
                                </div>

                                <p style="
                                    font-size:15px;
                                    line-height:1.7;
                                ">
                                    Start learning and improve your skills with
                                    hands-on content and guided lessons.
                                </p>

                                <div style="text-align:center; margin-top:30px;">

                                    <a href="#"
                                    style="
                                        background:#2563eb;
                                        color:white;
                                        text-decoration:none;
                                        padding:14px 28px;
                                        border-radius:8px;
                                        display:inline-block;
                                        font-weight:bold;
                                    ">
                                        Start Learning
                                    </a>

                                </div>

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center"
                            style="
                                background:#f1f5f9;
                                padding:20px;
                                font-size:13px;
                                color:#64748b;
                            ">
                                © 2026 EdTech Platform | Keep Learning 🚀
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