let incBpm = 0;
let incBpm2 = 0;
let incGsr = 0;
let slider;

let offDominance = 0;
let offArousal = 0;
let offValence = 0;

let offDominanceNeutral;
let offArousalNeutral;
let offValenceNeutral;

let offDominanceHappy;
let offArousalHappy;
let offValenceHappy;

let offDominanceSad;
let offArousalSad;
let offValenceSad;

let offDominanceAngry;
let offArousalAngry;
let offValenceAngry;

let offDominanceSurprised;
let offArousalSurprised;
let offValenceSurprised;

let offDominanceDisgusted;
let offArousalDisgusted;
let offValenceDisgusted;

let offDominanceFearful;
let offArousalFearful;
let offValenceFearful;

let dominanceValue = "0.00";
let arousalValue = "0.00";
let valenceValue = "0.00";

// dichiaro variabili dei valori delle emozioni
let happyValue;
let surprisedValue;
let neutralValue;
let sadValue;
let angryValue;
let fearfulValue;
let disgustedValue;
let maxValue;

//dichiaro contatore treshold emozione
let count = 0;

//barra
var barWidth = 0;
let barPercent;
let barPercent2;

let barPercent0;

var barWidth0 = 0;

//dichiaro colori emozioni
let triFill;
let triStroke;

//dichiaro valore massimo della mappa del noise che fa cambiare la maschera in base all'emozioni
let maxMap = 50;
let t = 0;
let vel = 0.1;
let t2 = 10;
//dichiaro variabili per scalare la maschera
let d;
let sf;

//dichiaro variabili per il particle
var particles;
var numParticles = 150;
var distance;
var particleV;
var limit;

//variabile testo emozione
let emo;

//contatore tempo emozioni
let countHappy = 0;
let countSad = 0;
let countSurprised = 0;
let countAngry = 0;
let countFearful = 0;
let countDisgusted = 0;
let countNeutral = 0;
let countTotal;
let jsarray = [];

// si scelgono il numero dei punti necessari per visualizzare la maschera dagli Array del file landmarks.js

// === bare minimum 7 points ===
// var VTX = VTX7;

// === important facial feature 33 points ===
// var VTX = VTX33;

// === standard facial landmark 68 points ===
// var VTX = VTX68;

// === full facemesh 468 points ===
var VTX = VTX468;


// select the right triangulation based on vertices
var TRI;
// if (VTX == VTX7) {
//   TRI = TRI7;
// } else if (VTX == VTX33) {
//   TRI = TRI33;
// } else if (VTX == VTX68) {
//   TRI = TRI68;
// } else if  {
//   TRI = TRI468;
// }

//array di punti per disegnare la maschera
var triPie;



var facemeshModel = null; // this will be loaded with the facemesh model
// WARNING: do NOT call it 'model', because p5 already has something called 'model'
var videoDataLoaded = false; // is webcam capture ready?
var myFaces = []; // faces detected in this browser
// currently facemesh only supports single face, so this will be either empty or singleton

var capture; // webcam capture, managed by p5.
const maxFaces = 1;

// variabile per l'elemento video
let videoEmotion;
// dimensioni video e canvas
const feedWidth = 1480;
const feedHeight = 650;

let maskOffset = {
  x: 0,
  y: 0
}

let maskDim = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
}

document.body.addEventListener("mousemove", function(event) {
    var positionX = event.clientX;
    var positionY = event.clientY;
    var obj = document.getElementById("copriData");
    console.log(positionX);
    if (positionY>500 && positionX<768){
      obj.setAttribute("style", "visibility: visible; opacity: 0.9;");
    }
    else{
      obj.setAttribute("style", "visibility: hidden; opacity: 0;");
    }
});

// Load the MediaPipe facemesh model assets.
facemesh.load({ maxFaces: maxFaces }).then(function (_model) {
  console.log("model initialized.");
  facemeshModel = _model;
})

