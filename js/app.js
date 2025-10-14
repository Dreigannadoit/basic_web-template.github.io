const track = document.getElementById("image-track");

// Initialize the percentage data attributes
track.dataset.mouseDownAt = "0";
track.dataset.prevPercentage = "0";
track.dataset.percentage = "0";

const handleOnDown = (e) => {
    track.dataset.mouseDownAt = e.clientX.toString();
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage || "0";
};

const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const prevPercentage = parseFloat(track.dataset.prevPercentage || "0");
    const nextPercentageUnconstrained = prevPercentage + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage.toString();

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1200, fill: "forwards" }
        );
    }
};

/* -- Event listeners -- */
window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);

const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));
const transitioner = document.getElementById('transitioner');


async function pushUserToLink(id, addBTNCls, addTranCls, link ){
    const button = document.getElementById(id);
    button.classList.add(addBTNCls);
    transitioner.classList.add(addTranCls);
    await sleep(1000);
    window.location.href = link;
}

async function pushToIndex() {
    pushUserToLink('link_index', 'active', 'active', "./index.html" )
}
async function pushToIdea() {
    pushUserToLink('link_index', 'active', 'active', "./idea.html" )
}

async function pushToTeam() {
    pushUserToLink('link_index', 'active', 'active', "./team.html" )
}

const toggleNav = () => {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}





function typeWriter(element, text, speed = 50) {
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