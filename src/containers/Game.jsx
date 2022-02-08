import { useState } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import Board from '../components/Board';

const Game = (props) => {
	const initialHistory = [{ squares: Array(9).fill(null) }];
	const [history, setHistory] = useState(initialHistory);
	const [xIsNext, setXIsNext] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);

	const [selectedMove, setSelectedMove] = useState(null);

	const handleClick = i => {
		const historyCopy = history.slice(0, stepNumber + 1);
		const current = historyCopy[historyCopy.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = xIsNext ? 'X' : 'O';

		setHistory(historyCopy.concat({ squares: squares }))
		setStepNumber(historyCopy.length);
		setXIsNext(xIsNext => !xIsNext);
	}

	const jumpTo = i => {
		setSelectedMove(i);
		setStepNumber(i);
		setXIsNext(i % 2 === 0);
	}

	const status = () => {
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares);
		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else {
			status = "Next player " + (xIsNext ? "X" : "O");
		}
		return status;
	}

	const getMoveCoordinates = move => {
		// 0 -> 0, 0
		// 1 -> 0, 1
		// 2 -> 0, 2
		// 3 -> 1, 0
		// 4 -> 1, 1
		// 5 -> 1, 2
		// 6 -> 2, 0
		// 7 -> 2, 1
		// 8 -> 2, 2
		// find difference between the current history state and its previous state
		// calculate the coordinates of the square whose value has changed
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
			return <li key={move} className={isSelected}>
				<span>{getMoveCoordinates(move)}</span>
				<button className={isSelected}
					onClick={() => jumpTo(move)}>
					{desc}
				</button>
			</li>
		});
		return moves;
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={history[stepNumber].squares}
					onClick={i => handleClick(i)} />
			</div>
			<div className="game-info">
				<div>{status()}</div>
				<ol>{moves()}</ol>
			</div>
		</div>
	);
}

export default Game;