const loginForm = document.getElementById("loginForm");

const loginPopup = document.getElementById("loginPopup");
const closeLoginPopup = document.getElementById("closeLoginPopup");
const loginContinueBtn = document.getElementById("loginContinueBtn");

function playLoginSound() {

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


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const registeredEmail = localStorage.getItem("studentEmail");
    const registeredPassword = localStorage.getItem("studentPassword");

    if (email === registeredEmail && password === registeredPassword) {

        loginPopup.style.display = "flex";

        playLoginSound();

    } else {

        alert("Invalid email or password!");

    }

});


closeLoginPopup.addEventListener("click", function () {

    loginPopup.style.display = "none";

});


loginContinueBtn.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});