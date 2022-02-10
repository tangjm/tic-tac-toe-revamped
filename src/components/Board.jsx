import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

const Board = props => {

	const renderSquare = i => {
		return (
			<Square id={i} key={i}
				isHighlighted={props.winningSquares.includes(i) ? true : false}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
			/* () => {
				(i) => {
					handleClick(i);
				}
			}
			*/
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

	// alternative solution
	// const createRows = () => {
	// 	const gameSquares = generateGameSquares();
	// 	return gameSquares
	// 		.reduce((previousSquare, currentSquare, index) => {
	// 			if (index % 3 === 0) {
	// 				let row = [
	// 					currentSquare,
	// 					gameSquares[index + 1],
	// 					gameSquares[index + 2]
	// 				];
	// 				return previousSquare.concat([row]);
	// 			}
	// 			return previousSquare;
	// 		}, [])
	// 		.map((row, index) => {
	// 			return <div key={"row" + index} className="board-row">
	// 				{row}
	// 			</div>
	// 		})
	// }

	// const generateGameSquares = (start, end) => {
	// 	let boardCells = [];
	// 	let count = 0;
	// 	while (count < 9) {
	// 		boardCells.push(renderSquare(count));
	// 		count++;
	// 	}
	// 	return boardCells.slice(start, end);
	// }

	return (
		<div>
			{/* {createRows()} */}
			{createGameBoard()}
		</div>
	);
}

Board.propTypes = {
	squares: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
	winningSquares: PropTypes.arrayOf(Number).isRequired
}

export default Board;