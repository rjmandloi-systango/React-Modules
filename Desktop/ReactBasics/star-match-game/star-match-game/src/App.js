import './App.css';
import { useEffect, useState } from 'react';

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'brown',
  candidate: 'deepskyblue',
};


const PlayNumber = props => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => props.onClick(props.number, props.status)}
  >{props.number}</button>
)

const StarDisplay = props => (
  <>
    {utils.range(1, props.count).map(starId =>
      <div key={starId} className="star" />)}
  </>
);

const PlayAgain=props=>(
  <div className="game-done">
    <div className="message" style={{
      color:props.gameStatus==='lost'?'red' : 'green'
    }}>

      {props.gameStatus==='lost' ? 'Game Over' :'NICE' }
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
)
const Game  = (props) => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNum, setAvailableNum] = useState(utils.range(1, 9))
  const [candidateNum, setCandidateNum] = useState([])
  const candidatesAreWrong = utils.sum(candidateNum) > stars
  
  const [secondsLeft , setSecondsLeft]=useState(10)
 
  useEffect(()=>{
    if(secondsLeft>0 || availableNum.length >0 ){
   const timerId= setTimeout(() => {
    setSecondsLeft(secondsLeft-1)  
    }, 1000);
    return ()=> clearTimeout(timerId)
  }
  })
  // const resetGame=()=>{
  //   setStars(utils.random(1,9))
  //   setAvailableNum(utils.range(1, 9))
  //   setCandidateNum([])
  // }
  const gameStatus=availableNum.length ===0 ?'won':secondsLeft === 0 ?'lost' : 'active' 

  const numberStatus = (number => {
    if (!availableNum.includes(number)) {
      return 'used'
    }
    if (candidateNum.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate'
    }
    return 'available'
  })

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus!=='active' ||  currentStatus === 'used') {
      return
    }
    const newCandidateNum = currentStatus==='available'? candidateNum.concat(number):
    candidateNum.filter(cn=>cn !== number)
    


    if (utils.sum(newCandidateNum) !== stars) {
      setCandidateNum(newCandidateNum)
    } else {
      const newAvailableNum = availableNum.filter(n => !newCandidateNum.includes(n))
      setStars(utils.randomSumIn(newAvailableNum, 9))
      setAvailableNum(newAvailableNum)
      setCandidateNum([])
    }

  }
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus!== 'active'?<PlayAgain gameStatus={gameStatus} onClick={props.startNewGame}></PlayAgain>:<StarDisplay count={stars}></StarDisplay>}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            >

            </PlayNumber>
          )}
        </div>
      </div>
      <div className="timer">Time Remaining     {secondsLeft}</div>
    </div>
  );
};

const StarMatch=()=>{
  const [gameId , setGameId]=useState(1) 
     return <Game key={gameId} startNewGame={()=>{ setGameId(gameId+1)}}></Game>
}

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};




function App() {
  return (
    <StarMatch></StarMatch>
  );
}

export default App;
