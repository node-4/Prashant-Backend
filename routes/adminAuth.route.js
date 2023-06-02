const auth = require("../controllers/admin.controller");

module.exports = (app) => {
    app.post("/api/v1/admin/signup",auth.registration);
    app.post("/api/v1/admin/login/:id/verify", auth.verifyOtp);
    app.post("/api/v1/admin/login", auth.login);
    app.post("/api/v1/admin/resendotp/:id", auth.resendOTP);
}