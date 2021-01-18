// landmarks.js
// where vertex indices and triangulation are defined
//
// hint: you'll need either of the following to view this file
// with correct formatting:
// A) a large monitor
// B) an editor that is not editor.p5js.org and has
//    non-wrapping lines or less huge font size

var VTX7 = [33,133,362,263,1,78,308];
var VTX33 = [33,133,362,263,1,62,308,159,145,386,374,6,102,331,2,13,14,70,105,107,336,334,300,54,10,284,50,280,234,454,58,288,152]
var VTX68 = [
  /* cont  */127,234,132, 58,172,150,149,148,152,377,378,379,397,288,361,454,356,
  /* brows */ 70, 63,105, 66,107,336,296,334,293,300,
  /* nose  */168,  6,195,  4, 98, 97,  2,326,327,
  /* eyes  */ 33,160,158,133,153,144,362,385,387,263,373,380,
  /* lip   */ 57, 40, 37,  0,267,270,287,321,314, 17, 84, 91,
  /* mouth */ 78, 81, 13,311,308,402, 14,178,
]
var VTX468 = new Array(468).fill(0).map((x,i)=>i);

var TRI7 = [0,1,4,2,3,4,4,6,5]
var TRI33 = [
  /*  eyes  */ 0, 7 ,8 ,   7, 1, 8,   2, 9,10,   9, 3,10,
  /*  brows */ 17,18,0 ,  18, 7, 0,  18,19, 7,  19, 1, 7,  19,11, 1,  19,20,11,  21,22, 3,  21, 3, 9,  20,21, 9,  20, 9, 2,  20, 2,11,
  /*  4head */ 23,18,17,  25,22,21,  24,19,20,  24,19,18,  24,21,20,  24,18,23,  24,25,21,
  /*  nose  */ 11,4 ,12,  11,13, 4,   1,11,12,  11, 2,13,  12, 4,14,   4,13,14,
  /* up-lip */ 14,15, 5,  14, 6,15,  12,14, 5,  14,13, 6,
  /* cheeks */ 8 , 1,12,   2,10,13,   8,12,26,  10,27,13,  26,12, 5,  13,27, 6,   0, 8,26,  10,3,27,
  /*  chin  */ 5, 16,32,  16, 6,32,   5,32,30,   6,31,32,
  /*  cont  */ 26, 5,30,  27,31, 6,   0,26,28,   3,29,27,  17, 0,28,   3,22,29,  23,17,28,  22,25,29,  28,26,30,  27,29,31,
]
// stolen from https://age2death.glitch.me/
var TRI68 = [
   0, 1,36,   0,17,36,   1, 2,41,  1,36,41,  2, 3,31,  2,31,41,  3, 4,48,  3,31,48,  4, 5,48,  5, 6,48,
   6, 7,59,   6,48,59,   7, 8,58,  7,58,59,  8, 9,56,  8,56,57,  8,57,58,  9,10,55,  9,55,56, 10,11,54,
  10,54,55,  11,12,54,  12,13,54, 13,14,35, 13,35,54, 14,15,46, 14,35,46, 15,16,45, 15,45,46, 16,26,45,
  17,18,36,  18,19,37,  18,36,37, 19,20,38, 19,37,38, 20,21,39, 20,38,39, 21,27,39, 22,23,42, 22,27,42,
  23,24,43,  23,42,43,  24,25,44, 24,43,44, 25,26,45, 25,44,45, 27,28,39, 27,28,42, 28,29,39, 28,29,42,
  29,30,31,  29,30,35,  29,31,40, 29,35,47, 29,40,39, 29,42,47, 30,31,32, 30,32,33, 30,33,34, 30,34,35,
  31,32,50,  31,40,41,  31,48,49, 31,49,50, 32,33,51, 32,50,51, 33,34,51, 34,35,52, 34,51,52, 35,46,47,
  35,52,53,  35,53,54,  36,37,41, 37,38,40, 37,40,41, 38,39,40, 42,43,47, 43,44,47, 44,45,46, 44,46,47,
  48,49,60,  48,59,60,  49,50,61, 49,60,61, 50,51,62, 50,61,62, 51,52,62, 52,53,63, 52,62,63, 53,54,64,
  53,63,64,  54,55,64,  55,56,65, 55,64,65, 56,57,66, 56,65,66, 57,58,66, 58,59,67, 58,66,67, 59,60,67,
  60,61,67,  61,62,66,  61,66,67, 62,63,66, 63,64,65, 63,65,66, 21,22,27,
];

var TRI468 = [
//punti disegnati da noi

337,108,9,105,221,226,100,187,61,210,194,171,200,396,418,430,291,411,329,446,441,334,9,337

]

var tri2 = [
9,221,168,100,164,61,16,194,200,418,16,291,164,329,168,441,9
]

var triPie = [
108,63,221,
337,441,293,
151,108,221,
151,221,168,
151,168,441,
151,441,337,
293,441,329,
329,446,293,
226,187,205,
226,100,205,
184,100,205,
205,187,214,
214,184,205,
16,200,201,
16,201,184,
201,184,210,
214,210,184,
210,201,171,
171,200,201,
171,200,396,
200,421,396,
421,396,430,
430,434,408,
408,430,421,
408,421,16,
16,421,200,
408,329,425,
425,434,408,
425,434,411,
411,446,425,
446,425,329,
63,221,100,
100,226,63,
164,16,184,
164,16,408,
408,164,329,
100,164,184,
168,100,164,
168,164,329,
441,168,329,
221,168,100,
]



var hiddenPoints = [
  // /* cont  */127,234,132, 58,172,150,149,148,152,377,378,379,397,288,361,454,356,
  // /* brows */ 70, 63,105, 66,107,336,296,334,293,300,
  /* nose  */168,  6,195,  4, 98, 97,  2,326,327,
  // /* eyes  */ 33,160,158,133,153,144,362,385,387,263,373,380,
  // /* lip   */ 57, 40, 37,  0,267,270,287,321,314, 17, 84, 91,
  /* mouth */ 78, 81, 13,311,308,402, 14,178,

]

// var hiddenPoints = new Array(468).fill(0).map((x,i)=>i);
