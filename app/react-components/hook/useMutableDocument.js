import { useState, useEffect } from 'react';

export function useDocumentPropertyObserver(propertyName) {
    const [propertyValue, setPropertyValue] = useState(document[propertyName]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (document[propertyName] !== propertyValue) {
                setPropertyValue(document[propertyName]);
            }
        }, 1000); // verifica cada segundo

        return () => {
            clearInterval(intervalId);
        };
    }, [propertyName, propertyValue]);

    return propertyValue;
}
