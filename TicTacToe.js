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
    checkForWin('X');
  }else {
    draw_o(canvasNumber);
    checkForWin('O');
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
    ctx.moveTo(40,20);
    ctx.lineTo(240,120);
    ctx.moveTo(40,120);
    ctx.lineTo(240,20);
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
    ctx.arc(150,75,60,0,Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
    content[canvasNumber-1] = 'O';
  }
}

function draw_line(canvasNumber,start_x,start_y,end_x,end_y){
   var theCanvas = "canvas"+canvasNumber;
    var c = document.getElementById(theCanvas);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 12;
    ctx.strokeStyle = 'red';
    ctx.moveTo(start_x,start_y);
    ctx.lineTo(end_x,end_y);
    //ctx.moveTo(40,120);
    //ctx.lineTo(220,30);
    ctx.stroke();
    ctx.closePath();
}


function checkForWin(symbol){
  //winningCombinations
  for ( i = 0; i < winningCombinations.length; i++ ) {
    if(content[winningCombinations[i][0]] === symbol &&
       content[winningCombinations[i][1]] === symbol &&
       content[winningCombinations[i][2]] === symbol){
       if(i < 3){
        draw_line(winningCombinations[i][0]+1, 0, 75, 300, 75);
        draw_line(winningCombinations[i][1]+1, 0, 75, 300, 75);
        draw_line(winningCombinations[i][2]+1, 0, 75, 300, 75);
       } else if ( i >=3 && i <6 ){
        draw_line(winningCombinations[i][0]+1, 130, 0, 130, 200);
        draw_line(winningCombinations[i][1]+1, 130, 0, 130, 200);
        draw_line(winningCombinations[i][2]+1, 130, 0, 130, 200);
       } else if(i == 6) {
        draw_line(winningCombinations[i][0]+1, 0, 0, 300, 150);
        draw_line(winningCombinations[i][1]+1, 0, 0, 300, 150);
        draw_line(winningCombinations[i][2]+1, 0, 0, 300, 150);
       }else{
        draw_line(winningCombinations[i][0]+1, 0, 150, 300, 0);
        draw_line(winningCombinations[i][1]+1, 0, 150, 300, 0);
        draw_line(winningCombinations[i][2]+1, 0, 150, 300, 0);
       }
          setTimeout(function(){ alert("Player "+ symbol + " Won!") }, 100);
       }
    }
}1