import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import LanguageContext from '../utils/languages';

const LanguageSettings = props => {
	const languageContext = useContext(LanguageContext);
	const { availableLanguages, setLanguage, gameText, currentLanguage } = languageContext;
	const { language } = currentLanguage;

	const selectLanguage = gameText.languageSettingtext[language];

	return (
		<div>
			<label htmlFor="language-select">{selectLanguage}:</label>
			&nbsp;
			<select id="language-select"
				onChange={e => setLanguage(e.target.value)}
			>
				{availableLanguages.map((language, index) => {
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

}

export default LanguageSettings;