import React, { useState } from 'react';
import Reel from './Reel';
import spinSound from '../assets/spin.mp3';
import winSound from '../assets/win.mp3';
import loseSound from '../assets/lose.mp3'
import Soundtrack from '../assets/Soundtrack.mp3'
import azul from "../assets/img/azul.png";
import filo from "../assets/img/filo.png";
import liandry from "../assets/img/liandry.png";
import mejai from "../assets/img/mejai.png";
import mseis from "../assets/img/mseis.png";
import msiete from "../assets/img/msiete.png";
import mCinco from "../assets/img/mCinco.png";
import parte from "../assets/img/parte.png";
import haste from "../assets/img/haste.png";
import espejo from "../assets/img/espejo.png";
import draven from "../assets/img/draven.png";
import trinity from "../assets/img/trinity.png";
import rojo from "../assets/img/rojo.png";
import vayne from "../assets/img/vayne.jpg";
import viego from "../assets/img/viego.png";
import teemo from "../assets/img/teemo.png";
import rabadon from "../assets/img/rabadon.png";
import verde from "../assets/img/verde.png";

const symbols = [
  azul, filo, liandry, mejai, mseis, msiete, mCinco, parte, haste, espejo,
  draven, trinity, rojo, vayne, viego, teemo, rabadon, verde
];

const SlotMachine = () => {
    const [credits, setCredits] = useState(20000);
    const [bet, setBet] = useState(750); // Estado para la apuesta
    const [grid, setGrid] = useState(Array.from({ length: 5 }, () => Array(5).fill(null)));
    const [totalBet, setTotalBet] = useState(0); // Acumulador de apuesta total
    const [lastWin, setLastWin] = useState(0); // Ganancia de la última tirada
    const [totalWin, setTotalWin] = useState(0); // Ganancia acumulada total
    const [message, setMessage] = useState('');

  
    const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];
    const winningCombinations = [
      ["filo", "espejo", "trinity", "liandry", "rabadon", "mejai"],
      ["rojo", "azul", "verde"],
      ["filo", "rabadon", "espejo"],
      ["haste", "parte", "parte"],
    ];
  
    const checkForWins = (newGrid) => {
      let totalWinnings = 0;
  
      // Lógica de ganancias (igual que antes)
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (
            newGrid[row][col] === newGrid[row][col + 1] &&
            newGrid[row][col + 1] === newGrid[row][col + 2]
          ) {
            let count = 3;
            if (col + 3 < 5 && newGrid[row][col + 2] === newGrid[row][col + 3]) count = 4;
            if (col + 4 < 5 && newGrid[row][col + 3] === newGrid[row][col + 4]) count = 5;
  
            totalWinnings += (count >= 4 ? 5000 * 4 : 10000);
          }
        }
      }
  
      // Combinaciones ganadoras
      for (const combination of winningCombinations) {
        const foundCombo = combination.every(symbol =>
          newGrid.flat().includes(symbol)
        );
        if (foundCombo) totalWinnings += 5000;
      }
  
      return totalWinnings;
    };
  
    const handleSpin = () => {
      if (credits < bet) {
        setMessage("No tienes suficientes créditos.");
        const audioLose = new Audio(loseSound);
        audioLose.play();
        return;
      }
      setTotalBet((prevTotal) => prevTotal + bet); // Acumula la apuesta total
      setCredits((prevCredits) => prevCredits - bet);
  
      const audio = new Audio(spinSound);
      audio.play();
  
      const newGrid = Array.from({ length: 5 }, () =>
        Array.from({ length: 5 }, () => getRandomSymbol())
      );
      setGrid(newGrid);
  
      const winnings = checkForWins(newGrid);
      setLastWin(winnings); // Actualiza la ganancia de la última tirada
      setTotalWin((prevTotal) => prevTotal + winnings - bet); // Actualiza la ganancia total
  
      setCredits((prevCredits) => prevCredits + winnings);
  
      if (winnings > 0) {
        const audioWin = new Audio(winSound);
        audioWin.play();
        setMessage(`¡Ganaste ${winnings} créditos!`);
      } else {
        setTimeout(() => {
          const audioLose = new Audio(loseSound);
          audioLose.play();
        }, 1000);
        setMessage("Sin ganancia.");
      }
    };
  
    const increaseBet = () => {
      if (bet + 100 <= credits) setBet((prevBet) => prevBet + 100); // Incrementa la apuesta en 100
    };
  
    const decreaseBet = () => {
      if (bet - 100 >= 100) setBet((prevBet) => prevBet - 100); // Disminuye la apuesta en 100 (mínimo 100)
    };
    return (
      <div style={{ textAlign: 'center', padding: '0xp' }}>
         
           {/* Audio de fondo */}
      <audio src={Soundtrack} autoPlay loop>
        Tu navegador no soporta el elemento de audio.
      </audio>
        {/* Créditos actuales */}
        <div style={{
          marginTop: '-5vh',
          marginBottom: '2vh',
          marginRight:'60vh',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'gold',
          padding: '1rem',
          borderRadius: '10px',
          display: 'inline-block'
        }}>
        {credits}
        </div>
  
       
  
        {/* Tablero de slots 5x5 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 18vh)',
          gap: '1vh',
          marginTop: '5vh',
          marginLeft: '60vh',
      
        }}>
          {grid.map((row, rowIndex) =>
            row.map((symbol, colIndex) => (
              <Reel key={`${rowIndex}-${colIndex}`} symbol={symbol} />
            ))
          )}
           {/* Apuesta */}
        <div style={{
          marginTop: '2vh',
          fontSize: '1.5rem',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginRight:'50vh',
          marginLeft:'-8vh'
        }}>
          <button onClick={decreaseBet} style={{ padding: '25px',height:'8vh', fontSize: '1rem',marginRight:'3vh',backgroundColor:"transparent",border:'none',outline: 'none', }}></button>
          <span style={{marginRight:'2vh'}}>{bet}</span>
          <button onClick={increaseBet} style={{ padding: '25px',height:'8vh', fontSize: '1rem',marginRight:'0vh',backgroundColor:"transparent",border:'none',outline: 'none' }}></button>
        </div>
   {/* Acumuladores */}
   
        <div style={{marginrigth:'70vh',marginLeft:'-135vh',marginTop:'15vh',fontSize: '1.5rem',}}>{totalBet}</div>
        <div style={{marginTop:'15vh',marginrigth:'20vh',marginLeft:'-5vh',fontSize: '1.5rem',}}>{lastWin}</div>
        <div style={{marginLeft:'15vh',marginTop:'15vh',fontSize: '1.5rem'}}>{totalWin}</div>

          <button
            onClick={handleSpin}
            style={{
              backgroundColor: "transparent",
              marginTop: '4vh',
              marginBottom: '11vh',
              marginLeft: '-65vh',
              borderRadius: '50%',
              width: '31mm',
              height: '33mm',
              border: 'none',
              color: 'transparent',
              outline: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
            disabled={credits < bet}
          >
          </button>
        </div>
      </div>
    );
  };
  
  export default SlotMachine;