function setup() {

  // crea il canvas dove verrà disegnata la maschera
  let cnv = createCanvas(feedWidth, feedHeight);
  cnv.parent("mask-container");

  //inizializzo il particle
  particles = [];
  //variabili per disegnare triangoli in base alla distanza
  minDistance = 10;
  maxDistance = 80;
  minDistance2 = 70;
  maxDistance2 = 85;

  //colore dei triangoli
  triFill = color(248,162,33,60);
  triStroke = color(248,162,33,80);

  //colori delle emozioni
  neutralFill = color(110,113,123,60);
  neutralStroke = color(110,113,123,80);

  happyFill = color(248,162,33,60);
  happyStroke = color(248,162,33,80);

  sadFill = color(13,69,152,60);
  sadStroke = color(13,69,152,80);

  angryFill = color(234,27,27,60);
  angryStroke = color(234,27,27,80);

  surprisedFill = color(13,191,246,60);
  surprisedStroke = color(13,191,246,80);

  disgustedFill = color(9,184,121,60);
  disgustedStroke = color(9,184,121,80);

  fearfulFill = color(122,73,200,60);
  fearfulStroke = color(122,73,200,80);

  //variabili modello DAV
  offDominanceHappy = map(0.35,-1,1,0,70);
  offArousalHappy = map(0.48,-1,1,0,70);
  offValenceHappy = map(0.76,-1,1,0,70);

  offDominanceSad = map(-0.33,-1,1,0,70);
  offArousalSad = map(0.27,-1,1,0,70);
  offValenceSad = map(-0.63,-1,1,0,70);

  offDominanceAngry = map(0.34,-1,1,0,70);
  offArousalAngry = map(0.67,-1,1,0,70);
  offValenceAngry = map(-0.43,-1,1,0,70);

  offDominanceSurprised = map(-0.13,-1,1,0,70);
  offArousalSurprised = map(0.67,-1,1,0,70);
  offValenceSurprised = map(0.40,-1,1,0,70);

  offDominanceDisgusted = map(0.11,-1,1,0,70);
  offArousalDisgusted = map(0.35,-1,1,0,70);
  offValenceDisgusted = map(-0.64,-1,1,0,70);

  offDominanceFearful = map(-0.43,-1,1,0,70);
  offArousalFearful = map(0.60,-1,1,0,70);
  offValenceFearful = map(-0.64,-1,1,0,70);

  //creo il particle
  for (var i = 0; i < numParticles; i++) {
    var newParticle = new Particle();
    particles.push(newParticle);
  }

  // prendi il feed della webcam e mettila in un elemento video
  capture = createCapture(VIDEO);
  capture.parent('video-container');
  capture.id('video');

  // salva in memoria l'elemento video così che faceapi ci legga dentro le emozioni
  videoEmotion = document.getElementById('video');

  // caricamento modelli libreria face.api (emotion recognition), quando sono caricati, inizia a leggere le emozioni
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('https://simoneinverardi.github.io/models'),
    faceapi.nets.faceExpressionNet.loadFromUri(' https://simoneinverardi.github.io/models')
  ]).then(startEmotionTracking);

  // this is to make sure the capture is loaded before asking facemesh to take a look
  // otherwise facemesh will be very unhappy
  capture.elt.onloadeddata = function () {
    console.log("video initialized");
    videoDataLoaded = true;
  }

}

//video dell'emotion recognition
function startEmotionTracking() {

  //necessario per l'emotion recognition
  videoEmotion.addEventListener('play', () => {
    console.log('starting reading emotions');
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoEmotion, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
      // caricamento variabili con i valori attuali delle varie emozioni, salvale solo se l'algoritmo trova una faccia
      if (detections[0]) {
        happyValue = detections[0].expressions.happy;
        surprisedValue = detections[0].expressions.surprised;
        neutralValue = detections[0].expressions.neutral;
        sadValue = detections[0].expressions.sad;
        angryValue = detections[0].expressions.angry;
        fearfulValue = detections[0].expressions.fearful;
        disgustedValue = detections[0].expressions.disgusted;
      }

    }, 100)
  })
}

