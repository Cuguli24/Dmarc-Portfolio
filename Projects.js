const track = document.getElementById("image-track");
const title=document.querySelector("#title");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

function handleOnMove (e) {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  let percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100+nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }

  if(nextPercentage==0){
    title.animate({
      opacity:"1"
    },{duration:1200})
    title.style.opacity="1";
  }

  else{
    title.animate({
      opacity:"0"
    },{duration:1200})
    title.style.opacity="0";
  }

}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

const cursorDot=document.querySelector(".cursor-dot");
const cursorOutline=document.querySelector(".cursor-outline");

window.addEventListener("mousemove",function(e){
    const posX=e.clientX
    const posy=e.clientY

    cursorDot.style.left=posX.toString()+'px';
    cursorDot.style.top=posy.toString()+'px'

    //cursorOutline.style.left=posX.toString()+'px';
    //cursorOutline.style.top=posy.toString()+'px'

    cursorOutline.animate({
        left:posX.toString()+'px',
        top:posy.toString()+'px'
    },{duration:500,fill:"forwards"});
})


const images = document.querySelectorAll('.image');

// popup

const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-btn');
const imageName = document.querySelector('.image-name');
const largeImage = document.querySelector('.large-image');
const imageIndex = document.querySelector('.index');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let index = 0; // will track our current image;

images.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImage(i);
        popup.classList.toggle('active');
    })
})

const updateImage = (i) => {
    let path = images[i].src;
    largeImage.src = path;
    index = i;
}

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
})

leftArrow.addEventListener('click', () => {
    if(index > 0){
        updateImage(index - 1);
    }
})

rightArrow.addEventListener('click', () => {
    if(index < images.length - 1){
        updateImage(index + 1);
    }
})