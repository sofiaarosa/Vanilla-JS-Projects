memoryGame = {
    cardsValues: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    cardCount:0,
    count: 0,
    clickedValues: [],
    clickedCards:[],
    rightGuesses:[],

    getClickedIndex(id) {
        let stringID = id.toString();
        return stringID.charAt(4) + stringID.charAt(5);
    },

    finishGame(){
        if(memoryGame.cardCount == 6){

        }
    },

    hideSomeAnswers(){
        for (let i = 0; i < 12; i++) {
            const elementId = i.toString();
            const element = document.getElementById(elementId);
            if(!memoryGame.rightGuesses.includes(elementId))element.style.opacity = "0";
        }
        memoryGame.finishGame();
    },

    verifyGuess(){
        if(memoryGame.clickedValues[0]==memoryGame.clickedValues[1]){
            memoryGame.rightGuesses.push(memoryGame.clickedCards[0]);
            memoryGame.rightGuesses.push(memoryGame.clickedCards[1]);
            memoryGame.cardCount ++;
            return true;
        }
        else return false;
    },

    //https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    async cardClick(id) {
        let spotIndex = memoryGame.getClickedIndex(id);
        let clickedCard = document.getElementById(spotIndex);
        let card = document.getElementById("card"+spotIndex);
        memoryGame.clickedCards.push(spotIndex);

        clickedCard.style.opacity = "100";

        memoryGame.clickedValues.push(clickedCard.innerHTML);
        console.log(memoryGame.clickedValues);

        memoryGame.count++;

        if(memoryGame.count == 2){
            memoryGame.count = 0;

            let a = await memoryGame.verifyGuess();

            memoryGame.clickedValues = [];
            memoryGame.clickedCards = [];

            if(a==false) await memoryGame.sleep(1000);
            await memoryGame.hideSomeAnswers();
        }
    },

    setCardsClick() {
        const cardsHTML = document.querySelectorAll(".card");
        let i = 0;
        cardsHTML.forEach(card => {
            card.addEventListener('click', function () {
                memoryGame.cardClick(card.id);
            });
            i++;
        })
    },

    isAvailable(index) {
        if (memoryGame.cardsValues[index] == 0) return false;
        else return true;
    },

    setCards() {
        const cardsHTML = document.querySelectorAll(".cardSpot");
        cardsHTML.forEach(card => {
            while (true) {
                const i = Math.floor(Math.random() * 12);
                // console.log(i);
                if (memoryGame.isAvailable(i)) {
                    let cardValue = memoryGame.cardsValues[i];
                    memoryGame.cardsValues[i] = 0;
                    card.innerHTML = cardValue;
                    break;
                }
            }
        })
    },

    hideAllAnswers() {
        for (let i = 0; i < 12; i++) {
            const element = document.getElementById(i.toString());
            element.style.opacity = "0";
        }
    },

    startGame() {
        memoryGame.setCards();
        memoryGame.hideAllAnswers();
        memoryGame.setCardsClick();
    },
}

memoryGame.startGame();