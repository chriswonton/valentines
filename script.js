const gifElement = document.getElementById("gif");
const questionElement = document.getElementById("question");
const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const yesButtonStyle = window.getComputedStyle(yesButton);
const buttonContainer = document.getElementById("button-container");

let noClicks = 1;
const maxNoClicks = 10;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1;
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of rejection gifs
const gifs = [
    "assets/images/reject/godzilla-cry.gif",
    "assets/images/reject/godzilla-jump.gif",
    "assets/images/reject/godzilla-kick.gif",
    "assets/images/reject/godzilla-laser.gif",
    "assets/images/reject/godzilla-lightning.gif",
    "assets/images/reject/godzilla-roar.gif",
    "assets/images/reject/godzilla-run.gif",
    "assets/images/reject/godzilla-trip.gif"
];

// array of button messages
const noButtonMessages = [
    "no...",
    "are you sure?",
    "not a chance?",
    "forreal?",
    "please?",
    "100%?"
]

function moveNoButton() {
    const maxX = window.innerWidth - noButton.offsetWidth;
    const maxY = window.innerHeight - noButton.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noButton.style.position = "absolute";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

// no button clicked
noButton.addEventListener("click", () => {
    // change image
    gifElement.src = gifs[Math.floor(gifs.length * Math.random())];

    // change message
    if (noClicks <= maxNoClicks) {
        let extraParenthesis = "(".repeat(noClicks);
        let extraQuestionMarks = "?".repeat(noClicks);
        questionElement.textContent = `nooo :'${extraParenthesis} reconsider${extraQuestionMarks}`;
        noClicks++;
    }

    // change button message
    noButton.textContent = noButtonMessages[Math.floor(noButtonMessages.length * Math.random())];

    // change button sizes
    noButton.style.width = 'auto';
    noButton.style.width = `${noButton.scrollWidth}px`;

    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    // calculate the scaled width of the yesButton
    const baseWidth = parseFloat(yesButtonStyle.width);
    const scaledWidth = baseWidth * yesScale; // reflects the actual visual size of the button

    // check if the scaled width is less than the max width
    if (scaledWidth < maxYesWidth) {
        yesScale += 0.5; // Increment scale by a smaller step
        yesButton.style.transform = `scale(${yesScale})`;

        // get the current gap scale factor from CSS
        const rootStyles = getComputedStyle(document.documentElement);
        const gapScaleFactor = parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

        // adjust the gap dynamically
        const currentGap = parseFloat(buttonContainer.style.gap) || 20;
        const newGap = Math.sqrt(currentGap * gapScaleFactor); // scale based on the factor
        buttonContainer.style.gap = `${newGap}px`;
    }

    noClicks++;

    // randomly move the no button
    moveNoButton();
});


// yes button clicked
yesButton.addEventListener("click", () => {
    // change image
    gifElement.src = "assets/images/godzilla-love.gif";

    // change message
    questionElement.textContent = "YAY :^) happy valentine's day❣️"

    // remove buttons
    buttonContainer.remove();
});