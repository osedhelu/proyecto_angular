import { useEffect, useState } from "react";

export const useRouter = () => {
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash);

        // Configurar el manejador de eventos cuando el componente se monta
        window.addEventListener('hashchange', handleHashChange);

        // Limpiar el manejador de eventos cuando el componente se desmonta
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    return {
        router: hash
    }
}