import React from 'react';

export const languages = [
	{
		language: "english",
		displayValue: "English"
	},
	{
		language: "mandarin",
		displayValue: "中文"
	},
	{
		language: "french",
		displayValue: "Français"
	},
]

const gameText = {
	gameResultText: {
		winnerText: {
			english: "Winner",
			mandarin: "胜者",
			french: "Gagnant",
		},
		nextPlayerText: {
			english: "Next player",
			mandarin: "下一手",
			french: "Prochain joueur",
		},
		drawText: {
			english: "Draw",
			mandarin: "平局",
			french: "Match nul",
		},
	},
	gameAnalysisText: {
		switchOrderText: {
			english: "Reverse move order",
			mandarin: "反向棋步顺序",
			french: "Inverser l'ordre de déplacement"
		},
		gotoMoveText: {
			english: "goto move",
			mandarin: "棋步",
			french: "Allez déplacer"
		},
		gotoGameStartText: {
			english: "goto Game Start",
			mandarin: "起步棋盘",
			french: "Aller au début du jeu "
		}
	}
}

export const LanguageContext = React.createContext(gameText);