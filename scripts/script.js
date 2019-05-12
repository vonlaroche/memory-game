const cards = document.querySelectorAll(".memory-card");
let cardFlipped = false;
let firstCard, secondCard;
let disableBoard = false;
let matches = 0;


cards.forEach(card => {
    card.addEventListener("click", () => flipTheCard(card));
});


flipTheCard = card => {
    if (disableBoard) return;
    if (card === firstCard) return;

    card.classList.add("flipCard");
    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = card;
        return;
    }
    secondCard = card;
    checkIfMatch();

}

checkIfMatch = () => {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        resetBoard();
        console.log("match");
        matches++;
        if (matches === 6) {
            matches = 0;
            setTimeout(() => {
                cards.forEach(card => card.classList.remove("flipCard"));
                shuffle();
                resetBoard();
            }, 1000)
        }
        return;
    }
    unflipCards();
}

unflipCards = () => {
    disableBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipCard');
        secondCard.classList.remove('flipCard');
        resetBoard();
    }, 1000);
}

resetBoard = () => {
    [cardFlipped, disableBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

shuffle = () => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

