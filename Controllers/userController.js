const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const userCard = require("../models/userCard")
const jwt = require("jsonwebtoken");
var newOTP = require("otp-generators");
const nodemailer = require("nodemailer");
const authConfig = require("../configs/auth.config");
const axios = require('axios');
const crypto = require('crypto');
exports.registration = async (req, res) => {
    const { phone, email } = req.body;
    try {
        req.body.email = email.split(" ").join("").toLowerCase();
        let user = await User.findOne({
            $and: [{ $or: [{ email: req.body.email }, { phone: phone }] }],
        });
        if (!user) {
            const otp = newOTP.generate(4, {
                alphabets: false,
                upperCase: false,
                specialChar: false,
            });
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                auth: {
                    user: "frieda.smitham40@ethereal.email",
                    pass: "TURy68KCpFSsFyNfjs",
                },
            });
            // Define the email options
            const mailOptions = {
                to: email,
                from: "node2@flyweis.technology",
                subject: "Password reset request",
                text:
                    `OTP ${otp}\n` +
                    `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                    `your otp is ${otp} ` +
                    `for reset password\n\n` +
                    `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };
            let resultmail = await transporter.sendMail(mailOptions);
            if (resultmail) {
                req.body.otp = otp;
                req.body.otpExpiration = Date.now() + 3600000;
                req.body.userType = "USER";
                const userCreate = await User.create(req.body);
                return res.status(200).send({
                    message: "registered successfully ",
                    data: userCreate,
                });
            } else {
                return res.status(500).json({
                    message: "Could not send email. Please try again later.",
                });
            }
        } else {
            return res.status(409).send({ message: "Already Exist", data: [] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const updated = await User.findByIdAndUpdate(
            { _id: user._id },
            { accountVerification: true },
            { new: true }
        );
        const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
            expiresIn: authConfig.accessTokenTime,
        });
        return res.status(200).send({
            message: "logged in successfully",
            accessToken: accessToken,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ error: "internal server error" + err.message });
    }
};
exports.login = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: "not found" });
        } else {
            const userObj = {};
            let otp = newOTP.generate(4, {
                alphabets: false,
                upperCase: false,
                specialChar: false,
            });
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                auth: {
                    user: "frieda.smitham40@ethereal.email",
                    pass: "TURy68KCpFSsFyNfjs",
                },
            });
            // Define the email options
            const mailOptions = {
                to: email,
                from: "node2@flyweis.technology",
                subject: "Password reset request",
                text:
                    `OTP ${otp}\n` +
                    `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                    `your otp is ${otp} ` +
                    `for reset password\n\n` +
                    `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };
            let resultmail = await transporter.sendMail(mailOptions);
            if (resultmail) {
                userObj.otp = otp;
                userObj.accountVerification = false;
                userObj.otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
                const updated = await User.findOneAndUpdate({ email: email }, userObj, { new: true });
                return res.status(200).send({ msg: "Otp send", userId: updated._id, otp: updated.otp, });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.resendOTP = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        const userObj = {};
        let otp = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false });
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "frieda.smitham40@ethereal.email",
                pass: "TURy68KCpFSsFyNfjs",
            },
        });
        // Define the email options
        const mailOptions = {
            to: user.email,
            from: "node2@flyweis.technology",
            subject: "Password reset request",
            text:
                `OTP ${otp}\n` +
                `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `your otp is ${otp} ` +
                `for reset password\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        let resultmail = await transporter.sendMail(mailOptions);
        if (resultmail) {
            userObj.otp = otp;
            userObj.accountVerification = false;
            userObj.otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
            const updated = await User.findByIdAndUpdate({ _id: user._id }, userObj, { new: true });
            return res.status(200).send({ msg: "Otp resend", userId: updated._id, otp: updated.otp, });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" + error.message });
    }
};
exports.createPaymentCard = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const saveData = {
                user: req.user._id,
                name: req.body.name,
                number: req.body.number,
                month: req.body.month,
                year: req.body.year,
                cvv: req.body.cvv,
                cardType: req.body.cardType,
            };
            const saved = await userCard.create(saveData);
            return res.status(200).json({ status: 200, message: "Card details saved.", data: saved })
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getPaymentCard = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const getData = await userCard.find({ user: req.user._id });
            return res.status(200).json({ status: 200, message: "Card details fetch.", data: getData })
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.updatePaymentCard = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            const payment = await userCard.findById(req.params.id);
            if (!payment) {
                return res.status(404).json({ status: 404, message: "Card details not fetch", data: {} });
            } else {
                let obj = {
                    name: req.body.name || payment.name,
                    number: req.body.number || payment.number,
                    month: req.body.month || payment.month,
                    year: req.body.year || payment.year,
                    cvv: req.body.cvv || payment.cvv,
                    cardType: req.body.cardType || payment.cardType,
                }
                let saved = await userCard.findByIdAndUpdate(payment._id, { obj }, { new: true });
                return res.status(200).json({ status: 200, message: "Card details Updated Successfully.", data: saved })
            }
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.DeletePaymentCard = async (req, res, next) => {
    try {
        const payment = await userCard.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ status: 404, message: "Card details not fetch", data: {} });
        } else {
            const data = await userCard.findByIdAndDelete({ _id: payment._id, });
            return res.status(200).json({ status: 200, message: "Card details Delete Successfully.", data: {} })
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.networkStorePayment1 = async (req, res) => {
    try {
        const code = `EncryptionMode=SHA256&CharacterSet=UTF8&merNo=${req.body.merNo}&terNo=${req.body.terNo}&orderNo=${req.body.orderNo}&currencyCode=${req.body.currencyCode}&amount=${req.body.amount}&payIP=${req.body.payIP}&transType=${req.body.transType}&transModel=${req.body.transModel}&52400b2fc90e48a9b81cd55a6830281a`
        const hash = crypto.createHash('sha256').update(code).digest('hex');
        req.body.hashcode = hash
        let body = req.body;
        console.log("-------------", body);
        console.log("--------1888-----", body.hashcode);
        var url = `https://payment.gantenpay.com/payment/api/payment`;
        axios({
            method: 'post',
            url: url,
            data: body
        }).then(function (response) {
            console.log(response.config.data);
            console.log(response.data);
            resolve(response)
            return res.status(200).send({ msg: "Data Payment", data: response, });

        })
            .catch(function (error) {
                return res.status(501).send({ msg: "error", data: error, });
            });
    } catch (error) {

    }
}







































exports.networkStorePayment = async (req, res) => {
    try {
        // const code = `amount=${req.body.amount}&currencyCode=${req.body.currencyCode}&merNo=${req.body.merNo}&orderNo=${req.body.orderNo}&respCode=01&respMsg=GetsourceURLfails&terNo=${req.body.terNo}&tradeNo=BA1512281121473675&transType=${req.body.transType}&52400b2fc90e48a9b81cd55a6830281a`
        const code = `EncryptionMode=SHA256&CharacterSet=UTF8&merNo=${req.body.merNo}&terNo=${req.body.terNo}&orderNo=${req.body.orderNo}&currencyCode=${req.body.currencyCode}&amount=${req.body.amount}&payIP=${req.body.payIP}&transType=${req.body.transType}&transModel=${req.body.transModel}&52400b2fc90e48a9b81cd55a6830281a`
        const hash = crypto.createHash('sha256').update(code).digest('hex');
        req.body.hashcode = hash
        let body = req.body;
        console.log("-------------", body);
        console.log("--------1888-----", body.merNo);
        return;
        var url = `https://payment.bringallpay.com/payment/api/payment`;
        axios({
            method: 'post',
            url: url,
            data: body
        }).then(function (response) {
            console.log(response.data);
            resolve(response)
            return res.status(200).send({ msg: "Data Payment", data: response, });

        })
            .catch(function (error) {
                return res.status(501).send({ msg: "error", data: error, });
            });
    } catch (error) {

    }
}
exports.fastPayPayment = async (req, res) => {
    try {
        // const code = `amount=${req.body.amount}&currencyCode=${req.body.currencyCode}&merNo=${req.body.merNo}&orderNo=${req.body.orderNo}&respCode=01&respMsg=GetsourceURLfails&terNo=${req.body.terNo}&tradeNo=BA1512281121473675&transType=${req.body.transType}&52400b2fc90e48a9b81cd55a6830281a`
        const code = `EncryptionMode=SHA256&CharacterSet=UTF8&merNo=${req.body.merNo}&terNo=${req.body.terNo}&orderNo=${req.body.orderNo}&currencyCode=${req.body.currencyCode}&amount=${req.body.amount}&payIP=${req.body.payIP}&transType=${req.body.transType}&transModel=${req.body.transModel}&52400b2fc90e48a9b81cd55a6830281a`
        const hash = crypto.createHash('sha256').update(code).digest('hex');
        req.body.hashcode = hash
        let body = req.body;
        console.log("-------------", body);
        console.log("--------1888-----", body.merNo);
        return;
        var url = `https://payment.bringallpay.com/payment/api/payment`;
        axios({
            method: 'post',
            url: url,
            data: body
        }).then(function (response) {
            console.log(response.data);
            resolve(response)
            return res.status(200).send({ msg: "Data Payment", data: response, });

        })
            .catch(function (error) {
                return res.status(501).send({ msg: "error", data: error, });
            });
    } catch (error) {

    }
}
exports.requestForRefund = async (req, res) => {
    try {
        const code = `EncryptionMode=SHA256&CharacterSet=UTF8&merNo=${req.body.merNo}&refundCurrency=${req.body.refundCurrency}&refundAmount=${req.body.refundAmount}&busCurrency=${req.body.busCurrency}&busAmount=${req.body.busAmount}&tradeNo=${req.body.tradeNo}&52400b2fc90e48a9b81cd55a6830281a`
        const hash = crypto.createHash('sha256').update(code).digest('hex');
        req.body.hashcode = hash
        let body = req.body;
        console.log("-------------", body);
        console.log("--------1888-----", body.merNo);
        return;
        var url = `https://payment.bringallpay.com/payment/refund/requestForRefund`;
        axios({
            method: 'post',
            url: url,
            data: body
        }).then(function (response) {
            console.log(response.data);
            resolve(response)
            return res.status(200).send({ msg: "Data Payment", data: response, });

        })
            .catch(function (error) {
                return res.status(501).send({ msg: "error", data: error, });
            });
    } catch (error) {

    }
}
exports.query = async (req, res) => {
    try {
        const code = `${req.body.merNo}+${req.body.terNo}+${req.body.orderNo}+${req.body.amount}+${req.body.currency}+52400b2fc90e48a9b81cd55a6830281a`
        const hash = crypto.createHash('sha256').update(code).digest('hex');
        req.body.hashcode = hash
        let body = req.body;
        console.log("-------------", body);
        console.log("--------1888-----", body.merNo);
        return;
        var url = `https://payment.bringallpay.com/payment/external/query`;
        axios({
            method: 'post',
            url: url,
            data: body
        }).then(function (response) {
            console.log(response.data);
            resolve(response)
            return res.status(200).send({ msg: "Data Payment", data: response, });

        })
            .catch(function (error) {
                return res.status(501).send({ msg: "error", data: error, });
            });
    } catch (error) {

    }
}