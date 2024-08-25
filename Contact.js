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