// mesh3D
// draw a face object returned by facemesh
function drawFaces(faces, filled) {


  // for necessari per disegnare la maschera
  for (var i = 0; i < faces.length; i++) {
    const keypoints = faces[i].scaledMesh;

    //calcolo distanza fra due punti della maschera per scalarla in seguito
    for (var j = 0; j < keypoints.length; j++) {
      let [x, y, z] = keypoints[j];

      let x1 = keypoints[234][0];
      let y1 = keypoints[234][1];
      let z1 = keypoints[234][2];
      let x2 = keypoints[454][0];
      let y2 = keypoints[454][1];
      let z2 = keypoints[454][2];
      d = dist(x1,y1,z1,x2,y2,z2);
    }

    //disegno la maschera
    for (var j = 0; j < triPie.length; j += 3) {
      var a = keypoints[triPie[j]];
      var b = keypoints[triPie[j+1]];
      var c = keypoints[triPie[j+2]];

      let n=noise( j, t);
      n = map(n,0,1,-maxMap,maxMap);
      t += vel

      let n2=noise( j, t2);
      n2 = map(n2,0,1,-6,6);
      t2 += 0.001;

      push()
      fill(triFill);

      strokeWeight(0);
      stroke(255,90);
      triangle(
        a[0]+n2+n,a[1],
        b[0]-n2-n,b[1],
        c[0]+n2+n,c[1],
      )
      pop()
    }

  }
}

function drawFaces2(faces, filled) {



  // for necessari per disegnare la maschera
  for (var i = 0; i < faces.length; i++) {
    const keypoints = faces[i].scaledMesh;

    //disegno la maschera
    for (var j = 0; j < triPie.length; j += 3) {
      var a = keypoints[triPie[j]];
      var b = keypoints[triPie[j+1]];
      var c = keypoints[triPie[j+2]];

      let n=noise( j, t);
      n = map(n,0,1,-maxMap,maxMap);
      t += vel

      push()
      noFill();
      stroke(triStroke);
      triangle(
        a[0]+n,a[1],
        b[0]-n,b[1],
        c[0]+n,c[1]
      )
      pop()


    }
  }
}

//necessario al disegno della maschera
// reduces the number of keypoints to the desired set
// (VTX7, VTX33, VTX68, etc.)
function packFace(face, set) {
  var ret = {
    scaledMesh: [],
  }
  for (var i = 0; i < set.length; i++) {
    var j = set[i];
    ret.scaledMesh[i] = [
      face.scaledMesh[j][0],
      face.scaledMesh[j][1],
      face.scaledMesh[j][2],
    ]
  }
  return ret;
}

