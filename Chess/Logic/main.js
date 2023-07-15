// import {Chess} from "chess.js";

var game=new Chess();


const allsqure=document.getElementsByClassName("squre");

let moves=[];


function rotate(cnt)
{
  // var rotatesound = document.getElementById("rotate");
  // rotatesound.play();

  //clearing highlighted moves when move
  // rotation
  const op2=document.getElementsByTagName("img");
  for(const x of op2)
  {
    // console.log(x);
    if(cnt!=0)
    x.style.rotate="0deg";
    else
    x.style.rotate="180deg";
  }
  const op=document.getElementsByClassName("main-container");
  for(const x of op){
    if(cnt!=0)
    x.style.rotate="0deg";
    else
    x.style.rotate="180deg";
  }
  const op3=document.getElementsByClassName("num");
  for(const x of op3){
    if(cnt!=0)
    x.style.rotate="0deg";
    else
    x.style.rotate="180deg";
  }
  // console.log(op);
}


// rotate();
var count=0;
const allSquares = document.getElementsByClassName("squre");
let selectedPiece = null;
let firstpieceid= null;

for(const square of allSquares) {
  square.addEventListener('click', function() {

    //clearing heighlighted possible move when one person make move.
    var clr = document.querySelectorAll('.hlt-move');
      for(up of clr)
      {
        // console.log(up);
        up.className="squre";
      }
    if (selectedPiece) {
      if(selectedPiece.className=="black"&&count==0||selectedPiece.className=="white"&&count==1)
        {
            document.getElementById(firstpieceid).className="squre";
            square.className="squre";
            selectedPiece=null;
            return;
        }       
      const piece = square.querySelector("img");
      if(piece)
      {
            // console.log(selectedPiece.id);
            // console.log(piece.id);
            var tried=firstpieceid+"-"+square.id;
            console.log(tried);

            if (game.move(tried, {sloppy: true}) === null) { // validate and make the move
                document.getElementById(firstpieceid).className="squre";
                square.className="squre";
                selectedPiece=null;
                console.log('Invalid move!');
                return;
            }
            else
            {
                game.move(tried, {sloppy: true});
            }
            
            if(piece.className==selectedPiece.className)
            {
                document.getElementById(firstpieceid).className="squre";
                square.className="squre";
                selectedPiece=null;
                return;
            }
            
            //Take
            
            
            var xp=document.querySelectorAll(".last-move");
            for(db of xp)
            {
                db.className="squre";
            }
            square.className="last-move";
            p=document.getElementById(firstpieceid);
            p.className="last-move";


            // game.move(tried);
            
            //checking is check or not
            if(game.in_checkmate())
            {
                console.log("gameover");
                var chkmate = document.getElementById("checkmate");
                chkmate.play();
            }
            else if(game.in_check())
            {
                console.log("check");
                var checkSound = document.getElementById("check");
                checkSound.play();
            }
            else
            {
               var captureSound = document.getElementById("digant");
               captureSound.play();
            }

            rotate(count);
            count++;
            count%=2;

            square.removeChild(piece);
            square.appendChild(selectedPiece);
            selectedPiece.style.position = "relative";
            selectedPiece.style.top = "0";
            selectedPiece.style.left = "0";
            selectedPiece = null;
      }
      else
      {

        var tried=firstpieceid+"-"+square.id;
            // console.log(tried);

            if (game.move(tried, {sloppy: true}) === null) { // validate and make the move
                document.getElementById(firstpieceid).className="squre";
                square.className="squre";
                selectedPiece=null;
                console.log('Invalid move!');
                return;
            }
            else
            {
                game.move(tried, {sloppy: true});
            }
      // Move the selected piece to the clicked square
        moves.push(firstpieceid+"->"+square.id);
        // game.move(tried);
        // console.log(moves);
        // console.log(game.validateMove(tried));
        if(game.in_checkmate())
            {
                var chkmate = document.getElementById("gameover");
                chkmate.play();
                console.log("gameover");
                // game.reset();
            }
            else if(game.in_check())
            {
                console.log("check");
                var checkSound = document.getElementById("check");
                checkSound.play();
            }
            else
            {
              var moveSound = document.getElementById("move");
              moveSound.play();
            }

        //For last move:
        var xp=document.querySelectorAll(".last-move");
        for(db of xp)
        {
            db.className="squre";
        }
        square.className="last-move";
        p=document.getElementById(firstpieceid);
        p.className="last-move";


        // rotate();
        rotate(count);
        count++;
        count%=2;
        square.appendChild(selectedPiece);
        selectedPiece.style.position = "relative";
        selectedPiece.style.top = "0";
        selectedPiece.style.left = "0";
        selectedPiece = null;
      }
    } 
    else {
      // Select the piece in the clicked square
      const piece = square.querySelector("img");
      

      // Print the list of possible moves to the console
      // console.log(moves);
      const sqr = square.id; // for example, the white pawn on e2
      // console.log(sqr);
      const possiblemoves = game.moves({square: sqr}); // get all the possible moves for the pawn on e2
      // console.log(possiblemoves);

      for(high of possiblemoves)
      {
        if(high[0]=="O")continue;
        var dest = high.match(/[a-h][1-8]/)[0];
        getsqr=document.getElementById(dest);
        // getsqr.classList.add("hlt-move");
        getsqr.className="hlt-move";
      }
      if (piece) {
        const allclciked=document.querySelectorAll(".itisclicked");
        for(const op of allclciked)
        {
            op.className="squre";
        } 
        square.className="itisclicked";
        selectedPiece = piece;
        firstpieceid=square.getAttribute("id");
      }
      else
      {
        const allclciked=document.querySelectorAll("itisclicked");
        for(const op of allclciked)
        {
            op.className="squre";
        } 
        // square.className="itisclicked";
      }
    }
  });
}



//rotate logic



