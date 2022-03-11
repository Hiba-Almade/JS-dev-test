
const ticTacToa=new TicTacToa();
ticTacToa.start();


function TicTacToa(){
    const board=new Board();
    const human=new Human(board);
    const computer= new Computer(board);

    let turn=0;
    this.start=function(){
        const config={ childList:true};
        const observer= new MutationObserver(()=> takeTurn());
        board.position.forEach((el)=>observer.observe(el,config))
        takeTurn();
    }
    function takeTurn(){
      
        if(board.checkWinner()){
            return;
        }
        if(turn%2==0){
            human.takeTurn();
        }else{
            computer.takeTurn();
        }
        turn++;
    }
}

function Board(){
    this.position=Array.from(document.querySelectorAll('.col'));
   
   
    this.checkWinner= function(){
        let winner=false
        const winneringCombinations =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ]; 
        const position= this.position;
      
        winneringCombinations.forEach(winnerC => {
          const posInnerText1 =position[winnerC[0]].innerText;
          const posInnerText2 =position[winnerC[1]].innerText;
          const posInnerText3 =position[winnerC[2]].innerText;
          const isWinning = posInnerText1 !== '' && posInnerText1 === posInnerText2 && posInnerText2 === posInnerText3;
          if(isWinning){
              winner=true;
              winnerC.forEach((el) => {
                position[el].className +=' winner';
              })
          }
       
        });
        return winner;

    }
}
function Human(board){

    this.takeTurn = function(){
        board.position
        .forEach(el=> el.addEventListener('click',handleTurnTaken ));        
    }
    function handleTurnTaken(e){
       e.target.innerText="X" ;
       board.position
            .forEach(el=>el.removeEventListener('click', handleTurnTaken))
    }
}
function Computer(board){
 
    this.takeTurn = function(){
        const availablePositions=board.position
                                    .filter(p =>p.innerText==='');
        const move = Math.floor(Math.random() * (availablePositions.length - 0));
        availablePositions[move].innerText = 'O';
    }
}