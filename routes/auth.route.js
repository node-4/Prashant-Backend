const auth = require("../Controllers/userController");
const authJwt = require('../middlewares/authJwt')
module.exports = (app) => {
    app.post("/api/v1/auth/signup", auth.registration);
    app.post("/api/v1/auth/login/:id/verify", auth.verifyOtp);
    app.post("/api/v1/auth/login", auth.login);
    app.post("/api/v1/resendotp/:id", auth.resendOTP);
    app.post("/api/v1/user/card/new", [authJwt.verifyToken], auth.createPaymentCard);
    app.put("/api/v1/user/card/update/:id", [authJwt.verifyToken], auth.updatePaymentCard);
    app.get("/api/v1/user/card/getAllCard", [authJwt.verifyToken], auth.getPaymentCard);
    app.delete("/api/v1/user/card/delete/:id", [authJwt.verifyToken], auth.DeletePaymentCard);

    app.post("/api/v1/auth/payment1", auth.networkStorePayment1);








    app.post("/api/v1/auth/payment", auth.networkStorePayment);
    app.post("/api/v1/auth/fastPayPayment", auth.fastPayPayment);
    app.post("/api/v1/auth/requestForRefund", auth.requestForRefund);
    app.post("/api/v1/auth/query", auth.query);

}