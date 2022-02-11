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

		if (calculateWinner(squares).result) return;
		
		setWinningSquares(winningSquares => new Set(calculateWinner(squares).combination))

		if (squares[i]) return;

		squares[i] = xIsNext ? 'X' : 'O';

		setHistory(historyCopy.concat({ squares: squares }))
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