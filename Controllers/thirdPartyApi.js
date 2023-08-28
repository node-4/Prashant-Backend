const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const userCard = require("../models/userCard")
const jwt = require("jsonwebtoken");
var newOTP = require("otp-generators");
const nodemailer = require("nodemailer");
const authConfig = require("../configs/auth.config");
const axios = require('axios');
const crypto = require('crypto');

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