function draw() {

  // riguarda la mesh3D
  strokeJoin(ROUND); //otherwise super gnarly

  if (facemeshModel && videoDataLoaded) { // model and video both loaded,

    facemeshModel.estimateFaces(capture.elt).then(function (_faces) {
      // we're faceling an async promise
      // best to avoid drawing something here! it might produce weird results due to racing
      if (_faces[0]) {
        // prendi le coordinate del bounding-box per poi poter calcolare l'offset per entrare la maschera
        const [maskX0, maskY0] = _faces[0].boundingBox.topLeft[0];
        const [maskX1, maskY1] = _faces[0].boundingBox.bottomRight[0];
        // salva le dimensioni in un oggetto per in caso disegnarle dopo
        maskDim.x = maskX0;
        maskDim.y = maskY0;
        maskDim.width = maskX1 - maskX0;
        maskDim.height = maskY1 - maskY0;

        // calcola di quanto devi traslare la maschera per tenerla nell'origine
        maskOffset.x = (maskDim.x + maskDim.width / 2  ) * -1;
        maskOffset.y = (maskDim.y  + maskDim.height / 2  ) * -1 ;
      }

      myFaces = _faces.map(x => packFace(x, VTX)); // update the global myFaces object with the detected faces
      // console.log(_faces);
    })
  }

  background(255);

  /*---------------------------datiVAD--------------------------*/

  push();
  strokeWeight(1);
  stroke(0,100,251);
  translate(width/4-260,450);
  line(0,0,12,12);
  line(9,0,21,12);
  line(18,0,30,12);
  line(27,0,39,12);
  pop();

  push();
  strokeWeight(1);
  stroke(0,100,251);
  noFill();
  translate(width/4-260,480);
  beginShape();
  vertex(0,6);
  vertex(8,6);
  vertex(14,0);
  vertex(26,12);
  vertex(32,6);
  vertex(40,6);
  endShape();
  pop();

//bpm
  push()
  translate(width/4-260,480);
  noStroke();
  fill(255,255,255,150)
  rect(0,-5,40,20);
  pop()

  incBpm+=2;
  if (incBpm>=80){
    incBpm=0
  }
  else if(incBpm>=40){
    incBpm2+=2
  }
  else if (incBpm2>=40){
    incBpm2=0
  }

  push()
  translate(width/4-260-40,480);
  noStroke();
  fill(255,255,255,150)
  rect(0,-5,40,20);
  pop()

//gsr
  push()
  // console.log(incGsr);
  translate(width/4-260+incGsr,450);
  noStroke();
  fill(255,255,255,150)
  rect(0,-5,40,20);
  pop()


  push();
  translate(width/4,590);
  polygonTri(70);
  polygonTriBlu(60);
  // polygonTriGrey(40);
  fill(49,49,50);
  noStroke();
  textFont("Scope");
  textAlign(CENTER,BOTTOM);
  text("D",0,-72);
  textAlign(RIGHT,CENTER);
  text("A",-65,40);
  textAlign(LEFT,CENTER);
  text("V",65,40);
  pop();

  noStroke();

  //user1
  textSize(14);
  fill(49,49,50);
  textAlign(CENTER,TOP);
  textFont("Telegraf");
  text("Guest", width/4-318,510);
  text("User", width/4+318,510);

  textAlign(LEFT,TOP);
  textFont("Scope");
  text("conductance --non rilevato--",width/4-200,450);
  text("heart rate --non rilevato--",width/4-200,480);

  text("dominance",width/4-200,550);
  text("valence",width/4-200,580);
  text("arousal",width/4-200,610);

  textAlign(RIGHT,TOP);
  text(dominanceValue,width/4-308,550);
  text(valenceValue,width/4-308,580);
  text(arousalValue,width/4-308,610);

  textSize(16);
  fill(0,100,251);
  text("(D)",width/4-230,550);
  text("(V)",width/4-230,580);
  text("(A)",width/4-230,610);

  //user2
  textAlign(RIGHT,TOP);
  textSize(14);
  fill(49,49,50);
  text("--non rilevato-- conductance",width/4+200,450);
  text("--non rilevato-- heart rate",width/4+200,480);

  text("dominance",width/4+200,550);
  text("valence",width/4+200,580);
  text("arousal",width/4+200,610);

  textAlign(CENTER,TOP);
  text("+0.35",width/4+318,550);
  text("+0.76",width/4+318,580);
  text("+0.48",width/4+318,610);

  textSize(16);
  fill(49,49,50);
  text("(D)",width/4+230,550);
  text("(V)",width/4+230,580);
  text("(A)",width/4+230,610);

  push();
  strokeWeight(1);
  stroke(100,113,123);
  translate(width/4+224,450);
  line(0,0,12,12);
  line(9,0,21,12);
  line(18,0,30,12);
  line(27,0,39,12);
  pop();

  push();
  strokeWeight(1);
  stroke(100,113,123);
  noFill();
  translate(width/4+224,480);
  beginShape();
  vertex(0,6);
  vertex(8,6);
  vertex(14,0);
  vertex(26,12);
  vertex(32,6);
  vertex(40,6);
  endShape();
  pop();

  /*---------------------------maximum emotion--------------------------*/

  maxValue = Math.max(happyValue, surprisedValue, neutralValue, sadValue, angryValue, fearfulValue, disgustedValue);


  //serie di push() pop() per ordinare le trasformazioni
  push();
  //traslo la maschera al centro
  translate(width/2+370,(height/2)-70);
  //calcolo di quanto devo scalare la maschera per tenerla della stessa dimensione
  sf=360/d;
  scale(-sf,sf);
  push();
  //trasformazioni per centrare la maschera nell'origine
  translate(maskOffset.x, maskOffset.y);
  //modifico strokeWeight in base a quanto devo scalare la maschera
  strokeWeight(1/sf);
  drawFaces(myFaces);
  drawFaces2(myFaces);
  pop();
  pop();

  //disegno il particle ed i triangoli basati sulla distanza
  for (var i = 0; i < numParticles; i++) {
    particles[i].update();
    //particles[i].show();

    beginShape(TRIANGLES);
    vertex(particles[i].pos.x, particles[i].pos.y);
    for (var j = i + 1; j < numParticles; j++) {
      if (dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y) > minDistance
      && dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y) < maxDistance ) {
        vertex(particles[j].pos.x, particles[j].pos.y);
      }
      stroke(triStroke);
      fill(triFill);
    }
    endShape();

    beginShape(TRIANGLES);
    vertex(particles[i].pos.x, particles[i].pos.y);
    for (var j = i + 1; j < numParticles; j++) {
      if (dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y) > minDistance2
      && dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y) < maxDistance2 ) {
        vertex(particles[j].pos.x, particles[j].pos.y);
      }
      stroke(triStroke);
      noFill();
    }
    endShape();
  }

  push();
  noFill();
  stroke(0,100,251);
  strokeWeight(1);
  translate(width/2+370,560)
  beginShape();
  vertex(-194,-42);
  vertex(-214,-22);
  vertex(-214,32);
  vertex(-194,52);
  endShape();
  beginShape();
  vertex(194,-42);
  vertex(214,-22);
  vertex(214,32);
  vertex(194,52);
  endShape();
  pop();

  push();
  noStroke();
  fill(triStroke);
  textAlign(CENTER,CENTER);
  textSize(48);
  textFont("Neue Machina")
  text(emo,width/2+370,570);
  pop();

  //dichiaro funzione per cambiare variabili in base all'emozione
  checkEmo();


  //loadingPage
  if (barWidth0<30){
    barWidth0++;
  }
  else if(barWidth0>=30){
    barWidth0 = barWidth0;
  }


  //barra di caricamento
  if (barWidth<3600){
    barWidth++;
  }
  else if(barWidth>=3600){
    barWidth = barWidth;
  }
  // console.log(barWidth);
  barPercent = map(barWidth,0,3600,0,100);
  barPercent2 = nfc(barPercent,0);

  barPercent0 = map(barWidth0,0,30,0,100); //loadingPage
  if(barPercent0==10){
    document.getElementById("textLoad").innerHTML = "Inizializzazione script...";
  }
  if(barPercent0==50){
    document.getElementById("textLoad").innerHTML = "Calibrazione sensori...";
  }
  if(barPercent0==70){
    document.getElementById("textLoad").innerHTML = "Caricamento emozioni...";
  }

  let root = document.documentElement;
  root.style.setProperty('--barWidth0', barPercent0 + '%'); //loadingPage
}

