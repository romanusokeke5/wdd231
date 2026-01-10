const courses = [
  {id: 1, code: "WDD 100", name: "Introduction to Web Development", credits: 3, category: "wdd", completed: true},
  {id: 2, code: "CSE 110", name: "Introduction to Programming", credits: 6, category: "cse", completed: true},
  {id: 3, code: "WDD 131", name: "Front-End Web Development I", credits: 3, category: "wdd", completed: false},
  {id: 4, code: "WDD 231", name: "Front-End Web Development II", credits: 3, category: "wdd", completed: false},
  {id: 5, code: "WOD 201", name: "Web Optimization and Deployment", credits: 3, category: "wod", completed: false},
  {id: 6, code: "CSE 212", name: "Object-Oriented Programming", credits: 3, category: "cse", completed: false}
];

let filteredCourses = [...courses];

function renderCourses(courseList) {
  const courseListEl = document.getElementById("course-list");
  const html = courseList.map(course => `
    <article class="course-card ${course.completed ? 'completed' : ''}">
      <h3>${course.code}</h3>
      <p>${course.name}</p>
    </article>
  `).join("");
  courseListEl.innerHTML = html;

  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById("totalCredits").textContent = totalCredits;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const category = e.currentTarget.dataset.category;
    filteredCourses = category === "all" ? [...courses] : courses.filter(course => course.category === category);
    renderCourses(filteredCourses);

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Initial render
renderCourses(courses);