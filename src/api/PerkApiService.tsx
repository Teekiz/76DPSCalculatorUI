import ApiClient from "./ApiClient.tsx";
import {Perk} from "../interfaces/PerkInterface.tsx";

const client = ApiClient();

//used to retrieve a list of all perks.
export const getAllPerks = async (): Promise <Perk[]> => {
    try {
        const perkData = (await client.get('/getAvailablePerks')).data;
        if (Array.isArray(perkData))
        {
            console.debug('Retreived perk data (getAllPerks):', perkData)
            return perkData;
        } else {
            console.error('Error fetching perks: expected array but received: ', perkData);
            return [];
        }
    } catch (error) {
        console.error('Error fetching perks:', error);
        return [];
    }
}

export const addPerk = async (loadoutID: number, perk: Perk): Promise<void> => {
    try {
        await client.post(`/addPerk?loadoutID=${loadoutID}&perkName=${perk.name}`);
    } catch (error){
        console.error('Error adding perks:', error);
    }
}

export const removePerk = async (loadoutID: number, perk: Perk): Promise<void> => {
    try {
        await client.post(`/removePerk?loadoutID=${loadoutID}&perkName=${perk.name}`);
    } catch (error){
        console.error('Error adding perks:', error);
    }
}