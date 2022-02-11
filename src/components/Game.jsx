import React, { useState } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import Board from './Board';
import GameInfo from './GameInfo';
import LanguageSettings from './LanguageSettings';

const initialGameHistory = [{ squares: Array(9).fill(null) }];

const Game = () => {
	const [history, setHistory] = useState(initialGameHistory);
	const [xIsNext, setXIsNext] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);
	const [selectedMove, setSelectedMove] = useState(null);
	const [winningSquares, setWinningSquares] = useState(new Set());

	const handleClick = i => {
		const historyCopy = history.slice(0, stepNumber + 1);
		const current = historyCopy[historyCopy.length - 1];
		const squares = current.squares.slice();

		// is there already a winner? if yes, return; else, continue
		if (calculateWinner(squares).result) return;

		// setWinningSquares(winningSquares => new Set(calculateWinner(squares).combination))
	
		
		// has a move already been played in the square? if yes, return; else, continue
		if (squares[i]) return;

		squares[i] = xIsNext ? 'X' : 'O';

		// update game record
		setHistory(historyCopy.concat({ squares: squares }));
		setWinningSquares(winningSquares => {
			const resultObj = calculateWinner(squares);
			return resultObj.result ? new Set(resultObj.combination) : new Set();
		})
		setStepNumber(historyCopy.length);
		setSelectedMove(historyCopy.length);
		setXIsNext(xIsNext => !xIsNext);
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={history[stepNumber].squares}
					winningSquares={winningSquares}
					onClick={handleClick} />
			</div>
			<GameInfo gameInfo={{
				history,
				xIsNext, 
				setXIsNext,
				stepNumber, 
				setStepNumber,
				selectedMove, 
				setSelectedMove, 
				setWinningSquares
			}}/>
			<LanguageSettings  />
		</div>
	);
}

export default Game;