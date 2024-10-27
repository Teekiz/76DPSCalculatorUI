import LoadoutNavigationBar from "./components/loadout_components/LoadoutNavigationBar.tsx";
import LoadoutDataAccordion from "./components/loadout_components/LoadoutDataAccordion.tsx";

function App()
{
    return (
        <div className='App' data-bs-theme="dark">
            <LoadoutNavigationBar />
            <LoadoutDataAccordion />
        </div>
    );
}

export default App;