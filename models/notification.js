const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
var notificationModel = new Schema({
        userId: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "User"
        },
        title: {
                type: String
        },
        body: {
                type: String
        },
        date: {
                type: String
        },
        time: {
                type: String
        },
        status: {
                type: String,
                enum: ["ACTIVE", "BLOCKED", "DELETE"],
                default: "ACTIVE"
        },
}, { timestamps: true });

const banner = Mongoose.model("notification", notificationModel);

module.exports = banner;
