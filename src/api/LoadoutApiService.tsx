import ApiClient from "./ApiClient";
import { Loadout } from '../interfaces/LoadoutInterface';

const client = ApiClient();

export const getAllLoadouts = async (): Promise<Loadout[]> => {
    try {
        const loadoutData = (await client.get('/getLoadouts')).data;
        if (Array.isArray(loadoutData)) {
            console.debug('Retrieved loadout data (getAllLoadouts):', loadoutData);
            return loadoutData;
        } else {
            console.error('Error fetching loadouts: expected array but received:', loadoutData);
            return [];
        }
    } catch (error) {
        console.error('Error fetching loadouts:', error);
        return [];
    }
}

//used when creating a new loadout or single loadout.
export const getLoadout = async (newID: number): Promise<Loadout | null> => {
    try {
        const {data: loadoutData} = await client.get<Loadout>(`/getLoadout?loadoutID=${newID}`);
        return loadoutData;
    } catch (error: unknown){
        if (error instanceof Error){
            console.error('Error getting loadout:', error.message);
        } else {
            console.error('An unknown error occurred while retreiving loadout');
        }
        return null;
    }
}

//need to add and delete