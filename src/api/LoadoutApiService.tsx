import ApiClient from "./ApiClient";
import { Loadout } from '../interfaces/LoadoutInterface';

const client = ApiClient();

export const fetchAllLoadouts = async (): Promise<Loadout[]> => {
    const { data } = await client.get('/loadouts/getLoadouts');
    if (!Array.isArray(data)) {
        throw new Error('Expected an array of loadouts');
    }
    return data;
}

//used when creating a new loadout or single loadout.
export const fetchLoadout = async (id: number): Promise<Loadout | null> => {
    const { data } = await client.get(`/loadouts/getLoadout?loadoutID=${id}`);
    return data;
}