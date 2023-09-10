export const getBrowserLanguage = () => {
    const browserLanguage = navigator.language;
    const languageParts = browserLanguage.split('-');

    const languageCode = languageParts[0].toLowerCase();
    const countryCode = languageParts[1].toUpperCase();

    // Map language codes to desired format
    const languageMap = {
        es: 'es_ES',
        en: 'en_US',
    };

    // Check if the language code is in the map
    if (languageCode in languageMap) {
        return languageMap[languageCode];
    } else {
        return `${languageCode}_${countryCode}`;
    }
};