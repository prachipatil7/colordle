var r = 0;
var g = 0;
var b = 0;
var guesses = 0;
var prev_color = "rgb(242, 242, 242)";
const green = "rgb(106,170,99)";
const yellow = "rgb(201,180,88)";

const generateColor = () => {
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
};

const fontColorForBackground = (r, g, b) => {
    if ((r*0.299 + g*0.587 + b*0.144) > 186) {
        return "black";
    } else {
        return "white";
    }
}

const displayGoal = () => {
    generateColor();
    document.getElementById("header").style.background = `rgb(${r},${g},${b})`;
    document.getElementById("header-text").style.color = fontColorForBackground(r, g, b);
};

const generateGuessHtml = (num) => {
    return `
    <div class="guess-container" id="guess-container${num}">
    <div id="r-container${num}">
        <input placeholder="R" name="r" type="number" id="r${num}" min="0" max="255" step="1" checked> 
    </div>
    <div id="g-container${num}">
        <input placeholder="G" name="g" type="number" id="g${num}" min="0" max="255" step="1"> 
    </div>
    <div id="b-container${num}">
        <input placeholder="B" name="b" type="number"id="b${num}" min="0" max="255" step="1"> 
    </div>
    <div class="colorbox" id="guess-color${num}"></div>
    <div class="colorbox" id="goal-color${num}"></div>
    <div id="button-container${num}">
        <button type="submit" onclick="submitGuess(${num})">Go!</button>
    </div>
    </div> 
    `
};

const displayInput = () => {
    guesses++;
    document.getElementById("game-container").innerHTML += generateGuessHtml(guesses);
};

const num2Paragraph = (num, color) => {
    return `
    <p style="color: ${color}">${num}</p>
    `
};

const winScreen = () => {
    html = `
    <div id="win-screen" style="background: rgb(${r},${g},${b})">
        <h2 style="color: ${fontColorForBackground(r, g, b)}">TOTAL GUESSES: ${guesses}</h2>
    </div>
    `
    document.getElementById("game-container").innerHTML += html;
}

const checkCorrect = (actual, estimate, color) => {
    if (actual == estimate) {
        document.getElementById(`${color}-container${guesses}`).style.background = green;
        document.getElementById(`${color}-container${guesses}`).innerHTML = num2Paragraph(estimate, "white");
    } else if (Math.abs(actual-estimate) <= 5) {
        document.getElementById(`${color}-container${guesses}`).style.background = yellow;
        document.getElementById(`${color}-container${guesses}`).innerHTML = num2Paragraph(estimate, "white");
    }
}

const submitGuess = (guess) => {
    const guess_r = document.getElementById(`r${guess}`).value
    const guess_g = document.getElementById(`g${guess}`).value
    const guess_b = document.getElementById(`b${guess}`).value

    const font_color = fontColorForBackground(guess_r, guess_g, guess_b);

    document.getElementById(`r-container${guess}`).innerHTML = num2Paragraph(guess_r, font_color);
    document.getElementById(`g-container${guess}`).innerHTML = num2Paragraph(guess_g, font_color);
    document.getElementById(`b-container${guess}`).innerHTML = num2Paragraph(guess_b, font_color);

    //document.getElementById(`guess-container${guess}`).style.background = `rgb(${guess_r},${guess_g},${guess_b})`;
    
    document.getElementById(`guess-container${guess}`).style.background = `linear-gradient(${prev_color}, rgb(${guess_r},${guess_g},${guess_b})`;
    prev_color = `rgb(${guess_r},${guess_g},${guess_b})`

    document.getElementById(`guess-color${guess}`).style.background = `rgb(${guess_r},${guess_g},${guess_b})`;
    document.getElementById(`goal-color${guess}`).style.background = `rgb(${r},${g},${b})`;

    const distance = Math.floor(Math.sqrt(Math.pow(r-guess_r, 2) + Math.pow(g-guess_g, 2) + Math.pow(b-guess_b, 2)));
    document.getElementById(`button-container${guess}`).innerHTML = num2Paragraph(distance, font_color);

    checkCorrect(r, guess_r, "r");
    checkCorrect(g, guess_g, "g");
    checkCorrect(b, guess_b, "b");

    if (distance == 0) { 
        winScreen();
    } else {
        displayInput();
    }
};

const initPage = () => {
    displayGoal();
    displayInput();
};

initPage();