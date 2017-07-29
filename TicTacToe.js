var content, winningCombinations , turn = 0;  // choice = "X";
var player = 'o', opponent = 'x';
//Game methods
window.onload=function(){
    content = new Array();
    winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(var l = 0; l <= 8; l++){
    content[l]='_';
    }
}

function myChoice(){
    opponent = document.getElementById("selecto").checked ? 'o' : 'x';
    player = (opponent === 'x') ? 'o' : 'x';
}

function isMovesLeft(content)
{
    //for (var i = 0; i < 9; i++)
      //      if (content[i]=='_')
   if( content.indexOf("_") > 0) return true;
   return false;
}

function canvasClicked(canvasNumber){
  if (turn%2 == 0){
    opponent === "x" ? draw_x(canvasNumber) : draw_o(canvasNumber);
    //checkForWin('X');
  }else {
    opponent === "x" ? draw_o(canvasNumber) : draw_x(canvasNumber);
    //checkForWin('O');
  }

var bestMove = findBestMove(content);
player === "x" ? draw_x(bestMove+1) : draw_o(bestMove+1);
    //checkForWin('X');
 /* if (turn > 3 && turn < 9){
    checkForWin(content[canvasNumber-1] );
  } else if (turn >=9) {
    if (checkForWin(content[canvasNumber-1] ) != 0 ) {
      setTimeout(function(){ confirm("THE GAME IS OVER!") }, 100);
      setTimeout(function(){ location.reload(true); }, 100);
    }
  }*/
//
}

function draw_x(canvasNumber){
   var theCanvas = "canvas"+canvasNumber;
  if (content[canvasNumber-1] == '_'){
    var c = document.getElementById(theCanvas);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(40,25);
    ctx.lineTo(240,125);
    ctx.moveTo(40,125);
    ctx.lineTo(240,25);
    ctx.stroke();
    ctx.closePath();
    content[canvasNumber-1] = 'x';
    turn++;
  }
  //if (turn > 3) checkForWin('X');
}

function draw_o(canvasNumber){
   var theCanvas = "canvas"+canvasNumber;
  if (content[canvasNumber-1] == '_'){
    var c = document.getElementById(theCanvas);
    var ctx = c.getContext("2d");
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.arc(150,75,60,0,Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
    content[canvasNumber-1] = 'o';
    turn++;
  }
  //if (turn > 3) checkForWin('X');
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

//evaluate the score win = 10 loss -10 draw 0
/*function evaluate(symbol){
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
        draw_line(winningCombinations[i][0]+1, 140, 0, 140, 200);
        draw_line(winningCombinations[i][1]+1, 140, 0, 140, 200);
        draw_line(winningCombinations[i][2]+1, 140, 0, 140, 200);
       } else if(i == 6) {
        draw_line(winningCombinations[i][0]+1, 0, 0, 300, 150);
        draw_line(winningCombinations[i][1]+1, 0, 0, 300, 150);
        draw_line(winningCombinations[i][2]+1, 0, 0, 300, 150);
       }else{
        draw_line(winningCombinations[i][0]+1, 0, 150, 300, 0);
        draw_line(winningCombinations[i][1]+1, 0, 150, 300, 0);
        draw_line(winningCombinations[i][2]+1, 0, 150, 300, 0);
       }
         //setTimeout(function(){ confirm("Player "+ symbol + " Won!") }, 100);
         //setTimeout(function(){ location.reload(true); }, 100);
         if (player === symbol) return +10;
         return -10;
       }
    }
  //for draw
  return 0;
}*/


function evaluate(b)
{
   for ( i = 0; i < winningCombinations.length; i++ ) {
     if(b[winningCombinations[i][0]] === b[winningCombinations[i][1]] &&
        b[winningCombinations[i][1]] === b[winningCombinations[i][2]]
       ) {
             if (b[winningCombinations[i][0]]==player)
               return +10;
             else if (b[winningCombinations[i][0]]==opponent)
               return -10;
         }
   }
    // Else if none of them have won then return 0
    return 0;
}

//minmax
function minimax(content, depth, isMax)
{

console.log("Inside minimax");
    var score = evaluate(content);

    // If Maximizer has won the game return his/her
    // evaluated score
    if (score == 10)
        return score;

    // If Minimizer has won the game return his/her
    // evaluated score
    if (score == -10)
        return score;

    // If there are no more moves and no winner then
    // it is a tie
    if (isMovesLeft(content)==false)
        return 0;

    // If this maximizer's move
    if (isMax)
    {
        var best = -1000;

        // Traverse all cells
        for (var i = 0; i<9; i++)
        {
           // for (var j = 0; j<3; j++)
           // {
                // Check if cell is empty
                if (content[i]=='_')
                {
                    // Make the move
                    content[i] = player;

                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max( best,
                        minimax(content, depth+1, !isMax) );

                    // Undo the move
                    content[i] = '_';
                }
            //}
        }
        return best;
    }

    // If this minimizer's move
    else
    {
        var best = 1000;

        // Traverse all cells
        for (var i = 0; i<9; i++)
        {
            //for (var j = 0; j<3; j++)
            //{
                // Check if cell is empty
                if (content[i]=='_')
                {
                    // Make the move
                    content[i] = opponent;

                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best,
                           minimax(content, depth+1, !isMax));

                    // Undo the move
                    content[i] = '_';
                }
            //}
        }
        return best;
    }
}
//
//call this function
function findBestMove(content)
{
    var bestVal = -1000;
    var bestMove = -1;
    // Traverse all cells, evalutae minimax function for
    // all empty cells. And return the cell with optimal
    // value.
    for (var i = 0; i<9; i++)
    {
            // Check if celll is empty
            if (content[i]=='_')
            {
                // Make the move
                content[i] = player;

                // compute evaluation function for this
                // move.
                var moveVal = minimax(content, 0, false);

                // Undo the move
                content[i] = '_';

                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal)
                {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
    }

    console.log("The value of the best Move is"+  bestVal);
    console.log("bestMove: "+  bestMove);

    return bestMove;
}