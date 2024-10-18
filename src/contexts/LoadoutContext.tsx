import {createContext} from 'react';

export const LoadoutContext = createContext({
    activeLoadoutTab: 0,
    setActiveLoadoutTab: (tab : number) => {}
});