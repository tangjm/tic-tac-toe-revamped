import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import LanguageContext from '../utils/LanguageContext';

const LanguageSettings = () => {
	const languageContext = useContext(LanguageContext);
	// const handleLanguageChange = (e, languages) => {
	// 	setLanguage(currentLanguage => {
	// 		switch (e.target.value) {
	// 			case "0":
	// 				return languages[0].language;
	// 			case "1":
	// 				return languages[1].language;
	// 			case "2":
	// 				return languages[2].language;
	// 			default:
	// 				return currentLanguage;
	// 		}
	// 	})
	// }

	return (
		<div>
			<label htmlFor="language-select">Select Language</label>
			<select id="language-select"
				// onChange={e => handleLanguageChange(e, languages)}
				onChange={e => languageContext.updateLanguage(e.target.value)}
			>
				{languageContext.availableLanguages.map((language, index) => {
					return (
						<option key={index} value={index} defaultValue={!index}>
							{language.displayValue}
						</option>
					)
				})}
			</select>
		</div>
	)
}

LanguageSettings.propTypes = {
	// setLanguage: PropTypes.func.isRequired,
}

export default LanguageSettings;