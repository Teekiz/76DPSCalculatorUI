import ApiClient from "./ApiClient.tsx";
import {Perk} from "../interfaces/PerkInterface.tsx";

const client = ApiClient();

//used to retrieve a list of all perks.
export const getAllPerks = async (): Promise <Perk[]> => {
    try {
        const perkData = (await client.get<Perk[]>('/loadouts/getAvailablePerks')).data;
        if (Array.isArray(perkData))
        {
            console.debug('Retrieved perk data (getAllPerks):', perkData)
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
        await client.post(`/loadouts/addPerk?loadoutID=${loadoutID}&perkID=${perk.id}`);
    } catch (error){
        console.error('Error adding perks:', error);
    }
}

export const removePerk = async (loadoutID: number, perk: Perk): Promise<void> => {
    try {
        await client.post(`/loadouts/removePerk?loadoutID=${loadoutID}&perkID=${perk.id}`);
        console.log("Removed perk: ", perk.name);
    } catch (error){
        console.error('Error adding perks:', error);
    }
}

export const changePerkRank = async (loadoutID: number, perk: Perk): Promise<void> => {
    try {
        await client.post(`/loadouts/changePerkRank?loadoutID=${loadoutID}&perkID=${perk.id}&perkRank=${perk.currentRank}`);
    } catch (error){
        console.error('Error changing perks:', error);
    }
}