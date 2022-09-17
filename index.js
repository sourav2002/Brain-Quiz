

//VARIABLES
var isFlipped = false;
var firstCard;
var secondCard;

const topImage = {
  imageSrc : './images/lco.png',
  alt : 'lco',
}

const imageData = [
  {
    imageSrc :  "./images/evilface.png",
    alt : 'evilface',
  },
  {
    imageSrc :  "./images/angryface.png",
    alt : "angryface",
  },
  {
    imageSrc :  "./images/coolface.png",
    alt : "coolface",
  },
  {
    imageSrc : "./images/feverface.png",
    alt : "feverface",
  },
  {
    imageSrc :  "./images/vomitface.png",
    alt : "vomitface",
  },
  {
    imageSrc :  "./images/sneezeface.png",
    alt : "sneezeface",
  },
  {
    imageSrc :  "./images/mindblownface.png",
    alt : "mindblownface",
  },
  {
    imageSrc :  "./images/thinkingface.png",
    alt : "thinkingface",
  },

]

function title(){
  const textdiv = document.createElement('div');
  textdiv.classList.add("container");
  const h1 = document.createElement('h1');
  h1.classList.add("text-white", "text-center", "text-lg");
  const text = document.createTextNode("How is your memory");
  h1.appendChild(text);
  textdiv.appendChild(h1);
  return textdiv;
}

function generateBoard(){
  const container = document.querySelector(".gameContainer");
  const textdiv = title();
  container.appendChild(textdiv);
  imageData.forEach( (data) =>{    
    for (let i =0; i<2; i++){
      // div of both img
      const div = document.createElement('div');
      div.classList.add("card");
      var att = document.createAttribute("data-image");
      att.value = data.alt;
      div.setAttributeNode(att);

      //image 1
      const img1 = getImage("front", data.imageSrc, data.alt);
      //image 2
      const img2 = getImage("back", topImage.imageSrc, topImage.alt);
      div.append(img1, img2);
      container.appendChild(div);
    }
  })
  const btn = resetButton();
  document.body.appendChild(btn);
}

// create image 
function getImage(myclass, source, imageAlt){
  const img = document.createElement('img');
  img.classList.add(myclass);
  img.src = source;
  img.setAttribute('alt', imageAlt);
  return img;
}

function resetButton(){
  const btn = document.createElement("button");
  btn.classList.add("bg-success", "btn-lg", "mx-auto", "mt-5", "d-block", "resetbtn", "btn-success", "btncss");
  const text = document.createTextNode("Reset Board");
  btn.appendChild(text);
  return btn;
}

window.addEventListener('load', generateBoard(), resetButton());


const cards = document.querySelectorAll(".card");
console.log(cards);
cards.forEach((card) => card.addEventListener("click", flip));


function flip ()  {
  // console.log(this);
  this.classList.add("flip");
  if(!isFlipped){
    isFlipped = true;
    firstCard = this;
    firstCard.removeEventListener('click', flip);
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
  secondCard.removeEventListener('click', flip);
  reset();
}

const fail = () =>{
  console.log("failed.....");
  setTimeout(() => {
    firstCard.classList.remove("flip");
    firstCard.addEventListener('click', flip);
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

const resetbtn = document.querySelector(".resetbtn");
resetbtn.addEventListener('click', ()=>{
  console.log("reset button clicked....");
  cards.forEach( (card) =>  {
    card.classList.remove("flip")
    card.addEventListener('click', flip);
  });
  isFlipped = false;
  setTimeout(() => {
    shuffle();
  }, 800);
})

shuffle();