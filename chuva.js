
    class Rain{
        constructor(width,height,direction,posX,posY,speed,color){
             this.width = width;
             this.height = height;
             this.direction = direction;
             this.posX = posX;
             this.posY = posY;
             this.speed = speed;
             this.color = color;
        }

        move(){
                this.posX += Math.sin(this.direction * Math.PI/2) * this.speed;
                this.posY += Math.cos(this.direction * Math.PI/2) * this.speed; 
    
            }

        draw(){
            canvasContext.rotate(-this.direction);
            canvasContext.fillStyle=this.color;
            canvasContext.fillRect(this.posX,this.posY,this.width,this.height);
            canvasContext.rotate(this.direction);
        }
    }


let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");

let creatRect = (x,y,height,color) =>{
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,height);
}

let allRains=[];
let defaultRainWidth=1;
let defaltRainHeight=20;

let maximumRainCount = 500;
let maximunRainInicializationInOneFrame = 30;

let fps = 60;

let gameLoop = ()=>  {
    setInterval(show,1000/fps);

}

let show =()=>{
    update();
    draw();
}

let draw = ()=>{

    allRains.forEach(rain =>{
        rain.draw();
    } )

}

let update =()=>{
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    let rainInitCountInOneFrame = 0;
    
    while(allRains.length < maximumRainCount && maximunRainInicializationInOneFrame > rainInitCountInOneFrame){
            let distanceFromCam = Math.random();
            
            let rain = new Rain(defaultRainWidth * (2 - distanceFromCam), //width
            defaltRainHeight * (2-distanceFromCam), // height
            Math.random()/10, //direction 
            Math.random() * canvas.width , //position X
            -50,//position Y
            (2-distanceFromCam)*5, //speed
            "rgba(100,55,255,"+ (1-distanceFromCam) +")"); // color rgba(197,55,230,"+ (1-distanceFromCam) +")

            allRains.push(rain);
            rainInitCountInOneFrame++;
    }

    for(let i = 0 ; i < allRains.length;i++){
        allRains[i].move();
        if(allRains[i].posY > canvas.height || allRains.posX > canvas.width){
            allRains.splice(i,1);
        }
    }

}

gameLoop();