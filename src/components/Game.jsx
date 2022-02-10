import { useState, useReducer } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import Board from './Board';

const reducer = (currentState, action) => {
	if (action?.data)
		return currentState.concat(action.data);
}

const Game = (props) => {
	const initialHistory = [{ squares: Array(9).fill(null) }];
	const [history, setHistory] = useState(initialHistory);
	const [xIsNext, setXIsNext] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);

	const [selectedMove, setSelectedMove] = useState(null);
	const [isChronological, setIsChronological] = useState(true);
	const [winningSquares, setWinningSquares] = useState([]);


	const handleClick = i => {
		
		const historyCopy = history.slice(0, stepNumber + 1);
		const current = historyCopy[historyCopy.length - 1];
		const squares = current.squares.slice();

		// const resultObj = calculateWinner(squares);
		// if (resultObj.result) {
		// 	setWinningSquares(winningSquares => winningSquares.concat(resultObj.combination));
		// 	setWinningSquares(resultObj.combination);
		// 	return;
		// }
		setWinningSquares(winningSquares => {
			console.log("click")
			const resultObj = calculateWinner(squares);
			return resultObj.result ? winningSquares.concat(resultObj.combination) : winningSquares;
		})
		if (calculateWinner(squares).result) return;
		if (squares[i]) return;

		squares[i] = xIsNext ? 'X' : 'O';

		setHistory(historyCopy.concat({ squares: squares }))
		setStepNumber(historyCopy.length);
		setSelectedMove(historyCopy.length);
		setXIsNext(xIsNext => !xIsNext);
		console.log("end")
	}

	const jumpTo = i => {
		setWinningSquares(currentState => []);
		setSelectedMove(i);
		setStepNumber(i);
		setXIsNext(i % 2 === 0);
		console.log(`stepNumber: ${stepNumber}`);
		console.log(`selectedMove: ${selectedMove}`);
	}

	const status = () => {
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares).result;
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