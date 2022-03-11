
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
                                    .filter(p =>p.innerText==="");
        const move = Math.floor(Math.random * availablePositions.length);
        availablePositions[move].innerText='O';
    }
}