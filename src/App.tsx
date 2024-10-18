import { useState } from 'react';

import LoadoutNavigationBar from './components/LoadoutNavigationBar';
import LoadoutDataAccordion from './components/LoadoutDataAccordion';
import { LoadoutContext } from './contexts/LoadoutContext'; 

function App()
{
  const [activeLoadoutTab, setActiveLoadoutTab] = useState<number>(0);

  return (
    <div className='App'>
      <LoadoutContext.Provider value={{activeLoadoutTab, setActiveLoadoutTab}}>
        <LoadoutNavigationBar />
        <LoadoutDataAccordion />
      </LoadoutContext.Provider>
    </div>
  );
}

export default App;