function CoursePlayer({ course, goBack }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{course.title}</h2>

      <iframe
        width="700"
        height="400"
        src={course.video}
        title="Course Video"
        allowFullScreen
      ></iframe>

      <br /><br />
      <button onClick={goBack}>⬅ Back</button>
    </div>
  );
}

export default CoursePlayer;