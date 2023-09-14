const User = require("../models/user.model");
const createExchangetransaction = require("../models/createExchangetransaction")
const apiv2createExchangetransaction = require("../models/apiv2createExchangetransaction");
const currencies = require("../models/currencies")
const axios = require('axios');
exports.createExchangeTransaction = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        var url = `https://api.changenow.io/v1/transactions/160334c9120c00d8a61c88813a35f78154343cc543b63dacddfd4e60f67188f1`;
                        axios({
                                method: 'post',
                                url: url,
                                data: req.body
                        }).then(async function (response) {
                                console.log(response);
                                const saveData = {
                                        user: req.user._id,
                                        name: req.body.name,
                                        from: req.body.from,
                                        to: req.body.to,
                                        amount: req.body.amount,
                                        address: req.body.address,
                                        flow: req.body.flow,
                                        payinAddress: response.data.payinAddress,
                                        payoutAddress: response.data.payoutAddress,
                                        fromCurrency: response.data.fromCurrency,
                                        toCurrency: response.data.toCurrency,
                                        id: response.data.id,
                                        returnAmount: response.data.amount,
                                };
                                const saved = await createExchangetransaction.create(saveData);
                                return res.status(200).send({ msg: "Data Payment", data: saved, });
                        }).catch(function (error) {
                                return res.status(501).send({ msg: "error", data: error, });
                        });

                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (err) {
                console.log(err);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.createApiv2ExchangeTransaction = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        const apiUrl = 'https://api.changenow.io/v2/exchange';
                        const apiKey = '160334c9120c00d8a61c88813a35f78154343cc543b63dacddfd4e60f67188f1';
                        const requestData = req.body;
                        const headers = { 'Content-Type': 'application/json', 'x-changenow-api-key': apiKey };
                        axios.post(apiUrl, requestData, { headers })
                                .then(async (response) => {
                                        const saveData = {
                                                user: req.user._id,
                                                fromCurrency: req.body.fromCurrency,
                                                toCurrency: req.body.toCurrency,
                                                fromNetwork: req.body.fromNetwork,
                                                toNetwork: req.body.toNetwork,
                                                fromAmount: req.body.fromAmount,
                                                address: req.body.address,
                                                flow: req.body.flow,
                                                toAmount: response.data.toAmount,
                                                type: response.data.type,
                                                payinAddress: response.data.payinAddress,
                                                payoutAddress: response.data.payoutAddress,
                                                id: response.data.id,
                                        };
                                        const saved = await apiv2createExchangetransaction.create(saveData);
                                        return res.status(200).send({ msg: "Data Payment", data: saved, });
                                })
                                .catch((error) => {
                                        return res.status(501).send({ msg: "error", data: error, });
                                });
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (err) {
                console.log(err);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.checkTransactionStatus = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        const findData = await apiv2createExchangetransaction.findOne({ id: req.params.id });
                        if (findData) {
                                const axios = require('axios');
                                const apiUrl = `https://api.changenow.io/v1/transactions/${req.params.id}/160334c9120c00d8a61c88813a35f78154343cc543b63dacddfd4e60f67188f1`;
                                axios.get(apiUrl)
                                        .then(async (response) => {
                                                let obj = {
                                                        expectedSendAmount: response.data.expectedSendAmount,
                                                        expectedReceiveAmount: response.data.expectedReceiveAmount,
                                                        status: response.data.status,
                                                        crpUpdatedAt: response.data.updatedAt,
                                                        crpCreatedAt: response.data.createdAt,
                                                        isPartner: response.data.isPartner
                                                }
                                                let update = await apiv2createExchangetransaction.findByIdAndUpdate({ _id: findData._id }, { $set: obj }, { new: true })
                                                return res.status(200).send({ msg: "Data Payment", data: update, });
                                        }).catch((error) => {
                                                return res.status(501).send({ msg: "error", data: error, });
                                        });
                        } else {
                                return res.status(404).send({ msg: "id not match", data: {}, });
                        }
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (err) {
                console.log(err);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.listTransaction = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        const apiUrl = `https://api.changenow.io/v1/transactions/160334c9120c00d8a61c88813a35f78154343cc543b63dacddfd4e60f67188f1`;
                        axios.get(apiUrl)
                                .then(async (response) => {
                                        for (let i = 0; i < response.data.length; i++) {
                                                const findData = await apiv2createExchangetransaction.findOne({ id: response.data[i].id });
                                                if (findData) {
                                                        let obj = {
                                                                expectedSendAmount: response.data[i].expectedSendAmount,
                                                                expectedReceiveAmount: response.data[i].expectedReceiveAmount,
                                                                status: response.data[i].status,
                                                                crpUpdatedAt: response.data[i].updatedAt,
                                                                crpCreatedAt: response.data[i].createdAt,
                                                                isPartner: response.data[i].isPartner
                                                        }
                                                        let update = await apiv2createExchangetransaction.findByIdAndUpdate({ _id: findData._id }, { $set: obj }, { new: true })
                                                } else {
                                                        let obj = {
                                                                fromAmount: response.data[i].expectedSendAmount,
                                                                address: response.data[i].payoutAddress,
                                                                flow: response.data[i].flow,
                                                                toAmount: response.data[i].expectedReceiveAmount,
                                                                type: response.data[i].type,
                                                                payinAddress: response.data[i].payinAddress,
                                                                payoutAddress: response.data[i].payoutAddress,
                                                                id: response.data[i].id,
                                                                fromNetwork: response.data[i].fromCurrency,
                                                                toNetwork: response.data[i].toCurrency,
                                                                fromCurrency: response.data[i].fromCurrency,
                                                                toCurrency: response.data[i].toCurrency,
                                                                expectedSendAmount: response.data[i].expectedSendAmount,
                                                                expectedReceiveAmount: response.data[i].expectedReceiveAmount,
                                                                status: response.data[i].status,
                                                                crpUpdatedAt: response.data[i].updatedAt,
                                                                crpCreatedAt: response.data[i].createdAt,
                                                                isPartner: response.data[i].isPartner
                                                        }
                                                        const saved = await apiv2createExchangetransaction.create(obj);
                                                }
                                        }
                                        const findData = await apiv2createExchangetransaction.findOne({ user: data._id });
                                        return res.status(200).send({ msg: "Data Payment", data: findData, });
                                }).catch((error) => {
                                        return res.status(501).send({ msg: "error", data: error, });
                                });
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (err) {
                console.log(err);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.checkTransactionStatus1 = async (req, res, next) => {
        try {
                const data = await User.findOne({ _id: req.user._id, });
                if (data) {
                        const findData = await apiv2createExchangetransaction.findOne({ id: req.params.id });
                        if (findData) {
                                const apiUrl = `https://api.changenow.io/v2/exchange/by-id?id=${req.params.id}`;
                                const apiKey = '160334c9120c00d8a61c88813a35f78154343cc543b63dacddfd4e60f67188f1';
                                const headers = { 'x-changenow-api-key': apiKey, };
                                axios.get(apiUrl, { headers })
                                        .then(async (response) => {
                                                console.log(response.data);
                                                let obj = {
                                                        expectedSendAmount: response.data.expectedSendAmount,
                                                        expectedReceiveAmount: response.data.expectedReceiveAmount,
                                                        status: response.data.status,
                                                        crpUpdatedAt: response.data.updatedAt,
                                                        crpCreatedAt: response.data.createdAt,
                                                        isPartner: response.data.isPartner
                                                }
                                                let update = await apiv2createExchangetransaction.findByIdAndUpdate({ _id: findData._id }, { $set: obj }, { new: true })
                                                return res.status(200).send({ msg: "Data Payment", data: update, });
                                        }).catch((error) => {
                                                return res.status(501).send({ msg: "error", data: error, });
                                        });
                        } else {
                                return res.status(404).send({ msg: "id not match", data: {}, });
                        }
                } else {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
        } catch (err) {
                console.log(err);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};