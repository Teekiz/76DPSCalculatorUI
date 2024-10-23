import { createContext } from 'react';
import { Loadout } from '../interfaces/LoadoutInterface';

export const LoadoutIDContext = createContext({
    activeLoadoutTab: 0,
    setActiveLoadoutTab: (activeLoadoutTab : number) => {}
});

export const LoadoutsContext = createContext({
    loadouts: [] as Loadout[],
    setLoadouts: (loadouts: Loadout[]) => {}
});