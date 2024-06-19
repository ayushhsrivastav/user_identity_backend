const Router = require("koa-router");
const apiController = require("../controllers/api.controller");

const router = new Router();

router.post("/identify", apiController.identify);

module.exports = router;
