import { createContext } from 'react';
import { LoadoutsContextType } from '../interfaces/LoadoutInterface';

export const LoadoutIDContext = createContext({
    activeLoadoutTab: 0,
    setActiveLoadoutTab: (tab : number) => {}
});

export const LoadoutsContext = createContext<LoadoutsContextType | undefined>(undefined);