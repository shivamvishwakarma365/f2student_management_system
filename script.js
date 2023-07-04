// Array of students
const students = [];//empty array created
  
  
  let editStudentID = null;
  
  
  function createStudentRow(student) {
    const row = document.createElement("tr");
  

    const idCell = document.createElement("td");
    idCell.textContent = student.ID || "";
    row.appendChild(idCell);
  
    const nameCell = document.createElement("td");
    nameCell.textContent = student.name || "";
    row.appendChild(nameCell);
  
    const emailCell = document.createElement("td");
    emailCell.textContent = student.email || "";
    row.appendChild(emailCell);
  
    const ageCell = document.createElement("td");
    ageCell.textContent = student.age || "";
    row.appendChild(ageCell);
  
    const gradeCell = document.createElement("td");
    gradeCell.textContent = student.grade || "";
    row.appendChild(gradeCell);
  
    const degreeCell = document.createElement("td");
    degreeCell.textContent = student.degree || "";
    row.appendChild(degreeCell);
  
    // Create actions cell with edit and delete buttons
    const actionsCell = document.createElement("td");
  
    if (student.ID) {
      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.addEventListener("click", () => handleEdit(student.ID));
      actionsCell.appendChild(editButton);
  
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener("click", () => handleDelete(student.ID));
      actionsCell.appendChild(deleteButton);
    }
  
    row.appendChild(actionsCell);
  
    return row;
  }

  function renderStudents(filteredStudents) {
    const studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.innerHTML = "";
  
    const studentsToRender = filteredStudents || students;

    const emptyRowCount = Math.max(4 - studentsToRender.length, 0);
  
    // Render the existing students
    for (const student of studentsToRender) {
      const row = createStudentRow(student);
      studentTableBody.appendChild(row);
    }
  
 
    for (let i = 0; i < emptyRowCount; i++) {
      const row = createStudentRow({});
      row.classList.add("empty-row"); 
      studentTableBody.appendChild(row);
    }
  }
  
 
  function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get form input values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const degree = document.getElementById("degree").value;
    const email = document.getElementById("email").value;
  

  
    if (editStudentID) {
   
      const student = students.find((student) => student.ID === editStudentID);
      student.name = name;
      student.age = age;
      student.grade = grade;
      student.degree = degree;
      student.email = email;
  
     
      editStudentID = null;
    } else {
      
      const newStudent = {
        ID: students.length + 1,
        name: name,
        age: age,
        grade: grade,
        degree: degree,
        email: email,
      };
  
 
      students.push(newStudent);
    }
  
  
    document.getElementById("studentForm").reset();
  
    renderStudents();
  }
  
  
  function handleEdit(studentID) {
    
    const student = students.find((student) => student.ID === studentID);
  
    
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("grade").value = student.grade;
    document.getElementById("degree").value = student.degree;
    document.getElementById("email").value = student.email;
  
    editStudentID = student.ID;
  
  
    document.getElementById("submitButton").textContent = "Edit Student";
  }
  
  
  function handleDelete(studentID) {
    
    const studentIndex = students.findIndex((student) => student.ID === studentID);
  
    
    students.splice(studentIndex, 1);
  
    
    renderStudents();
  }
  
  
  function handleSearch() {
    // Get the search input value
    const searchValue = document
      .getElementById("searchInput")
      .value.toLowerCase();
  
    
    const filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.degree.toLowerCase().includes(searchValue)
    );
  

    renderStudents(filteredStudents);
  }
  
  
  document
    .getElementById("studentForm")
    .addEventListener("submit", handleFormSubmit);
  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
  
  // Initial render of the student table
  renderStudents();
  