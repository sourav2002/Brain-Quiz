const cards = document.querySelectorAll(".card");
console.log(cards);
cards.forEach((card) => card.addEventListener("click", flip));

//VARIABLES
var isFlipped = false;
var firstCard;
var secondCard;


function flip ()  {
  // console.log(this);
  this.classList.add("flip");
  if(!isFlipped){
    isFlipped = true;
    firstCard = this;
  }else{
    secondCard = this;
    checkIt();
  }

}

const checkIt = ()=>{
  // console.log("checking......");
  firstCard.dataset.image === secondCard.dataset.image ? success() : fail();
}

const success = () =>{
  console.log("success...");
  firstCard.removeEventListener('click', flip);
  secondCard.removeEventListener('click', flip);
  reset();
}

const fail = () =>{
  console.log("failed.....");
  
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 600);
}

const reset = () =>{
  isFlipped = false;
  firstCard = null;
  secondCard = null;

}

function shuffle(){
  cards.forEach( (card) =>{
    var index = Math.floor(Math.random() * 16 );
    card.style.order = index;
  })
};
window.addEventListener('load', shuffle);


const resetbtn = document.querySelector(".btn");
resetbtn.addEventListener('click', ()=>{
  console.log("reset button clicked....");
  cards.forEach( (card) =>  {
    if(card != null){
      card.addEventListener('click', flip);
      card.classList.remove("flip")
    }

  });
  isFlipped = false;
  shuffle();
})
