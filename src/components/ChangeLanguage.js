import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import languages from '../configs/languages';
import ClickAble from './ClickAble';
const ChangeLanguage = () => {
	const [language, setLanguage] = useState(
		localStorage.getItem('lang') || 'en'
	);
	const { i18n } = useTranslation();

	const handleChangeLanguage = (language) => {
		setLanguage(language);
		i18n.changeLanguage(language);
		localStorage.setItem('lang', language);
	};

	return (
		<>
			{languages.map((languageItem) => (
				<ClickAble key={languageItem.code}>
					<span
						className={`uppercase ${
							languageItem.code === language
								? 'text-primary'
								: 'dark:text-dark-text-bold'
						} ml-2 cursor-pointer`}
						onClick={() => handleChangeLanguage(languageItem.code)}
					>
						{languageItem.code}
					</span>
				</ClickAble>
			))}
		</>
	);
};

export default ChangeLanguage;
