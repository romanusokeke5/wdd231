// Sample courses array (update completed & add your courses)
const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals I', credits: 3, category: 'WDD', completed: true },
  { code: 'WDD 131', name: 'Web Fundamentals II', credits: 3, category: 'WDD', completed: true },
  { code: 'CSE 110', name: 'Principles of Computer Science I', credits: 3, category: 'CSE', completed: true },
  { code: 'CSE 111', name: 'Principles of Computer Science II', credits: 3, category: 'CSE', completed: true },
  { code: 'WDD 231', name: 'Front-End Web Development', credits: 3, category: 'WDD', completed: false },
  { code: 'CSE 212', name: 'Principles of Programming', credits: 3, category: 'CSE', completed: true }
  // Add more for testing (e.g., WOD if needed)
];

let filteredCourses = [...courses];

function displayCourses(coursesList) {
  const container = document.getElementById('courses-container');
  container.innerHTML = coursesList.map(course => `
    <article class="course-card ${course.completed ? 'completed' : ''}">
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      ${course.completed ? '<span class="badge">Completed</span>' : ''}
    </article>
  `).join('');

  const totalCredits = coursesList.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById('total-credits').textContent = totalCredits;
}

function filterCourses(filter) {
  if (filter === 'all') {
    filteredCourses = [...courses];
  } else {
    filteredCourses = courses.filter(course => course.category.toLowerCase() === filter.toLowerCase());
  }
  displayCourses(filteredCourses);
}

// Button listeners
document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.buttons button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterCourses(button.dataset.filter);
  });
});

// Initial load
displayCourses(filteredCourses);