import React from 'react';
import Square from './Square';

const Board = props => {

	const renderSquare = i => {
		return (
			<Square key={i} cool={i}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	}

	const createGameBoard = () => {
		let board = Array(3).fill(Array(3));
		let count = 0;
		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {
				board[row][column] = renderSquare(count);
				++count;
			}
		}
	
		return board;
	}

	return (
		<div>
			<div className="board-row">
				{createGameBoard()[0]}
				{/* {renderSquare(0)}
				{renderSquare(1)}
			{renderSquare(2)} */}
			</div>
			<div className="board-row">
			{createGameBoard()[1]}
				
				{/* {renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)} */}
			</div>
			<div className="board-row">
				
				{/* {renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)} */}
			</div>
		</div>
	);
}

export default Board;