import './App.css';
import { useState, useEffect } from 'react';
import Square from './components/Square';
import { Patterns } from './Pattern';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkWin();
    checkifTie();
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard((prevBoard) => {
      return prevBoard.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
        return val;
      });
    });
 
  };

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === "") return;
      let foundwinningPattern = true;
      currentPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundwinningPattern = false;
        }
      });
      if (foundwinningPattern) {
        setResult({ winner: player, state: "won" });
      }
    });
  };
  const checkifTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    })
    if(filled){
      setResult({winner:"No One",state:"Tie"});
    }
  };
  const restartGame =()=>{
    setBoard(["", "", "", "", "", "", "", "", ""])
    setPlayer("O");
}

  return (
    <div className='tic-tac-toe'>
    <h1 className='heading'>Tic-Tac-Toe Game</h1>
    <div className='App'>
      
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
          <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
          <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
          <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
          <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
          <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
          <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
