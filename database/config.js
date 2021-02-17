const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    await connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error al Inicial BD");
  }
};

module.exports = dbConnection;
