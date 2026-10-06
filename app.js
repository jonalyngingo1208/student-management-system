const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = 4000;

// =====================================
// MIDDLEWARE
// =====================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =====================================
// SESSION
// =====================================

app.use(
    session({
        secret: "student-management-secret",
        resave: false,
        saveUninitialized: false
    })
);

// =====================================
// LOGIN PROTECTION MIDDLEWARE
// =====================================

function requireLogin(req, res, next) {

    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }

}

// =====================================
// EJS
// =====================================

app.set("view engine", "ejs");

// =====================================
// MONGODB CONNECTION
// =====================================

mongoose
    .connect("mongodb://127.0.0.1:27017/student_management")
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// =====================================
// STUDENT SCHEMA
// =====================================

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

// =====================================
// STUDENT MODEL
// =====================================

const Student = mongoose.model("Student", studentSchema);

// =====================================
// HOME PAGE
// =====================================

app.get("/", (req, res) => {
    res.render("index");
});

// =====================================
// LOGIN PAGE
// =====================================

app.get("/login", (req, res) => {
    res.render("login");
});

// =====================================
// LOGIN PROCESS
// =====================================

app.post("/login", (req, res) => {

    const username = req.body.username;

    req.session.user = {
        name: username
    };

    console.log("User logged in:", username);

    res.redirect("/students");

});

// =====================================
// STUDENTS PAGE - READ
// =====================================

app.get("/students", requireLogin, async (req, res) => {

    try {

        const students = await Student.find();

        res.render("students", {
            students: students,
            user: req.session.user
        });

    } catch (error) {

        console.log("Error:", error);

        res.send("Error loading students.");

    }

});

// =====================================
// ADD STUDENT - CREATE
// =====================================

app.post("/students", requireLogin, async (req, res) => {

    try {

        const newStudent = new Student({
            name: req.body.name,
            course: req.body.course,
            age: req.body.age,
            city: req.body.city
        });

        await newStudent.save();

        console.log("Student added successfully!");

        res.redirect("/students");

    } catch (error) {

        console.log("Error adding student:", error);

        res.send("Error adding student.");

    }

});

// =====================================
// UPDATE STUDENT
// =====================================

app.post("/students/update/:id", requireLogin, async (req, res) => {

    try {

        await Student.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            course: req.body.course,
            age: req.body.age,
            city: req.body.city
        });

        console.log("Student updated successfully!");

        res.redirect("/students");

    } catch (error) {

        console.log("Error updating student:", error);

        res.send("Error updating student.");

    }

});

// =====================================
// DELETE STUDENT
// =====================================

app.post("/students/delete/:id", requireLogin, async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        console.log("Student deleted successfully!");

        res.redirect("/students");

    } catch (error) {

        console.log("Error deleting student:", error);

        res.send("Error deleting student.");

    }

});

// =====================================
// LOGOUT
// =====================================

app.get("/logout", (req, res) => {

    req.session.destroy((error) => {

        if (error) {

            console.log("Error logging out:", error);

            return res.send("Error logging out.");

        }

        console.log("User logged out successfully!");

        res.redirect("/");

    });

});

// =====================================
// API MIDDLEWARE
// =====================================

app.use("/api", (req, res, next) => {

    console.log("API Request:");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);

    res.redirect("https://youtu.be/QDia3e12czc");

});

// =====================================
// 404 PAGE
// =====================================

app.use((req, res) => {

    res.status(404).send("Page not found.");

});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {

    console.log("=================================");
    console.log("Student Management System");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("=================================");

});