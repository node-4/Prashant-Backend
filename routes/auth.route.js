const auth = require("../controllers/user.controller");

module.exports = (app) => {
    app.post("/api/v1/auth/signup",auth.registration);
    app.post("/api/v1/auth/login/:id/verify", auth.verifyOtp);
    app.post("/api/v1/auth/login", auth.login);
    app.post("/api/v1/resendotp/:id", auth.resendOTP);
}