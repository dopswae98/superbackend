import express from "express";
// const cors = require("cors");
// const mongoose = require("mongoose");
// const UserModel = require("./models/Users");

import mysql from "mysql";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kingpingx88@gmail.com",
    pass: process.env.REACT_APP_PASSWORD,
    // pass: "vgafytqhfzpngojl",
  },
});

const mailOptions = {
  from: "kingpingx88@gmail.com",
  to: "ephraimmatarutse@gmail.com",
  subject: "Testing Nodemailer",
  text: "Hello, this is a test email sent using Nodemailer",
};

const sendTheEmail = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const app = express();
app.use(express.json());
// app.use(cors());

app.listen(3003, () => {
  console.log("Server Running");
  // sendTheEmail();
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "Kingping123*",
  password: "root123",
  database: "test",
  // port: 80,
});

app.get("/", (req, res) => {
  res.json("jhjh");
  sendTheEmail();
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return console.log(err);
    return res.json(data[0].id);
  });
});

app.post("/books", (req, res) => {
  // const q = "INSERT INTO test (`title`,  desc`, `cover`) VALUES (?)";
  const q = "INSERT INTO `test`.`books` (`title`, `desc`, `cover`) VALUES (?);";
  // const values = ["title2", "desc2", "cover2"];
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return console.log(err);
    return res.json(data);
  });
});

// mongoose
//   .connect(
//     // "mongodb+srv://ephraimmatarutse:8fMovdKEDQ34v0lq@cluster0.1w8elki.mongodb.net/shopS?retryWrites=true&w=majority"
//     "mongodb+srv://ephraimmatarutse:8fMovdKEDQ34v0lq@cluster0.1w8elki.mongodb.net/shopS?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//     }
//     // "mongodb+srv://ephraimmatarutse:8fMovdKEDQ34v0lq@cluster0.1w8elki.mongodb.net/shopS?retryWrites=true&w=majority"
//   )
//   .then(console.log("connected"))
//   .catch((err) => console.log(err));

app.get("/a", (req, res) => {
  res.send("hie");
});

// app.get("/", (req, res) => {
// res.send(
//   UserModel
//     .find
// {}
// , (err, result) => {
// if (err) {
//   res.json(err);
// } else {
//   res.json(result);
// }
// }
// ()
// );
// });
