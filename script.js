let counter = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;

document.getElementById('counterText').textContent = `Count: ${counter}`;

function incrementCounter() {
    counter++;
    localStorage.setItem('counter', counter);
    document.getElementById('counterText').textContent = `Count: ${counter}`;
}

function getCurrentDateInGMT7() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok', ...options });
    return date;
}

function updateFooterText() {
    const currentDate = getCurrentDateInGMT7();
    document.getElementById('footerText').textContent = `THIS WEBSITE IS A TESTAMENT TO MY STRONG DISSATISFACTION WITH 'U' UNIVERSITY AS OF ${currentDate}`;
}

function showContent() {
    document.getElementById('passwordPrompt').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value.trim();
    if (password.toLowerCase() === "utt" || password.toLowerCase() === "university of transport technology") {
        showContent();
        updateFooterText();
    } else {
        alert("Nuh uh");
    }
}

updateFooterText();
