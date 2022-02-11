import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import LanguageContext from '../utils/languages';

const LanguageSettings = props => {
	const { availableLanguages, setLanguage } = useContext(LanguageContext);

	return (
		<div>
			<label htmlFor="language-select">Select Language</label>
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