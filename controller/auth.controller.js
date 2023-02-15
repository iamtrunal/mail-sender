const Auth = require("../model/auth.model");
const bcrypt = require("bcrypt");
const { mailService } = require("../helper/mail.helper");
const status = require("http-status");


/* ----- User Registration ----- */
exports.userRegistration = async (req, res) => {
    try {
        const data = await Auth.findOne({ email: req.body.email })

        if (data) {

            res.status(status.CONFLICT).json(
                {
                    message: "EMAIL ALREADY REGISTRATION !",
                    status: false,
                    code: 409
                }
            )

        }
        else {

            let password = req.body.password;
            let confirmPassword = req.body.confirmPassword

            if (password == confirmPassword) {

                if (password.length >= 6) {

                    const userDetails = new Auth({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        mobile: req.body.mobile,
                        city: req.body.city,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
                    })
                    const saveData = await userDetails.save()

                    res.status(status.CREATED).json(
                        {
                            message: "USER REGISTRATION SUCCESSFULLY !",
                            status: true,
                            code: 201,
                            data: saveData
                        }
                    )

                } else {

                    res.status(status.LENGTH_REQUIRED).json(
                        {
                            message: "PASSWORD LENGTH MUST BE MORE THAN 6 DIGITS!",
                            status: false,
                            code: 411
                        }
                    )

                }

            } else {

                res.status(status.UNAUTHORIZED).json(
                    {
                        message: "PASSWORD & CONFIRM PASSWORD DOES NOT MATCH!",
                        status: false,
                        code: 401
                    }
                )

            }

        }
    } catch (error) {

        console.log("error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })

    }
}
/* ----- End User Registration ----- */


/* ----- Send Email ----- */
exports.sendMail = async (req, res) => {
    try {

        const checkEmail = await Auth.findOne({ email: req.body.email })

        if (checkEmail == null) {

            res.status(status.NOT_FOUND).json({
                message: "EMAIL NOT EXIST",
                status: false,
                code: 404
            })

        } else {

            // mail content
            let sub = "Learn Node Mailer";
            let html = `<div style="margin: 2% 10%;@media (max-width:500px){margin: 2%}">
                        <h1 style="text-align: center;font-size: 35px;"> NODE MAILER </h1>
                        <div style="margin-top: 5%;">
                            <h2 style="font-size: 27px;"> Defination Of Node Mailer </h2>
                            <p style="font-size: 18px;"> Nodemailer is a Node.js module that allows you to send emails from your server with ease. Whether you want to communicate with your users or just notify yourself when something has gone wrong, one of the options for doing so is through mail. </p>
                        </div>
                        <div style="margin-top: 5%;">
                            <h2 style="font-size: 27px;"> How to Install Nodemailer </h2>
                            <p style="font-size: 18px;text-align: center;">Install nodemailer using the following command:</p>
                            <h3 style="text-align: center;">npm install nodemailer</h3>
                        </div>
                        <div style="margin-top: 5%;">
                            <h2 style="font-size: 27px;">Sent mail :</h2>
                            <div>
                                <div style="margin-top: 5%;">
                                    <p><span style="font-weight: bolder;font-size: 20px">Note 1:</span><span style="font-size:19px;"> To use this code in any file we just have to import this file and call send() function.</span></p>
                                    <p style="background-color: rgb(240, 240, 240);padding:2%;border-radius: 5px;">var mail = require('./config/mailer')();
                                        mail.send();</p>
                                </div>
                                <div style="margin-top: 5%;">
                                    <p><span style="font-weight: bolder;font-size: 20px">Note 2:</span><span style="font-size:19px;"> To send HTML formatted text in your email, use the “html” property instead of the “text” property in sendMail function.</span></p>
                                    <p style="background-color: rgb(240, 240, 240);padding:2%;line-height: 30px;border-radius: 5px;">{<br/>
                                        from:'"admin" ',<br/>
                                        to: "user@gmail.com",<br/>
                                        subject:'GeeksforGeeks Promotion',<br/>
                                        html: "html code"<br/>
                                      }</p>
                                </div>
                                <div style="margin-top: 5%;">
                                    <p><span style="font-weight: bolder;font-size: 20px">Note 3:</span><span style="font-size:19px;"> To send an email to more than one receiver, add them to the “to” property in sendMail function, separated by commas.</span></p>
                                    <p style="background-color: rgb(240, 240, 240);padding:2%;line-height: 30px;border-radius: 5px;">{ <br/>
                                        from:'”admin” ‘, <br/>
                
                                        to: ” user1@gmail.com, user2@gmail.com, user3@yahoo.in “, <br/>
                                        
                                        subject:’KURM InfoTech Student Lecture’, <br/>
                                        
                                        text:’Check out KURM InfoTech’+’ site and join us for your better professional future.’ <br/>
                                        
                                        }</p>
                                </div>
                            </div>
                        </div>
                    </div>`;

            await mailService(checkEmail.email, sub, html)

            res.status(status.OK).json({
                message: "MAIL SEND SUCCESSFULLY",
                status: true,
                code: 200
            })

        }

    } catch (error) {

        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })

    }
}
/* ----- End Send Email ----- */