const signature =
" ______   ______    _______  ___  \n" +
"|      | |    _ |  |       ||   | \n" +
"|  _    ||   | ||  |    ___||   | \n" +
"| | |   ||   |_||_ |   |___ |   | \n" +
"| |_|   ||    __  ||    ___||   | \n" +
"|       ||   |  | ||   |___ |   | \n" +
"|______| |___|  |_||_______||___| \n" +
"                                  \n"

console.log(signature)

const track = document.getElementById("image-track");
const nav = document.getElementById('nav');

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

        nav.animate(
            {
                backgroundColor: `hsl(229, ${10 + nextPercentage}%, ${10 - nextPercentage}%)`,
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


async function pushUserToLink(id, addBTNCls, addTranCls, link) {
    const button = document.getElementById(id);
    button.classList.add(addBTNCls);
    transitioner.classList.add(addTranCls);
    await sleep(1000);
    window.location.href = link;
}

async function pushToIndex() {
    pushUserToLink('link_index', 'active', 'active', "./index.html")
}
async function pushToIdea() {
    pushUserToLink('link_idea', 'active', 'active', "./idea.html")
}

async function pushToTeam() {
    pushUserToLink('link_team', 'active', 'active', "./team.html")
}

const toggleNav = () => nav.classList.toggle('active');


// --- Requirement A: Essential DOM Manipulation (Problem/Solution Toggle) ---
function toggleProblemSolution() {
    const contentDisplay = document.getElementById('content-display');
    const toggleButton = document.getElementById('toggle-content-btn');

    const problemStatement = `**Problem Statement:** Dental clinic booking processes are often inefficient, leading to long waiting times, administrative burden, and patient dissatisfaction due to manual scheduling, no-shows, and difficulty in accessing patient records. This results in lost revenue for clinics and a poor experience for patients.`;
    const solutionDescription = `**Solution Description:** Our proposed system offers a comprehensive online platform for dental clinics. It provides an intuitive interface for patients to book, reschedule, and cancel appointments, access digital records, and receive timely reminders. For clinics, it automates scheduling, streamlines patient management, and provides analytics, significantly enhancing efficiency and patient satisfaction.`;

    if (contentDisplay.textContent.includes("Problem Statement")) {
        contentDisplay.textContent = solutionDescription;
        toggleButton.textContent = "Show Problem Statement";
    } else {
        contentDisplay.textContent = problemStatement;
        toggleButton.textContent = "Show Solution Description";
    }
}

// --- Requirement B: Advanced DOM Manipulation (Tabbed Interface) ---
document.addEventListener('DOMContentLoaded', () => {
    // Only set up tabs if on the idea page
    if (document.body.classList.contains('idea')) {
        setupTabInterface();
    }
});

function setupTabInterface() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Get the target tab ID from the data-tab attribute
            const targetTabId = button.dataset.tab;

            // Add 'active' class to the corresponding content
            document.getElementById(targetTabId).classList.add('active');
        });
    });
}