function arrow(){
    window.location.href='output.html';
}

/*------------------------------datiVAD---------------------------*/
function polygonTri(minRadius) {
  push();
  rotate(-PI/2);
  noFill();
  strokeWeight(1);
  stroke(49,49,50);
  beginShape();
  let alpha = 0;
  let sx1 = cos(alpha) * minRadius;
  let sy1 = sin(alpha) * minRadius;
  vertex(sx1,sy1);
  let beta = -PI*2/3;
  let sx2 = cos(beta) * minRadius;
  let sy2 = sin(beta) * minRadius;
  vertex(sx2,sy2);
  let gamma = PI*2/3;
  let sx3 = cos(gamma) * minRadius;
  let sy3 = sin(gamma) * minRadius;
  vertex(sx3,sy3);

  line(0,0,sx1,sy1);
  line(0,0,sx2,sy2);
  line(0,0,sx3,sy3);

  endShape(CLOSE);
  pop();
}

function polygonTriGrey(minRadius) {
  push();
  rotate(-PI/2);
  fill(110,113,123,50);
  stroke(110,113,123);
  strokeWeight(1);
  beginShape();
  let alpha = 0;
  let sx1 = cos(alpha) * (minRadius + 5);
  let sy1 = sin(alpha) * (minRadius + 5);
  vertex(sx1,sy1);
  let beta = -PI*2/3;
  let sx2 = cos(beta) * (minRadius -5) ;
  let sy2 = sin(beta) * (minRadius -5) ;
  vertex(sx2,sy2);
  let gamma = PI*2/3;
  let sx3 = cos(gamma) * (minRadius + 15);
  let sy3 = sin(gamma) * (minRadius + 15);
  vertex(sx3,sy3);
  endShape(CLOSE);
  pop();
}

function polygonTriBlu(minRadius) {
  push();
  rotate(-PI/2);
  fill(0,100,251,50);
  stroke(0,100,251);
  strokeWeight(1);
  beginShape();
  let alpha = 0;
  let sx1 = cos(alpha) * offDominance;
  let sy1 = sin(alpha) * offDominance;
  vertex(sx1,sy1);
  let beta = -PI*2/3;
  let sx2 = cos(beta) * offArousal;
  let sy2 = sin(beta) * offArousal;
  vertex(sx2,sy2);
  let gamma = PI*2/3;
  let sx3 = cos(gamma) * offValence;
  let sy3 = sin(gamma) * offValence;
  vertex(sx3,sy3);
  endShape(CLOSE);
  pop();
}

