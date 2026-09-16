let events = [];
let filteredEvents = [];
let currentPage = 1;
const eventsPerPage = 10;

const eventContainer = document.getElementById("eventContainer");
const searchEvent = document.getElementById("searchEvent");
const categoryFilter = document.getElementById("categoryFilter");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

const registrationSection = document.getElementById("registrationSection");
const registrationForm = document.getElementById("registrationForm");
const selectedEvent = document.getElementById("selectedEvent");
const eventFee = document.getElementById("eventFee");
const paymentBox = document.getElementById("paymentBox");
const paymentReference = document.getElementById("paymentReference");
const registrationMessage = document.getElementById("registrationMessage");
const statusText = document.getElementById("statusText");

fetch("../JSON/events.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to load events");
        }
        return response.json();
    })
    .then(data => {
        events = data;
        filteredEvents = events;
        loadCategories();
        displayEvents();
    })
    .catch(error => {
        eventContainer.innerHTML = "<p>Unable to load events. Please try again.</p>";
        console.log(error);
    });

function loadCategories() {
    const categories = [...new Set(events.map(event => event.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function displayEvents() {
    eventContainer.innerHTML = "";

    const start = (currentPage - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const pageEvents = filteredEvents.slice(start, end);

    if (pageEvents.length === 0) {
        eventContainer.innerHTML = "<p class='no-events'>No events found.</p>";
        updatePagination();
        return;
    }

    pageEvents.forEach(event => {
        const card = document.createElement("article");
        card.className = "event-card";

        const feeText = event.fee === 0 ? "Free" : "₹100";

        card.innerHTML = `
            <span class="event-category">${event.category}</span>
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            <p><strong>Organizer:</strong> ${event.organizer}</p>
            <p><strong>Seats:</strong> ${event.seats}</p>
            <p class="event-description">${event.description}</p>
            <div class="event-bottom">
                <span class="${event.fee === 0 ? "event-free" : "event-paid"}">
                    ${feeText}
                </span>
                <button class="register-btn" onclick="openRegistration(${event.id})">
                    Register
                </button>
            </div>
        `;

        eventContainer.appendChild(card);
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    pageNumber.textContent = `Page ${currentPage} of ${totalPages || 1}`;

    previousBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

searchEvent.addEventListener("input", filterEvents);
categoryFilter.addEventListener("change", filterEvents);

function filterEvents() {
    const searchText = searchEvent.value.toLowerCase().trim();
    const category = categoryFilter.value;

    filteredEvents = events.filter(event => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText) ||
            event.venue.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "All" || event.category === category;

        return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    displayEvents();
}

previousBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayEvents();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayEvents();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

function openRegistration(eventId) {
    const event = events.find(item => item.id === eventId);

    if (!event) {
        return;
    }

    registrationSection.style.display = "block";
    selectedEvent.value = event.title;

    if (event.fee === 0) {
        eventFee.value = "Free";
        paymentBox.style.display = "none";
        paymentReference.required = false;
    } else {
        eventFee.value = "₹100";
        paymentBox.style.display = "block";
        paymentReference.required = true;
    }

    registrationMessage.style.display = "none";

    registrationSection.scrollIntoView({
        behavior: "smooth"
    });
}

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const selectedFee = eventFee.value;

    if (selectedFee === "₹100" && paymentReference.value.trim() === "") {
        alert("Please enter your payment reference number.");
        return;
    }

    registrationMessage.style.display = "block";

    statusText.textContent =
        "Registration submitted successfully. Payment/reference details will be verified by the administrator.";

    registrationForm.reset();
    paymentBox.style.display = "none";
});

function closeRegistration() {
    registrationSection.style.display = "none";
    registrationForm.reset();
    registrationMessage.style.display = "none";
}