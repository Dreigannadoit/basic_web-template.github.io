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
    pushUserToLink('link_index', 'active', 'active', "./idea.html")
}

async function pushToTeam() {
    pushUserToLink('link_index', 'active', 'active', "./team.html")
}

const toggleNav = () => nav.classList.toggle('active');

