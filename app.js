const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const {requireAuth, checkUser} = require('./middleware/authMiddleware')

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://Zeff:devZeff@nodetuts.swpf6nr.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get('*',  checkUser)
app.get("/", requireAuth, (req, res) => {
  res.render("loginPage/index", {title: 'Index'});
});

app.get("/about", requireAuth, (req, res) => {
  res.render("about", { title: "About" });
});


//routes
app.use(authRoutes);
app.use("/blogs", requireAuth, blogRoutes);


//cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader('Set-Cookie','newUser=true')
  res.cookie('newUser', false)
  res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true} )
  res.send("You got the cookie!");
});

app.get("/read-cookies", (req, res) => {

  const cookies = req.cookies;
  console.log(cookies)

  res.json(cookies)
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
