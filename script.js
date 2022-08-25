const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let boardLock = false;
let firstCard;
let secondCard;

const flipCard = (e) => {
  if (boardLock) return;

  const target = e.target.parentElement;

  if (target === firstCard) return;

  target.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = target;
  } else {
    hasFlippedCard = false;
    secondCard = target;
    checkForMatch();
  }
};

const checkForMatch = () => {
  const isEqual = firstCard.dataset.color === secondCard.dataset.color;

  isEqual ? disableCards() : unFlipCards();
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

const unFlipCards = () => {
  boardLock = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  hasFlippedCard = false;
  boardLock = false;
  firstCard = null;
  secondCard = null;
};

cards.forEach((card) => {
  card.addEventListener("click", flipCard);

  const randomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = randomIndex;
});
