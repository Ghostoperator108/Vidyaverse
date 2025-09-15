// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    // Correctly destructure i18n from the useTranslation hook
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex space-x-2">
            <button 
                onClick={() => changeLanguage('en')}
                className={`px-4 py-2 rounded-lg ${i18n.language === 'en' ? 'bg-cyan-400 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
                English
            </button>
            <button 
                onClick={() => changeLanguage('bn')}
                className={`px-4 py-2 rounded-lg ${i18n.language === 'bn' ? 'bg-cyan-400 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
                বাংলা
            </button>
        </div>
    );
};

export default LanguageSwitcher;