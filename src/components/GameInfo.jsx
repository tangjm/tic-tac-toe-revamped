import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import LanguageContext from '../utils/languages';
import { calculateWinner } from '../utils/calculateWinner';

const GameInfo = ({ gameInfo }) => {
	const {
		history,
		xIsNext,
		setXIsNext,
		stepNumber,
		setStepNumber,
		selectedMove,
		setSelectedMove,
		setWinningSquares
	} = gameInfo;
	const languageContext = useContext(LanguageContext);
	const language = languageContext.currentLanguage.language;
	const { winnerText, nextPlayerText, drawText } = languageContext.gameText.gameResultText;
	const { switchOrderText, gotoMoveText, gotoGameStartText } = languageContext.gameText.gameAnalysisText;
	const [isChronological, setIsChronological] = useState(true);

	const status = () => {
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares).result;
		let status;
		if (winner) {
			status = winnerText[language] + ": " + winner;
		} else if (current.squares.every(val => val !== null)) {
			status = drawText[language];
		} else {
			status = nextPlayerText[language] + ": " + (xIsNext ? "X" : "O");
		}
		return status;
	}

	const moves = () => {
		const moves = history.map((step, move) => {
			const isSelected = selectedMove === move ? "selected" : "";
			const desc = move ? gotoMoveText[language] + " #" + move :
				gotoGameStartText[language];
			return (
				<li key={move} className={isSelected}>
					<span>{getMoveCoordinates(move)}</span>
					&nbsp;
					<button className={isSelected}
						onClick={() => jumpTo(move)}>
						{desc}
					</button>
				</li>
			)
		});
		return isChronological ? moves : moves.reverse();
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
		for (let i = 3; i > 0; i--) {
			for (let j = 0; j < 3; j++) {
				coordinates.push([String.fromCharCode(j + 65), i]);
			}
		}
		return ["(", ")"].join(coordinates[updatedSquare]);
	}

	const updateWinningSquares = latestStep => {
		const historyCopy = history.slice(0, latestStep + 1);
		const current = historyCopy[historyCopy.length - 1];
		const squares = current.squares.slice();
		setWinningSquares(winningSquares => {
			const resultObj = calculateWinner(squares);
			return resultObj.result ? new Set(resultObj.combination) : new Set();
		})
	}

	const jumpTo = i => {
		updateWinningSquares(i);
		setSelectedMove(currentMove => i);
		setStepNumber(currentStep => i);
		setXIsNext(isXNext => i % 2 === 0);
	}

	const flipMoveOrder = () => {
		setIsChronological(isChronological => !isChronological);
	}

	return (
		<>
			<div className="game-info">
				<h1>{status()}</h1>
				<ol>{moves()}</ol>
			</div>
			<div className="game-info flipOrder">
				<button onClick={flipMoveOrder}>
					{switchOrderText[language]}
				</button>
			</div>
		</>
	)
}

GameInfo.propTypes = {
	gameInfo: PropTypes.exact({
		history: PropTypes.array.isRequired,
		xIsNext: PropTypes.bool.isRequired,
		setXIsNext: PropTypes.func.isRequired,
		stepNumber: PropTypes.number.isRequired,
		setStepNumber: PropTypes.func.isRequired,
		selectedMove: PropTypes.number,
		setSelectedMove: PropTypes.func.isRequired,
		setWinningSquares: PropTypes.func.isRequired,
	})
}

export default GameInfo;