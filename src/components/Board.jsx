import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

const Board = props => {

	const renderSquare = i => {
		return (
			<Square id={i} key={i}
				isHighlighted={props.winningSquares.has(i)}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	}

	const createGameBoard = () => {
		let count = 0;
		let board = [];
		for (let i = 0; i < 3; i++) {
			let row = [];
			for (let j = 0; j < 3; j++) {
				row.push(renderSquare(count));
				count++;
			}
			board.push(
				<div key={"row" + i} className="board-row">
					{row}
				</div>
			);
		}
		return board;
	}

	return (
		<div>
			{createGameBoard()}
		</div>
	);
}

Board.propTypes = {
	squares: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
	winningSquares: PropTypes.object.isRequired
}

export default Board;