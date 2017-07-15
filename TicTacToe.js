var content, winningCombinations , turn = 0;

//Game methods
window.onload=function(){
   // painted = new Array();
    content = new Array();
    winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(var l = 0; l <= 8; l++){
    //painted[l] = false;
    content[l]='';
    }
}


function canvasClicked(canvasNumber){
  if (turn%2 == 0){
    draw_x(canvasNumber);
  }else {
    draw_o(canvasNumber);
  }
  turn++;
}

function draw_x(canvasNumber){
   var theCanvas = "canvas"+canvasNumber;
  if (content[canvasNumber-1] == ''){
    var c = document.getElementById(theCanvas);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(40,30);
    ctx.lineTo(220,120);
    ctx.moveTo(40,120);
    ctx.lineTo(220,30);
    ctx.stroke();
    ctx.closePath();
    content[canvasNumber-1] = 'X';
  }
}

function draw_o(canvasNumber){
   var theCanvas = "canvas"+canvasNumber;
  if (content[canvasNumber-1] == ''){
    var c = document.getElementById(theCanvas);
    var ctx = c.getContext("2d");
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.arc(130,75,60,0,Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
    content[canvasNumber-1] = 'O';
  }
}