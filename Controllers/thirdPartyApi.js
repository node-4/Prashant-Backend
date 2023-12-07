const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const userCard = require("../models/userCard")
const jwt = require("jsonwebtoken");
var newOTP = require("otp-generators");
const nodemailer = require("nodemailer");
const authConfig = require("../configs/auth.config");
const axios = require('axios');
const crypto = require('crypto');
const { log } = require("console");
const qs = require('querystring');

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

// exports.query1 = async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { merNo,
//             amount,
//             billNo,
//             currency,
//             language,
//             returnURL,
//             notifyUrl,
//             tradeUrl,
//             lastName,
//             firstName,
//             country,
//             state,
//             city,
//             address,
//             zipCode,
//             email,
//             phone,
//             shippingFirstName,
//             shippingLastName,
//             shippingCountry,
//             shippingState,
//             shippingCity,
//             shippingAddress,
//             shippingZipCode,
//             shippingEmail,
//             shippingPhone,
//             cardNum,
//             year,
//             month,
//             cvv2,
//             cardBank,
//             productInfo,
//             nationalCode,
//             ip,
//             md5Info,
//             acceptLanguage,
//             userAgent,
//             timeZone,
//             javascriptEnabled, } = req.body;
//         var url = `https://testurl.carespay.com:28081/carespay/pay`;
//         const qs = require('querystring');
//         req.body.md5Info = merNo + billNo + currency + amount + returnURL + '^Qdb}Kzy'
//         console.log(req.body);
//         const formData = qs.stringify(req.body);
//         axios.post(url, formData, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         }).then(function (response) {
//             console.log(response.data);
//             resolve(response)
//             return res.status(200).send({ msg: "Data Payment", data: response, });

//         })
//             .catch(function (error) {
//                 return res.status(501).send({ msg: "error", data: error, });
//             });









//         // axios({
//         //     method: 'post',
//         //     url: url,
//         //     data: req.body
//         // }).then(function (response) {
//         //     console.log(response.data);
//         //     resolve(response)
//         //     return res.status(200).send({ msg: "Data Payment", data: response, });

//         // })
//         //     .catch(function (error) {
//         //         return res.status(501).send({ msg: "error", data: error, });
//         //     });


//         // const response = await axios.post('https://testurl.carespay.com:28081/carespay/pay', req.body);
//         // // Send the response back to the client
//         // return res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

exports.query1 = async (req, res) => {
    try {
        const { merNo,
            amount,
            billNo,
            currency,
            language,
            returnURL,
            notifyUrl,
            tradeUrl,
            lastName,
            firstName,
            country,
            state,
            city,
            address,
            zipCode,
            email,
            phone,
            shippingFirstName,
            shippingLastName,
            shippingCountry,
            shippingState,
            shippingCity,
            shippingAddress,
            shippingZipCode,
            shippingEmail,
            shippingPhone,
            cardNum,
            year,
            month,
            cvv2,
            cardBank,
            productInfo,
            nationalCode,
            ip,
            acceptLanguage,
            userAgent,
            timeZone,
            javascriptEnabled, } = req.body;
        const md5String = merNo + billNo + currency + amount + returnURL + '^Qdb}Kzy';
        const md5Info = crypto.createHash('md5').update(md5String).digest('hex');
        req.body.md5Info = md5Info;
        var url = `https://testurl.carespay.com:28081/carespay/pay`;
        const formData = qs.stringify(req.body);
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function (response) {
            console.log(response);
            // data: {
            //     code: 'P0001',
            //     message: 'payment successful!|TEST DESCRIPTOR：SUCC',
            //     orderNo: '10014017019504553432',
            //     merNo: '100140',
            //     billNo: 'ORDER8975391',
            //     amount: '100.00',
            //     currency: '1',
            //     tradeStatus: 'S0001',
            //     returnURL: 'http://your-return-url.com',
            //     md5Info: 'e5ce3caf83056a4b2ee6a09da34a9c29',
            //     tradeTime: 1701950454917,
            //     auth3DUrl: null,
            //     billAddr: 'TEST',
            //     rebillToken: 'n1U2w0S7l262G76pXMS/9bOI67yQ==',
            //     threeDSecure: '',
            //     cnyexchangeRate: '7.1371'
            //   }
            const responseData = {
                code: response.data.code,
                message: response.data.message,
                orderNo: response.data.orderNo,
            };

            return res.status(200).send({ msg: "Data Payment", data: responseData });
        }).catch(function (error) {
            console.error(error);
            return res.status(501).send({ msg: "error", data: error.message });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
