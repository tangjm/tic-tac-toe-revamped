import { useState } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import Board from './Board';

const Game = () => {
	const initialHistory = [{ squares: Array(9).fill(null) }];
	const [history, setHistory] = useState(initialHistory);
	const [xIsNext, setXIsNext] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);

	const [selectedMove, setSelectedMove] = useState(null);
	const [isChronological, setIsChronological] = useState(true);
	const [winningSquares, setWinningSquares] = useState(new Set());

	const handleClick = i => {
		const historyCopy = history.slice(0, stepNumber + 1);
		const current = historyCopy[historyCopy.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares).result) return;

		setWinningSquares(winningSquares => {
			const resultObj = calculateWinner(squares);
			return resultObj.result ? new Set([...resultObj.combination]) : winningSquares;
		})

		if (squares[i]) return;

		squares[i] = xIsNext ? 'X' : 'O';

		setHistory(historyCopy.concat({ squares: squares }))
		setStepNumber(historyCopy.length);
		setSelectedMove(historyCopy.length);
		setXIsNext(xIsNext => !xIsNext);
	}

	const updateWinningSquares = latestStep => {
		const historyCopy = history.slice(0, latestStep + 1);
		const current = historyCopy[historyCopy.length - 1];
		const squares = current.squares.slice();
		setWinningSquares(winningSquares => {
			const resultObj = calculateWinner(squares);
			return resultObj.result ? new Set([...resultObj.combination]) : new Set();
		})
	}

	const jumpTo = i => {
		updateWinningSquares(i);
		setSelectedMove(currentMove => i);
		setStepNumber(currentStep => i);
		setXIsNext(isXNext => i % 2 === 0);
	}

	const status = () => {
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares).result;
		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else {
			status = "Next player: " + (xIsNext ? "X" : "O");
		}
		return status;
	}

	const getMoveCoordinates = move => {
		let updatedSquare = null;
		for (let i = 0; i < 9; i++) {
			if (move <= 0) return;
			const current = history[move].squares[i];
			const previous = history[move - 1].squares[i];
			if (current !== previous) {
				updatedSquare = i;
				break;
			}
		}

		const coordinates = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				coordinates.push([i, j]);
			}
		}
		return ["(", ")"].join(coordinates[updatedSquare]);
	}

	const moves = () => {
		const moves = history.map((step, move) => {
			const isSelected = selectedMove === move ? "selected" : "";
			const desc = move ? "goto move #" + move
				: "goto game start";
			return (
				<li key={move} className={isSelected}>
					<span>{getMoveCoordinates(move)}</span>
					<button className={isSelected}
						onClick={() => jumpTo(move)}>
						{desc}
					</button>
				</li>
			)
		});
		return isChronological ? moves : moves.reverse();
	}

	const flipMoveOrder = () => {
		setIsChronological(isChronological => !isChronological);
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={history[stepNumber].squares}
					winningSquares={winningSquares}
					onClick={handleClick} />
			</div>
			<div className="game-info">
				<div>{status()}</div>
				<ol>{moves()}</ol>
			</div>
			<div>
				<button onClick={flipMoveOrder}>Reverse move order</button>
			</div>
		</div>
	);
}

export default Game;