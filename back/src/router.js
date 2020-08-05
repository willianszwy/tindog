const { Router } = require("express");
const { withJWTAuthMiddleware } = require("express-kun");
const router = Router();

const protectedRouter = withJWTAuthMiddleware(router, process.env.PRIVATE_KEY);


protectedRouter.get("/home", (req, res) => {
    res.json({ message: "Welcome to home." });
});

module.exports = router;