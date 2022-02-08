import React from 'react';
import Square from './Square';

const Board = props => {

	const renderSquare = i => {
		return (
			<Square key={i}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	}

	const createGameBoard = () => {
		const board = new Array(3).fill(new Array(3));
		let count = 0;
		for (let row = 0; row < board.length; row++) {
			for (let column = 0; column < board[row].length; column++) {
				board[row][column] = renderSquare(count);
				console.log(count);
				count++;
			}
		}

		return board;
	}

	const generateGameBoard = (start, end) => {
		let boardCells = [];
		let count = 0;
		while (count < 9) {
			boardCells.push(renderSquare(count));
			count++;
		}
		return boardCells.slice(start, end);
	}

	return (
		<div>
			<div className="board-row">
				{generateGameBoard(0, 3)}

			</div>
			<div className="board-row">
				{generateGameBoard(3, 6)}

			</div>
			<div className="board-row">
				{generateGameBoard(6, 9)}

			</div>
		</div>
	);
}

export default Board;