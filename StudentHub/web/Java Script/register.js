const form = document.getElementById("registrationForm");

const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");
const continueBtn = document.getElementById("continueBtn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const dobInput = document.getElementById("dob");
const courseInput = document.getElementById("course");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const mobileError = document.getElementById("mobileError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const genderError = document.getElementById("genderError");
const courseError = document.getElementById("courseError");
const termsError = document.getElementById("termsError");

const passwordStrength = document.getElementById("passwordStrength");


function showError(input, errorElement, message) {
    errorElement.textContent = message;

    if (input) {
        input.classList.add("input-error");
        input.classList.remove("input-success");
    }
}


function showSuccess(input, errorElement) {
    errorElement.textContent = "";

    if (input) {
        input.classList.remove("input-error");
        input.classList.add("input-success");
    }
}


function validateName() {

    const name = nameInput.value.trim();
    const pattern = /^[A-Za-z ]+$/;

    if (name === "") {
        showError(nameInput, nameError, "Name is required.");
        return false;
    }

    if (!pattern.test(name)) {
        showError(nameInput, nameError, "Name should contain only letters.");
        return false;
    }

    showSuccess(nameInput, nameError);
    return true;
}


function validateEmail() {

    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError(emailInput, emailError, "Email is required.");
        return false;
    }

    if (!pattern.test(email)) {
        showError(emailInput, emailError, "Enter a valid email address.");
        return false;
    }

    showSuccess(emailInput, emailError);
    return true;
}


function validateMobile() {

    const mobile = mobileInput.value.trim();
    const pattern = /^[0-9]{10}$/;

    if (mobile === "") {
        showError(mobileInput, mobileError, "Mobile number is required.");
        return false;
    }

    if (!pattern.test(mobile)) {
        showError(mobileInput, mobileError, "Enter exactly 10 digits.");
        return false;
    }

    showSuccess(mobileInput, mobileError);
    return true;
}


function validatePassword() {

    const password = passwordInput.value;

    if (password === "") {
        showError(passwordInput, passwordError, "Password is required.");

        if (passwordStrength) {
            passwordStrength.textContent = "";
        }

        return false;
    }

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);

    if (password.length < 8) {

        showError(
            passwordInput,
            passwordError,
            "Password must contain at least 8 characters."
        );

        if (passwordStrength) {
            passwordStrength.textContent = "Weak password";
            passwordStrength.style.color = "#ff6b6b";
        }

        return false;
    }

    if (!uppercase || !lowercase || !number) {

        showError(
            passwordInput,
            passwordError,
            "Use uppercase, lowercase and a number."
        );

        if (passwordStrength) {
            passwordStrength.textContent = "Medium password";
            passwordStrength.style.color = "#ffd43b";
        }

        return false;
    }

    showSuccess(passwordInput, passwordError);

    if (passwordStrength) {
        passwordStrength.textContent = "Strong password";
        passwordStrength.style.color = "#27c98a";
    }

    return true;
}


function validateConfirmPassword() {

    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (confirmPassword === "") {
        showError(
            confirmInput,
            confirmError,
            "Please confirm your password."
        );

        return false;
    }

    if (password !== confirmPassword) {
        showError(
            confirmInput,
            confirmError,
            "Passwords do not match."
        );

        return false;
    }

    showSuccess(confirmInput, confirmError);
    return true;
}


function validateGender() {

    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (!gender) {
        genderError.textContent = "Please select your gender.";
        return false;
    }

    genderError.textContent = "";
    return true;
}


function validateCourse() {

    if (
        courseInput.value === "" ||
        courseInput.value === "Select Course"
    ) {
        courseError.textContent = "Please select a course.";
        return false;
    }

    courseError.textContent = "";
    return true;
}


function validateTerms() {

    const terms = document.querySelector(
        'input[type="checkbox"][required]'
    );

    if (!terms.checked) {
        termsError.textContent =
            "You must accept the Terms & Conditions.";

        return false;
    }

    termsError.textContent = "";
    return true;
}


nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
mobileInput.addEventListener("input", validateMobile);

passwordInput.addEventListener("input", function () {

    validatePassword();

    if (confirmInput.value !== "") {
        validateConfirmPassword();
    }

});

confirmInput.addEventListener("input", validateConfirmPassword);
courseInput.addEventListener("change", validateCourse);


document.querySelectorAll('input[name="gender"]').forEach(function (radio) {

    radio.addEventListener("change", validateGender);

});


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validMobile = validateMobile();
    const validPassword = validatePassword();
    const validConfirm = validateConfirmPassword();
    const validGender = validateGender();
    const validCourse = validateCourse();
    const validTerms = validateTerms();

    if (
        !validName ||
        !validEmail ||
        !validMobile ||
        !validPassword ||
        !validConfirm ||
        !validGender ||
        !validCourse ||
        !validTerms
    ) {
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    localStorage.setItem("studentEmail", email);
    localStorage.setItem("studentPassword", password);

    successPopup.style.display = "flex";

    playSuccessSound();

});


function playSuccessSound() {

    const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        523,
        audioContext.currentTime
    );

    oscillator.frequency.setValueAtTime(
        659,
        audioContext.currentTime + 0.15
    );

    oscillator.frequency.setValueAtTime(
        784,
        audioContext.currentTime + 0.30
    );

    gainNode.gain.setValueAtTime(
        0.15,
        audioContext.currentTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.6
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.6
    );
}


closePopup.addEventListener("click", function () {
    successPopup.style.display = "none";
});


continueBtn.addEventListener("click", function () {
    window.location.href = "login.html";
});