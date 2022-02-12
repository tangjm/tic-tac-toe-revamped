import React, { useState, useContext } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import Board from './Board';
import GameInfo from './GameInfo';
import LanguageSettings from './LanguageSettings';
import ColourThemeContext from '../utils/colourThemes';
import LanguageContext from '../utils/languages';
import DateTime from './DateTime';

const initialGameHistory = [{ squares: Array(9).fill(null) }];

const Game = () => {
	const colourThemeContext = useContext(ColourThemeContext);
	const [history, setHistory] = useState(initialGameHistory);
	const [xIsNext, setXIsNext] = useState(true);
	const [stepNumber, setStepNumber] = useState(0);
	const [selectedMove, setSelectedMove] = useState(null);
	const [winningSquares, setWinningSquares] = useState(new Set());

	const handleClick = i => {
		const historyCopy = history.slice(0, stepNumber + 1);
		const current = historyCopy[historyCopy.length - 1];
		const squares = current.squares.slice();

		// is there already a winner? if so, return; else, continue
		if (calculateWinner(squares).result) return;

		// has a move already been played in the square? if so, return; else, continue
		if (squares[i]) return;

		squares[i] = xIsNext ? 'X' : 'O';

		// update game record
		setHistory(historyCopy.concat({ squares: squares }));
		setWinningSquares(winningSquares => {
			const resultObj = calculateWinner(squares);
			return resultObj.result ? new Set(resultObj.combination) : new Set();
		})
		setStepNumber(historyCopy.length);
		setSelectedMove(historyCopy.length);
		setXIsNext(xIsNext => !xIsNext);
	}

	return (
		<div className="game">
			<div className="game-board container">
				<Board squares={history[stepNumber].squares}
					winningSquares={winningSquares}
					onClick={handleClick} />
			</div>
			<div className="container">
				<GameInfo gameInfo={{
					history,
					xIsNext,
					setXIsNext,
					stepNumber,
					setStepNumber,
					selectedMove,
					setSelectedMove,
					setWinningSquares
				}} />
			</div>
			<div className='container'>
				<DateTime />
				<br />
				<br />
				<LanguageSettings />
				<br />
				<br />
				<LanguageContext.Consumer>
					{languageContext => {
						const { language } = languageContext.currentLanguage;
						const { labelText,
							lightThemeText,
							darkThemeText } = languageContext.themeSettingText;
						return (
							<>
								<label htmlFor="theme-toggle">
									{labelText[language]}:
								</label>
								&nbsp;
								<button id="theme-toggle"
									onClick={colourThemeContext.handleThemeChange}>
									{colourThemeContext.isLightTheme ? lightThemeText[language] :
										darkThemeText[language]}
								</button>
							</>
						)
					}}
				</LanguageContext.Consumer>
			</div>
		</div>
	);
}

export default Game;