function CourseDetails({ course, goBack }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default CourseDetails;