module.exports=(otp,title,note) =>{
    const htmlSendMail = `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Lấy Lại Mật Khẩu</title>
        <style>
            /* Reset some basic elements */
            body, p, td, th, div, h1, h2, h3, h4, h5, h6 { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; }
            body { background-color: #f8f8f8; }
            
            /* Main container */
            .container {
                max-width: 600px;
                margin: 80px auto;
                background-color: #fff;
                padding: 48px;
                border-radius: 16px;
                box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
            }
            
            /* Header */
            .header {
                text-align: center;
                margin-bottom: 48px;
            }
            .header h1 {
                color: #333;
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 16px;
            }
            .header p {
                color: #555;
                font-size: 20px;
            }
            
            /* OTP code */
            .otp-code {
                background-color: #f4f4f4;
                padding: 16px 20px;
                border-radius: 8px;
                font-size: 22px;
                font-weight: bold;
                text-align: center;
                color: #333;
                margin-bottom: 18px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            }
            
            /* Content */
            .content p {
                color: #555;
                line-height: 1.6;
                margin-bottom: 28px;
            }
            
            /* Note */
            .note {
                font-size: 18px;
                color: #888;
                text-align: center;
                margin-top: 36px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${title}</h1>
                <p>${note}</p>
            </div>
            <div class="content">
                <div class="otp-code">${otp}</div>
                <p>Mã OTP này có hiệu lực trong vòng 3 phút. Vui lòng không chia sẻ mã OTP này với bất kỳ ai khác.</p>
                <p>Nếu bạn không yêu cầu lấy lại mật khẩu, vui lòng bỏ qua email này.</p>
            </div>
            <div class="note">
                <p>Nếu bạn cần hỗ trợ, hãy liên hệ với chúng tôi theo số hotline 0999 999 999 </p>
            </div>
        </div>
    </body>
    </html>
    `;
    return htmlSendMail;
}