/*------------------------------neutral emotion---------------------------*/
function neutralFunction(){
  emo="NEUTRO"

  maxMap=0;

  //triangoli senza fill
  minDistance --;
  maxDistance --;
  if(minDistance<=0){
    minDistance=0;
    maxDistance=0;
  }
  triStroke = color(110,113,123,80);

  //triangoli con fill
  minDistance2 --;
  maxDistance2 --;
  if(minDistance2<=0){
    minDistance2=0;
    maxDistance2=0;
  }
  triFill = color(110,113,123,20);

  numParticles-=5;
  if (numParticles<=0){
    numParticles = 0;
  }

  particleV = 1;
  limit = 2;

}

function checkEmo(){

  //loadingPage
  if (maxValue==neutralValue||maxValue==happyValue||maxValue==surprisedValue||maxValue==angryValue||maxValue==disgustedValue||maxValue==fearfulValue){
    if(barPercent0==100){
      var loading = document.getElementById("loadingPage");
      loading.setAttribute("style", "visibility:hidden; opacity:0");
    }
  }

  if (maxValue==neutralValue){
    count = 0; //contatore per non far cambiare emozioni troppo velocemente mentre si parla
    neutralFunction()

  }

  /*------------------------------happy emotion---------------------------*/
  else if (maxValue==happyValue){
    count++; //incremento il contatore ed imposto un limite

    //incrementi Dominance
    if (offDominance < offDominanceHappy){
      offDominance+=2;
      if (offDominance>=offDominanceHappy){
        offDominance = offDominanceHappy;
      }
    }
    else if (offDominance > offDominanceHappy){
      offDominance-=2;
      if (offDominance<=offDominanceHappy){
        offDominance = offDominanceHappy;
      }
    }

    //incrementi Arousal
    if (offArousal < offArousalHappy){
      offArousal+=2;
      if (offArousal>=offArousalHappy){
        offArousal = offArousalHappy;
      }
    }
    else if (offArousal > offArousalHappy){
      offArousal-=2;
      if (offArousal<=offArousalHappy){
        offArousal = offArousalHappy;
      }
    }

    //incrementi Valence
    if (offValence < offValenceHappy){
      offValence+=2;
      if (offValence>=offValenceHappy){
        offValence = offValenceHappy;
      }
    }
    else if (offValence > offValenceHappy){
      offValence-=2;
      if (offValence<=offValenceHappy){
        offValence = offValenceHappy;
      }
    }

    dominanceValue = "+0.35";
    valenceValue = "+0.76";
    arousalValue = "+0.48";

    if(count>=10){
      emo="GIOIA"
      countHappy++;

      maxMap=0;

      //triangoli senza fill
      minDistance = 40;
      maxDistance = 80;
      triStroke = lerpColor(neutralStroke,happyStroke,count/20);

      //triangoli con fill
      minDistance2 = 70;
      maxDistance2 = 90;
      triFill = lerpColor(neutralFill,happyFill,count/20);

      numParticles+=5;
      if (numParticles>=40){
        numParticles = 40;
      }

      particleV=10;
      limit = 5;

    }
    else {
      neutralFunction();
    }
  }

  /*------------------------------sad emotion---------------------------*/
  else if (maxValue==sadValue){
    count++;

    //incrementi Dominance
    if (offDominance < offDominanceSad){
      offDominance+=2;
      if (offDominance>=offDominanceSad){
        offDominance = offDominanceSad;
      }
    }
    else if (offDominance > offDominanceSad){
      offDominance-=2;
      if (offDominance<=offDominanceSad){
        offDominance = offDominanceSad;
      }
    }

    //incrementi Arousal
    if (offArousal < offArousalSad){
      offArousal+=2;
      if (offArousal>=offArousalSad){
        offArousal = offArousalSad;
      }
    }
    else if (offArousal > offArousalSad){
      offArousal-=2;
      if (offArousal<=offArousalSad){
        offArousal = offArousalSad;
      }
    }

    //incrementi Valence
    if (offValence < offValenceSad){
      offValence+=2;
      if (offValence>=offValenceSad){
        offValence = offValenceSad;
      }
    }
    else if (offValence > offValenceSad){
      offValence-=2;
      if (offValence<=offValenceSad){
        offValence = offValenceSad;
      }
    }

    dominanceValue = "-0.33";
    valenceValue = "-0.63";
    arousalValue = "+0.27";

    if(count>=10){
      emo="TRISTEZZA"
      countSad++;

      maxMap=0;

      //triangoli senza fill
      minDistance = 100;
      maxDistance = 150;
      triStroke = lerpColor(neutralStroke,sadStroke,count/20);

      //triangoli con fill
      minDistance2 = 120;
      maxDistance2 = 170;
      triFill = lerpColor(neutralFill,sadFill,count/20);


      numParticles++;
      if (numParticles>=15){
        numParticles = 15;
      }

      particleV = 1;
      limit = 1;

    }
    else {
      neutralFunction();
    }
  }

  /*------------------------------angry emotion---------------------------*/
  else if (maxValue==angryValue){
    count++;

    //incrementi Dominance
    if (offDominance < offDominanceAngry){
      offDominance+=2;
      if (offDominance>=offDominanceAngry){
        offDominance = offDominanceAngry;
      }
    }
    else if (offDominance > offDominanceAngry){
      offDominance-=2;
      if (offDominance<=offDominanceAngry){
        offDominance = offDominanceAngry;
      }
    }

    //incrementi Arousal
    if (offArousal < offArousalAngry){
      offArousal+=2;
      if (offArousal>=offArousalAngry){
        offArousal = offArousalAngry;
      }
    }
    else if (offArousal > offArousalAngry){
      offArousal-=2;
      if (offArousal<=offArousalAngry){
        offArousal = offArousalAngry;
      }
    }

    //incrementi Valence
    if (offValence < offValenceAngry){
      offValence+=2;
      if (offValence>=offValenceAngry){
        offValence = offValenceAngry;
      }
    }
    else if (offValence > offValenceAngry){
      offValence-=2;
      if (offValence<=offValenceAngry){
        offValence = offValenceAngry;
      }
    }

    dominanceValue = "+0.34";
    valenceValue = "-0.43";
    arousalValue = "+0.67";

    if(count>=10){
      emo="RABBIA"
      countAngry++;

      maxMap +=2;
      if(maxMap>=20){
        maxMap=20;}
        vel=1;

        //triangoli senza fill
        minDistance = 10;
        maxDistance = 50;
        triStroke = lerpColor(neutralStroke,angryStroke,count/20);

        //triangoli con fill
        minDistance2 = 50;
        maxDistance2 = 60;
        triFill = lerpColor(neutralFill,angryFill,count/20);

        numParticles+=100;
        if (numParticles>=150){
          numParticles = 150;
        }

        particleV = 20;
        limit = 10;

      }
      else {
        neutralFunction();
      }
    }

    /*------------------------------surprised emotion---------------------------*/
    else if (maxValue==surprisedValue){
      count++;

      //incrementi Dominance
      if (offDominance < offDominanceSurprised){
        offDominance+=2;
        if (offDominance>=offDominanceSurprised){
          offDominance = offDominanceSurprised;
        }
      }
      else if (offDominance > offDominanceSurprised){
        offDominance-=2;
        if (offDominance<=offDominanceSurprised){
          offDominance = offDominanceSurprised;
        }
      }

      //incrementi Arousal
      if (offArousal < offArousalSurprised){
        offArousal+=2;
        if (offArousal>=offArousalSurprised){
          offArousal = offArousalSurprised;
        }
      }
      else if (offArousal > offArousalSurprised){
        offArousal-=2;
        if (offArousal<=offArousalSurprised){
          offArousal = offArousalSurprised;
        }
      }

      //incrementi Valence
      if (offValence < offValenceSurprised){
        offValence+=2;
        if (offValence>=offValenceSurprised){
          offValence = offValenceSurprised;
        }
      }
      else if (offValence > offValenceSurprised){
        offValence-=2;
        if (offValence<=offValenceSurprised){
          offValence = offValenceSurprised;
        }
      }

      dominanceValue = "-0.13";
      valenceValue = "+0.40";
      arousalValue = "+0.67";

      if(count>=10){
        emo="SORPRESA"
        countSurprised++;

        maxMap=0;

        //triangoli con fill
        minDistance = 10;
        maxDistance = 40;
        triStroke = lerpColor(neutralStroke,surprisedStroke,count/20);

        //triangoli senza fill
        minDistance2 = 30;
        maxDistance2 = 50;
        triFill = lerpColor(neutralFill,surprisedFill,count/20);

        numParticles+=10;
        if (numParticles>=100){
          numParticles = 100;
        }

        particleV = 100;
        limit = 10;

      }
      else {
        neutralFunction();
      }
    }


    /*------------------------------disgusted emotion---------------------------*/
    else if (maxValue==disgustedValue){
      count++;

      //incrementi Dominance
      if (offDominance < offDominanceDisgusted){
        offDominance+=2;
        if (offDominance>=offDominanceDisgusted){
          offDominance = offDominanceDisgusted;
        }
      }
      else if (offDominance > offDominanceDisgusted){
        offDominance-=2;
        if (offDominance<=offDominanceDisgusted){
          offDominance = offDominanceDisgusted;
        }
      }

      //incrementi Arousal
      if (offArousal < offArousalDisgusted){
        offArousal+=2;
        if (offArousal>=offArousalDisgusted){
          offArousal = offArousalDisgusted;
        }
      }
      else if (offArousal > offArousalDisgusted){
        offArousal-=2;
        if (offArousal<=offArousalDisgusted){
          offArousal = offArousalDisgusted;
        }
      }

      //incrementi Valence
      if (offValence < offValenceDisgusted){
        offValence+=2;
        if (offValence>=offValenceDisgusted){
          offValence = offValenceDisgusted;
        }
      }
      else if (offValence > offValenceDisgusted){
        offValence-=2;
        if (offValence<=offValenceDisgusted){
          offValence = offValenceDisgusted;
        }
      }

      dominanceValue = "+0.11";
      valenceValue = "-0.64";
      arousalValue = "+0.35";

      if(count>=10){
        emo="DISGUSTO"
        countDisgusted++;

        maxMap=0;

        //triangoli con fill
        minDistance = 30;
        maxDistance = 60;
        triFill = lerpColor(neutralFill,disgustedFill,count/20);

        //triangoli senza fill
        minDistance2 = 40;
        maxDistance2 = 80;
        triStroke = lerpColor(neutralStroke,disgustedStroke,count/20);

        numParticles+=10;
        if (numParticles>=50){
          numParticles = 50;
        }

        particleV = 2;
        limit = 2;

      }
      else {
        neutralFunction();
      }
    }

    else if (maxValue==fearfulValue){
      count++;

      //incrementi Dominance
      if (offDominance < offDominanceFearful){
        offDominance+=2;
        if (offDominance>=offDominanceFearful){
          offDominance = offDominanceFearful;
        }
      }
      else if (offDominance > offDominanceFearful){
        offDominance-=2;
        if (offDominance<=offDominanceFearful){
          offDominance = offDominanceFearful;
        }
      }

      //incrementi Arousal
      if (offArousal < offArousalFearful){
        offArousal+=2;
        if (offArousal>=offArousalFearful){
          offArousal = offArousalFearful;
        }
      }
      else if (offArousal > offArousalFearful){
        offArousal-=2;
        if (offArousal<=offArousalFearful){
          offArousal = offArousalFearful;
        }
      }

      //incrementi Valence
      if (offValence < offValenceFearful){
        offValence+=2;
        if (offValence>=offValenceFearful){
          offValence = offValenceFearful;
        }
      }
      else if (offValence > offValenceFearful){
        offValence-=2;
        if (offValence<=offValenceFearful){
          offValence = offValenceFearful;
        }
      }

      dominanceValue = "-0.43";
      valenceValue = "-0.64";
      arousalValue = "+0.60";

      if(count>=10){
        emo="PAURA"
        countFearful++;

        maxMap ++;
        if(maxMap>=3){
          maxMap=3;}
          vel=1;

          //triangoli senza fill
          minDistance = 20;
          maxDistance = 50;
          triStroke = lerpColor(neutralStroke,fearfulStroke,count/20);

          //triangoli con fill
          minDistance2 = 60;
          maxDistance2 = 80;
          triFill = lerpColor(neutralFill,fearfulFill,count/20);

          numParticles+=50;
          if (numParticles>=100){
            numParticles = 100;
          }

          particleV = 40;
          limit = 5;

        }
        else {
          neutralFunction();
        }
      }

    }
