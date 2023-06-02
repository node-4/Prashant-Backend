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
        registrationNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        passportId: {
            type: String,
        },
        accountNumber: {
            type: String,
        },
        swiftCode: {
            type: String,
        },
        bankAddress: {
            type: String,
        },
        recipientName: {
            type: String,
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
