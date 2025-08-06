// Israels portfolio homePage alpha 1.0
//custom reel particles

//init particles
let num = 2000;
let noiseScale=800, noiseStrength=1.8;
let particles = [num];
let isd = 0;

//toggle

// start stats
let stats;

//angelCache
let angleCache = [];
let maskGrid = [];

//graphics
let msgp;
let txtgp; 

//buttons
let btnReel, btnWork, btnProjects, btnContact;
let hoverText = ''; 

function setup() {
  //pixel density from screen
  pixelDensity();
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('p5-container');

  msgp = createGraphics(windowWidth, windowHeight);
  txtgp = createGraphics(windowWidth, windowHeight);

  //force PD for match screensize
  //ngp.pixelDensity(1);
  background(80);

  //run buttons
  btnReel     = select('#btn-reel');
  btnWork     = select('#btn-work');
  btnProjects = select('#btn-projects');
  btnContact  = select('#btn-contact');
  
  
  //detect over buttons
  btnReel.mouseOver(()  => hoverText = "REEL");
  btnReel.mouseOut(()   => hoverText = "");

  btnWork.mouseOver(()  => hoverText = 'WORK');
  btnWork.mouseOut(()   => hoverText = "");

  btnProjects.mouseOver(()  => hoverText = 'BLOG');
  btnProjects.mouseOut(()   => hoverText = "");

  btnContact.mouseOver(()   => hoverText = 'CONTACT');
  btnContact.mouseOut(()    => hoverText = "");

  


  //particles
  //x value start slightly outside the right of canvas, z value how close to viewer
  for (let i=0; i<num; i++) {
    var loc = createVector(random(width*1.2), random(height), 2);
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5,1);
    isd =0;
    particles[i]= new Particle(loc, dir, speed);
  }
  
  //runstats
  //runStats();
  background(30);
}

function draw() {
  //stats.begin();

  //BACKGROUND
  background(10, 11, 13, 4);

  //image(msgp,0,0);
  txtmask() 
  noStroke();
  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }
   
  //draw text
  //messgp();

  //stats.end();
  //main text
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  txtgp.resizeCanvas(windowWidth, windowHeight);
  msgp.resizeCanvas(windowWidth, windowHeight);
}

function txtmask(){
  txtgp.textFont('Inter');
 
  txtgp.background(255);
  txtgp.fill(0);
  txtgp.textAlign(CENTER, CENTER);
  txtgp.textSize(200);
  txtgp.text(hoverText, windowWidth/2, windowHeight/2);
}

class Particle{
  constructor(_loc,_dir,_speed,_isd){
    this.loc = _loc;
    this.dir = _dir;
    this.isd = _isd;
    this.speed = _speed;
  	// var col;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }

  move(){
    //inside mask detect
    let tColor = txtgp.get(this.loc.x,this.loc.y);
    if (tColor[0] < 128) {
      this.loc.add(p5.Vector.random2D().mult(1.5)); // Empujón aleatorio
      this.isd = 1;
      return;
    }
    
    //move
    let angle=noise((this.loc.x/noiseScale), (this.loc.y/noiseScale), frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
 
    var d =1;  //direction change 
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
    this.isd = 0;
  }


  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>windowWidth || this.loc.y<0 || this.loc.y>windowHeight) {    
      this.loc.x = random(windowWidth*1.2);
      this.loc.y = random(windowHeight);
    }
  }


  update(){
    if(this.isd == 0){
      fill("#244CE4");
    }else{fill("#FFC759")}
    
    ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
}

function messgp(){
  msgp.clear();
  msgp.textFont('Inter');
  msgp.fill(255);
  msgp.textAlign(CENTER, CENTER);
  msgp.textSize(15);
  msgp.text("Building Something Cool...", windowWidth/2, windowHeight/1.6);
  msgp.textSize(11.4);
  msgp.text("Made by Israel Paucar | VFX artist", windowWidth/2, windowHeight/1.645);
}

function runStats(){
// Inicialización de stats.js
      stats = new Stats();
      stats.showPanel(0); // 0: FPS
      stats.dom.style.position = 'absolute';
      stats.dom.style.left = '0px';
      stats.dom.style.top  = '0px';
      document.body.appendChild(stats.dom);
}

window.p5Instance = this;