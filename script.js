// Declare and initialize the homeContent variable
const homeContent = document.getElementById("homeContent");

// Function to fetch our services
function getOurServices() {
  fetch("http://localhost:3000/Our-Services")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Log the response data to inspect its structure
      displayOurServices(data);
    })
    .catch((error) => console.error("Error:", error));
}

// Function to display our services
function displayOurServices(services) {
  if (!Array.isArray(services)) {
    console.error("Error: Invalid services data");
    return;
  }

  let html = "<h2>Our Services</h2>";
  html += "<ul>";
  services.forEach((service) => {
    html += `<li>${service.name}</li>`;
  });
  html += "</ul>";
  homeContent.innerHTML = html;
}

// Function to fetch specialists
function getSpecialists() {
  fetch("http://localhost:3000/Specialists")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Log the response data to inspect its structure
      displaySpecialists(data);
    })
    .catch((error) => console.error("Error:", error));
}

// Function to display specialists
function displaySpecialists(specialists) {
  if (!Array.isArray(specialists)) {
    console.error("Error: Invalid specialists data");
    return;
  }

  let html = "<h2>Specialists</h2>";
  html += "<ul>";
  specialists.forEach((specialist) => {
    html += `<li>${specialist.name} - Bookings: ${specialist.appointment}</li>`;
  });
  html += "</ul>";
  homeContent.innerHTML = html;
}

// Function to book an appointment
function bookAppointment(name, email, specialistId) {
  fetch("http://localhost:3000/appointments", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email, specialistId }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // Process the response data or perform additional actions here
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function scrollToSpecialists() {
  const specialistsSection = document.getElementById("specialistsSection");
  specialistsSection.scrollIntoView({ behavior: "smooth" });
}

// Function to redirect to the Appointment page
function redirectToAppointment() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const specialistInput = document.getElementById("specialist").value;

  // Validate inputs
  if (nameInput.trim() === "" || emailInput.trim() === "" || specialistInput.trim() === "") {
    alert("Please fill in all fields before booking an appointment.");
    return;
  }

  // Redirect to the appointment page with query parameters
  const queryParams = `?name=${encodeURIComponent(nameInput)}&email=${encodeURIComponent(emailInput)}&specialist=${encodeURIComponent(specialistInput)}`;
  window.location.href = `appointment.html${queryParams}`;
}

// Fetch our services and display them
getOurServices();

// Function to dynamically generate specialist options
function generateSpecialistOptions(specialists) {
  let html = "";
  specialists.forEach((specialist) => {
    html += `<option value="${specialist.id}">${specialist.name}</option>`;
  });
  return html;
}

// Function to update specialist options based on the selected service by patient
function updateSpecialist(serviceId) {
  getSpecialists().then((specialists) => {
    const specialistSelect = document.getElementById("specialist");
    specialistSelect.innerHTML = generateSpecialistOptions(specialists);
  });
}

// Adding event listener for form submission
const appointmentForm = document.getElementById("appointmentForm");
appointmentForm.addEventListener("submit", handleAppointmentBooking);