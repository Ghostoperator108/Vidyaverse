import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';

const FirstPage = () => {
    const { t } = useTranslation();

    

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <Link to='/dashboard'><button 
                       
                        className="px-5 py-2 bg-cyan-600/80 text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-md flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {t('back_to_dashboard')}
                    </button></Link>
                </div>
                <Navbar/>

                <div className="bg-black/30 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-cyan-400/30">
                    <h1 className="text-3xl sm:text-4xl font-black text-cyan-300 tracking-wide mb-4">
                        {t('chapter1_title')}
                    </h1>
                    <h2 className="text-2xl font-bold text-yellow-300 mt-6 mb-3">
                        {t('chapter1_subtitle1')}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        {t('chapter1_intro')}
                    </p>

                    <div className="mt-8 p-6 bg-gray-800/20 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-400 mb-3">
                            {t('chapter1_section1_title')}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {t('chapter1_section1_p1')}
                        </p>
                        <ul className="list-disc list-inside text-lg text-gray-300 leading-relaxed mt-4 space-y-2 pl-4">
                            <li><strong className="text-green-300">{t('chapter1_section1_subtitle')}</strong> {t('chapter1_section1_li1')}</li>
                        </ul>
                    </div>

                    <div className="mt-8 p-6 bg-gray-800/20 rounded-lg">
                        <h3 className="text-2xl font-bold text-orange-400 mb-3">
                            {t('chapter1_section2_title')}
                        </h3>
                         <p className="text-lg text-gray-300 leading-relaxed">
                            {t('chapter1_section2_p1')}
                        </p>
                        <ul className="list-disc list-inside text-lg text-gray-300 leading-relaxed mt-4 space-y-2 pl-4">
                            <li><strong className="text-orange-300">{t('chapter1_section2_subtitle')}</strong> {t('chapter1_section2_li1')}</li>
                        </ul>
                    </div>

                    <div className="mt-8 p-6 bg-gray-800/20 rounded-lg">
                        <h3 className="text-2xl font-bold text-purple-400 mb-3">
                            {t('chapter1_section3_title')}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {t('chapter1_section3_p1')}
                            <br/><br/>
                            {t('chapter1_section3_p2')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;
