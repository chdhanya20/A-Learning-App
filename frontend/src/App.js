import { useState, useEffect } from "react";
import axios from "axios";
import AIChat from "./AIChat";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [progress, setProgress] = useState({});

  const handleAuth = async () => {
    const url = isRegister
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login";

    await axios.post(url, { email, password });
    setIsLogin(true);
  };

  useEffect(() => {
    if (isLogin) {
      setLoadingCourses(true);

      axios.get("http://localhost:5000/courses").then((res) => {
        setCourses(res.data);
        setLoadingCourses(false);
      });

      axios.get("http://localhost:5000/enrolled").then((res) => {
        setEnrolled(res.data);
      });
    }
  }, [isLogin]);

  const handleEnroll = async (course) => {
    await axios.post("http://localhost:5000/enroll", { course });
    const res = await axios.get("http://localhost:5000/enrolled");
    setEnrolled(res.data);
  };

  const markComplete = (id) => {
    setProgress({ ...progress, [id]: 100 });
  };

  // 🔄 Loader
  const Loader = () => (
    <div style={styles.loaderContainer}>
      <div style={styles.loader}></div>
    </div>
  );

  // 🧊 Skeleton Card
  const SkeletonCard = () => (
    <div style={styles.card}>
      <div style={styles.skeletonImage}></div>
      <div style={{ padding: "15px" }}>
        <div style={styles.skeletonText}></div>
        <div style={styles.skeletonTextSmall}></div>
        <div style={styles.skeletonBtn}></div>
      </div>
    </div>
  );

  // 🔐 LOGIN PAGE
  if (!isLogin) {
    return (
      <div style={styles.authContainer}>
        <div style={styles.authBox}>
          <h1 style={styles.logo}>Skillify</h1>
          <p style={styles.subtitle}>Learn. Build. Grow.</p>

          <h3 style={styles.heading}>
            {isRegister ? "Create Account" : "Welcome Back"}
          </h3>

          <input style={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button style={styles.primaryBtn} onClick={handleAuth}>
            {isRegister ? "Register" : "Login"}
          </button>

          <p onClick={() => setIsRegister(!isRegister)} style={styles.link}>
            {isRegister ? "Login instead" : "Create account"}
          </p>
        </div>
      </div>
    );
  }

  // 🎥 VIDEO PAGE
  if (selectedCourse) {
    return (
      <div style={styles.videoPage}>
        <h2>{selectedCourse.title}</h2>

        <iframe width="900" height="450" src={selectedCourse.video} title="video" style={styles.video} />

        <br /><br />

        <button style={styles.primaryBtn} onClick={() => markComplete(selectedCourse.id)}>
          Mark Complete ✅
        </button>

        <h3>Progress: {progress[selectedCourse.id] || 0}%</h3>

        <button style={styles.secondaryBtn} onClick={() => setSelectedCourse(null)}>
          ⬅ Back
        </button>
      </div>
    );
  }

  // 📊 DASHBOARD
  return (
    <div>
      <div style={styles.navbar}>
        <h2 style={{ color: "#ff512f" }}>Skillify</h2>
        <input style={styles.search} placeholder="Search courses..." />
        <button style={styles.logoutTop} onClick={() => setIsLogin(false)}>Logout</button>
      </div>

      <div style={styles.app}>
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <h3>My Courses</h3>
          {enrolled.map((c) => (
            <div key={c.id} style={styles.sidebarItem} onClick={() => setSelectedCourse(c)}>
              ▶ {c.title}
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div style={styles.content}>
          <h1>Explore Courses</h1>

          <div style={styles.grid}>
            {loadingCourses
              ? Array(4).fill().map((_, i) => <SkeletonCard key={i} />)
              : courses.map((course) => {
                  const isEnrolled = enrolled.find(c => c.id === course.id);

                  return (
                    <div key={course.id} style={styles.card}>
                      <img src={course.image} style={styles.image} alt="course" />

                      <div style={{ padding: "15px" }}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>

                        {!isEnrolled ? (
                          <button
                            style={styles.primaryBtn}
                            onClick={async () => {
                              setLoadingEnroll(true);
                              await handleEnroll(course);
                              setLoadingEnroll(false);
                            }}
                          >
                            {loadingEnroll ? "Enrolling..." : "Enroll"}
                          </button>
                        ) : (
                          <>
                            <button style={styles.successBtn}>Enrolled ✅</button>
                            <br /><br />
                            <button style={styles.secondaryBtn} onClick={() => setSelectedCourse(course)}>
                              Continue ▶
                            </button>

                            <div style={styles.progressBar}>
                              <div style={{ ...styles.progressFill, width: `${progress[course.id] || 0}%` }} />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
          </div>

          <AIChat />
        </div>
      </div>
    </div>
  );
}

const styles = {
  authContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:"linear-gradient(135deg, #6a11cb, #2575fc)",
  },

  authBox: {
    background: "hsla(199, 42%, 46%, 0.15)",
    backdropFilter: "blur(20px)",
    padding: "45px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 15px 40px hsla(0, 40%, 46%, 0.30)",
  },

  logo: { color: "yellow", fontSize: "32px" },
  subtitle: { color: "hsl(60, 78%, 40%)" },
  heading: { color: "red" },

  input: {
    display: "block",
    margin: "12px auto",
    padding: "12px",
    width: "260px",
    borderRadius: "10px",
    border: "none",
  },

  primaryBtn: {
    background: "linear-gradient(45deg,#ff512f,#dd2476)",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "hsl(205, 52%, 53%)",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },

  successBtn: {
    background: "#00c853",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },

  link: { color: "white", cursor: "pointer" },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 25px",
    background: "blue",
  },

  search: {
    width: "300px",
    padding: "10px",
    borderRadius: "8px",
  },

  logoutTop: {
    background: "#ff4ecd",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
  },

  app: { display: "flex" },

  sidebar: {
    width: "220px",
    background: "rgb(78, 177, 96)",
    color: "green",
    padding: "20px",
    height: "100vh",
  },

  sidebarItem: {
    marginTop: "12px",
    cursor: "pointer",
  },

  content: {
    flex: 1,
    padding: "30px",
    background: "rgb(77, 100, 135)",
  },

  grid: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
  },

  card: {
    width: "260px",
    background: "blue",
    borderRadius: "15px",
    boxShadow: "0 10px 25px hsla(0, 32%, 50%, 0.10)",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
  },

  progressBar: {
    width: "100%",
    height: "6px",
    background: "#4594a6",
  },

  progressFill: {
    height: "100%",
    background: "#00c853",
  },

  videoPage: {
    textAlign: "center",
    padding: "40px",
    background: "rgb(49, 82, 158)",
    color: "white",
  },

  video: {
    borderRadius: "12px",
  },

  loaderContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid #eee",
    borderTop: "5px solid rgb(120, 191, 106)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  skeletonImage: {
    width: "100%",
    height: "150px",
    background: "hsl(0, 0%, 93%)",
    borderRadius: "10px",
  },

  skeletonText: {
    height: "15px",
    marginTop: "10px",
    background: "rgb(148, 127, 127)",
    borderRadius: "5px",
  },

  skeletonTextSmall: {
    height: "10px",
    width: "60%",
    marginTop: "8px",
    background: "rgb(161, 255, 158)",
    borderRadius: "5px",
  },

  skeletonBtn: {
    height: "30px",
    width: "80px",
    marginTop: "15px",
    background: "hsl(187, 35%, 32%)",
    borderRadius: "6px",
  },
};

export default App;