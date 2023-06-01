const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
            minLength: 10,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
        },
        address: {
            type: String,
        },
        language: {
            type: String,
        },
        company: {
            type: String,
        },
        website: {
            type: String,
        },
        maximumTicketAmount: {
            type: Number,
        },
        minimumTicketAmount: {
            type: Number,
        },
        averageTicketAmount: {
            type: Number,
        },
        monthlyTransactionValue: {
            type: Number,
        },
        previousPayment: {
            type: Number,
        },
        otp: {
            type: String,
        },
        otpExpiration: {
            type: Date,
        },
        accountVerification: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", schema);
