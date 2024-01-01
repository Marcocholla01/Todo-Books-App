const mongoose = require(`mongoose`);
const url = process.env.DB_URL;
const port = 27017;

const connectDatabase = () => {
  mongoose.connect(url).then((data) => {
    console.log(
      `mongodb is connected with server on : https://${data.connection.host}:${port}`
    );
  });
};
module.exports = connectDatabase;
