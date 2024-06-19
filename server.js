const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const apiRoutes = require("./app/routes/api");
const db = require("./models/index");

const app = new Koa();

app.use(bodyParser());
app.use(apiRoutes.routes());

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
