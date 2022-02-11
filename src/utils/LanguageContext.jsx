import React from 'react';

const languages = {
	gameResultText: {
		winnerText: {
			english: "Winner",
			mandarin: "胜者",
			french: "Gagnant du jeu",
		},
		nextPlayerText: {
			english: "Next Player",
			mandarin: "下一手",
			french: "Prochain joueur",
		},
		drawText: {
			english: "Draw",
			mandarin: "平局",
			french: "Un match nul",
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
			english: "goto game start",
			mandarin: "起步棋盘",
			french: "Aller au début du jeu "
		}
	}
}

export const LanguageContext = React.createContext(languages);