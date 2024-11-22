const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#rese-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // Player O starts
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! ${winner} Wins! 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            showWinner(boxes[a].innerText);
            return;
        }
    }

    if ([...boxes].every((box) => box.innerText)) {
        msg.innerText = "It's a Draw! 🤝";
        msgContainer.classList.remove("hide");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        turnO = !turnO;
        checkWinner();
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
