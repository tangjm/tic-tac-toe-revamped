import React, { useContext } from 'react'
import LanguageContext from '../utils/languages';

const LanguageSettings = () => {
	const languageContext = useContext(LanguageContext);
	const { availableLanguages, setLanguage, languageSettingText, currentLanguage } = languageContext;
	const { language } = currentLanguage;

	const selectLanguage = languageSettingText[language];

	return (
		<>
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
		</>
	)
}

export default LanguageSettings;