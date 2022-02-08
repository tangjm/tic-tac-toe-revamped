import { useState } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import Board from '../components/Board';

const Game = (props) => {
	const initialHistory = [{ squares: Array(9).fill(null) }];
	const [history, setHistory] = useState(initialHistory);
	const [xIsNext, setXIsNext] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);

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

	const moves = () => {
		const moves = history.map((step, move) => {
			const desc = move ? "goto move #" + move
				: "goto game start";
			return <li key={move}>
				<button onClick={() => jumpTo(move)}>
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