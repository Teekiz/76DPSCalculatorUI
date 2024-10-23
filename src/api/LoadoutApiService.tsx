import ApiClient from "./ApiClient";
import { Loadout } from '../interfaces/LoadoutInterface';

const client = ApiClient();
export default client;

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
    } catch (error: any) {
        console.error('Error fetching loadouts:', error.message);
        return [];
    }
}

//need to add and delete