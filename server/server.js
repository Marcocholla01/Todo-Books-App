require(`dotenv`).config();
const express = require(`express`);
const connection = require(`./database/db`);
const port = process.env.port;
const bookRouter = require(`./routes/bookRoutes`);
const app = express();

app.use(express());
app.use(express.json({ extended: true }));

connection();

app.use(`/book`, bookRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
