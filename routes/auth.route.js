const auth = require("../Controllers/userController");
const authJwt = require('../middlewares/authJwt')
const cryptoApi = require("../Controllers/cryptoApi");
module.exports = (app) => {
    app.post("/api/v1/auth/signup", auth.registration);
    app.post("/api/v1/auth/login/:id/verify", auth.verifyOtp);
    app.post("/api/v1/auth/login", auth.login);
    app.post("/api/v1/resendotp/:id", auth.resendOTP);
    app.post("/api/v1/user/card/new", [authJwt.verifyToken], auth.createPaymentCard);
    app.put("/api/v1/user/card/update/:id", [authJwt.verifyToken], auth.updatePaymentCard);
    app.get("/api/v1/user/card/getAllCard", [authJwt.verifyToken], auth.getPaymentCard);
    app.delete("/api/v1/user/card/delete/:id", [authJwt.verifyToken], auth.DeletePaymentCard);
    app.post("/api/v1/auth/payment", auth.networkStorePayment);
    app.post("/api/v1/auth/fastPayPayment", auth.fastPayPayment);
    app.post("/api/v1/auth/requestForRefund", auth.requestForRefund);
    app.post("/api/v1/auth/JumpPayment", auth.JumpPayment);
    app.post("/api/v1/createExchangeTransaction", [authJwt.verifyToken], cryptoApi.createExchangeTransaction);
    app.post("/api/v1/createApiv2ExchangeTransaction", [authJwt.verifyToken], cryptoApi.createApiv2ExchangeTransaction);
    app.get("/api/v1/checkTransactionStatus/:id", [authJwt.verifyToken], cryptoApi.checkTransactionStatus);
    app.get("/api/v1/listTransaction", [authJwt.verifyToken], cryptoApi.listTransaction);
    app.get("/api/v1/checkApiv2TransactionStatus1/:id", [authJwt.verifyToken], cryptoApi.checkTransactionStatus1);

    // app.post("/api/v1/auth/query", auth.query);

}