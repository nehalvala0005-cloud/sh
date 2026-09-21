const form = document.getElementById("registrationForm");

const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");
const continueBtn = document.getElementById("continueBtn");


function playSuccessSound() {

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.15);
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.30);

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.6
    );

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 0.6);
}


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

   if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
}

const email = document.getElementById("email").value;

localStorage.setItem("studentEmail", email);
localStorage.setItem("studentPassword", password);

successPopup.style.display = "flex";

playSuccessSound();
});


closePopup.addEventListener("click", function () {

    successPopup.style.display = "none";

});


continueBtn.addEventListener("click", function () {
    window.location.href = "login.html";
});