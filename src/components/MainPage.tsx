import { useState, useEffect } from 'react';
import LoadoutNavigationBar from '../components/LoadoutNavigationBar';
import LoadoutDataAccordion from '../components/LoadoutDataAccordion';
import { LoadoutIDContext, LoadoutsContext } from '../contexts/LoadoutContext'; 
import { getAllLoadouts } from '../api/LoadoutApiService';
import { Loadout } from '../interfaces/LoadoutInterface';

export default function MainPage() {
    const [activeLoadoutTab, setActiveLoadoutTab] = useState<number>(0);
    const [loadouts, setLoadouts] = useState<Loadout[]>([]);

    useEffect(() => {
        const fetchLoadouts = async () => {
            const fetchedLoadouts = await getAllLoadouts();
            setLoadouts(fetchedLoadouts);
        };
        fetchLoadouts();
    }, []);

    return (
        <LoadoutIDContext.Provider value={{activeLoadoutTab, setActiveLoadoutTab}}>
            <LoadoutsContext.Provider value={{loadouts, setLoadouts}}>
                <LoadoutNavigationBar />
                <LoadoutDataAccordion />
            </LoadoutsContext.Provider>
        </LoadoutIDContext.Provider>
    );
}
