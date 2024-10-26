import LoadoutNavigationBar from "./components/loadout_components/LoadoutNavigationBar.tsx";
import LoadoutDataAccordion from "./components/loadout_components/LoadoutDataAccordion.tsx";
import useLoadoutStore from "./stores/LoadoutsStore.tsx";
import {useEffect} from "react";

function App()
{
    const fetchLoadouts = useLoadoutStore(state => state.actions.loadoutActions.fetchLoadouts);

    useEffect(() => {
        const fetchAndSetActiveLoadout = async () => {
            await fetchLoadouts();
            useLoadoutStore.getState().actions.loadoutActions.changeActiveLoadout(0);
        };

        fetchAndSetActiveLoadout();
    }, [fetchLoadouts]);

    return (
        <div className='App' data-bs-theme="dark">
            <LoadoutNavigationBar />
            <LoadoutDataAccordion />
        </div>
    );
}

export default App;