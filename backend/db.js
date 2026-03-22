const mysql = require("mysql2");

console.log("🔄 Trying to connect to MySQL..."); // 👈 ADD THIS

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "unique12345",
    database: "lms"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:");
        console.error(err); // 👈 VERY IMPORTANT
    } else {
        console.log("✅ MySQL Connected");
    }
});

module.exports = db;


