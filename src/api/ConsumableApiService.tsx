import ApiClient from "./ApiClient";
import {Consumable} from "../interfaces/ConsumableInterface";

const client = ApiClient();

export const getAllConsumables = async (): Promise <Consumable[]> => {
    try {
        const consumableData = (await client.get<Consumable[]>('/loadouts/getAvailableConsumables')).data;
        if (Array.isArray(consumableData))
        {
            console.debug('Retrieved consumable data (getAllConsumables):', consumableData)
            return consumableData;
        } else {
            console.error('Error fetching consumables: expected array but received: ', consumableData);
            return [];
        }
    } catch (error) {
        console.error('Error fetching consumables:', error);
        return [];
    }
}

export const addConsumable = async (loadoutID: number, consumable: Consumable): Promise<void> => {
    try {
        await client.post(`/loadouts/addConsumable?loadoutID=${loadoutID}&consumableID=${consumable.id}`);
    } catch (error){
        console.error('Error adding consumable:', error);
    }
}

export const removeConsumable = async (loadoutID: number, consumable: Consumable): Promise<void> => {
    try {
        await client.post(`/loadouts/removeConsumable?loadoutID=${loadoutID}&consumableID=${consumable.id}`);
        console.log("Removed consumable: ", consumable.name);
    } catch (error){
        console.error('Error adding consumable:', error);
    }
}