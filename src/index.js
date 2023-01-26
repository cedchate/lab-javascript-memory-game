const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      // TODO: write some code here
      const scoreClickedElement= document.querySelector('#pairs-clicked');
      const scoreGuessedElement= document.querySelector('#pairs-guessed');

      if(memoryGame.pickedCards.length < 2 && !card.classList.contains('turned')){
        card.classList.add("turned");
        memoryGame.pickedCards.push(card);
          
        // console.log(`Card clicked: ${card}`);
        
          if (memoryGame.pickedCards.length===2){
            scoreClickedElement.innerHTML= memoryGame.pairsClicked;
            if (memoryGame.checkIfPair(memoryGame.pickedCards[0].getAttribute('data-card-name'), memoryGame.pickedCards[1].getAttribute('data-card-name'))){

              scoreGuessedElement.innerHTML= memoryGame.pairsGuessed;
                    
              memoryGame.pickedCards[0].classList.add('blocked');
              memoryGame.pickedCards[1].classList.add('blocked');
              memoryGame.pickedCards.shift();
              memoryGame.pickedCards.shift();
            }else {
              setTimeout(()=> {
                memoryGame.pickedCards[0].classList.remove('turned');
                memoryGame.pickedCards[1].classList.remove('turned');
                memoryGame.pickedCards.shift();
                memoryGame.pickedCards.shift();
              }, 1000);
            }
            scoreClickedElement.innerHTML= memoryGame.pairsClicked;
          }
          
        
    
      }
      if(memoryGame.checkIfFinished()){
        scoreGuessedElement.innerHTML= 'You Won!!!!';
        setTimeout(()=> {
          document.querySelectorAll('.turned.blocked').forEach((card) => {
            card.classList.remove('turned');
            card.classList.remove('blocked');
          });
          scoreClickedElement.innerHTML= 0;
          scoreGuessedElement.innerHTML= 0;
          memoryGame.shuffleCards();
          memoryGame.pairsGuessed= 0;
          memoryGame.pairsClicked= 0;
          console.log('WIN!!!');
        }, 3000);
  
      }
    });

  });

});