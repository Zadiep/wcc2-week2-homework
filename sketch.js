let f = 0.0;
let space;
let numOfGrids;
let k = 0;
let r = 5;
let p;
let lineAmount;
let length = 10;
//
let canvas;
let buttonRed;
let buttonAdd;
let sliderR;
let sliderG;
let sliderB;
let sliderA;
let lineColor;
let amountMax;

function setup() {
  //canvas
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
  // createCanvas(800, 800);

  numOfGrids = 2;
  if(windowWidth < 700){
    space = width / numOfGrids;
  }
  else{
    space = height / numOfGrids;
  }
  noFill();
  // background(noise(1)*255,noise(1)*255,noise(1)*255,2);


  //addGUI
  rectMode(CENTER);
  addGUI();

  //windowResized();

  lineColor = color(0,0,0,60);
  amountMax = 10;
}

function draw() {
  push();
  let R = 'Red Value';
  let G = 'Green Value';
  let B = 'Blue Value';
  let A = 'Alpha Value'
  let I = 'Clike Button to change the amount of circle'
  fill(155);
  let textS = width/50;
  let textSpace = width/16;
  textSize(textS);
  text(R, 250, height-textSpace*5); 
  text(G, 250, height-textSpace*4); 
  text(B, 250, height-textSpace*3); 
  text(A, 250, height-textSpace*2); 
  text(I, 250, height-textSpace); 
  pop();

  push();
  translate(width/2,height/2);
 
  for (let i=0; i<numOfGrids; i++){
    background(noise(i)*255,noise(i)*255,noise(i)*255,2);
    for(let j=0; j<numOfGrids; j++){
      push();
      //draw eye
        drawEye();
      //
      drawGrids(i+1,j+1);
      drawLine(i+1,j+1);
      pop();

    }
  }

  f+=0.01;
  pop();



}


function drawEye(){
  push();
  fill(255,0,0,200);
  ellipse(0,0,30,16);
  fill(255,0,0,100);
  ellipse(0,0,60,32);
  noStroke();
  fill(255,255,255);
  ellipse(0,0,6,12);
  pop();
}

function drawGrids(i,j)
{
    for(k=0;k<40;k++){
      strokeWeight(noise(0,10));
      for(let amount=0; amount<amountMax; amount++) {
        stroke(noise(i)*255,noise(j)*255,noise(k)*255,255);
        ellipse(i,j,(space*1.2) * noise(r + (amount*50))+20,(space*1.2) * noise(r + (amount*50))+20)
    
      }
      r+=0.00001;  
    }

}

function drawLine(i,j)
{
    
    for(lineAmount=1;lineAmount<10;lineAmount++){
      lineColor = color(sliderR.value(),sliderG.value(),sliderB.value(),sliderA.value());
      stroke(lineColor);
      strokeWeight(0.5);
      push();
      translate(mouseX,mouseY);
      rotate(radians(0,360));
      beginShape();
      for (let h = 1; h<10; h++){
        vertex(noise(h*j,i+f)*space*0.5-space/2, noise(i,j*h +f)*space*0.5-space/2);
      }
      endShape();
      pop();

  }
  
}

function addGUI()
{
  //add a slider
  sliderR = createSlider(0, 255, 100);
  sliderG = createSlider(0, 255, 100);
  sliderB = createSlider(0, 255, 100);
  sliderA = createSlider(0, 255, 100);
  
  sliderR.addClass("slider");
  sliderG.addClass("slider");
  sliderB.addClass("slider");
  sliderA.addClass("slider");
  //Add the slider to the parent gui HTML element
  sliderR.parent("gui-container");
  sliderG.parent("gui-container");
  sliderB.parent("gui-container");
  sliderA.parent("gui-container");

  //add a button

      buttonRed = createButton("Reduce a Circle");
      buttonAdd = createButton("Add a Circle");


  buttonRed.addClass("button");
  buttonAdd.addClass("button");

  //Add the play button to the parent gui HTML element
  buttonRed.parent("gui-container");
  buttonAdd.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  buttonRed.mousePressed(reduceCircle); 
  buttonAdd.mousePressed(addCircle)

}

function reduceCircle()
{
  background(255);
  amountMax -=1;
}

function addCircle()

{
  background(255);
  amountMax+=1;
}


function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  if(windowWidth < 700){
    space = width / numOfGrids;
  }
  else{
    space = height / numOfGrids;
  }
}