const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.innerHTML = ''; // Clear existing content

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Usage
const text = "The Dental Appointment App streamlines dental clinic operations by allowing patients to easily book and manage appointments while giving dentists efficient tools for scheduling, record-keeping, and reminders — improving convenience, communication, and overall care.";

// Start typing when page loads
window.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter-text');
    typeWriter(typewriterElement, text, 10); // Adjust speed as needed
});