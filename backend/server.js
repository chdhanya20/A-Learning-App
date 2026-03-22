const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data
let enrolledCourses = [];

// LOGIN (allow all)
app.post("/login", (req, res) => {
  res.json({ message: "Login successful" });
});

// COURSES
const courses = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn React",
    video: "https://www.youtube.com/embed/bMknfKXIFA8",
    image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
  },
  {
    id: 2,
    title: "Node.js",
    description: "Learn Backend",
    video: "https://www.youtube.com/embed/TlB_eWDSMt4",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
];
  

// GET COURSES
app.get("/courses", (req, res) => {
  res.json(courses);
});

// ✅ ENROLL COURSE (no duplicates)
app.post("/enroll", (req, res) => {
  const { course } = req.body;

  // check if already enrolled
  const exists = enrolledCourses.find((c) => c.id === course.id);

  if (exists) {
    return res.json({ message: "Already enrolled ⚠️" });
  }

  enrolledCourses.push(course);

  res.json({ message: "Enrolled successfully ✅" });
});

// GET ENROLLED COURSES
app.get("/enrolled", (req, res) => {
  res.json(enrolledCourses);
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});