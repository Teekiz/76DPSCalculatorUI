import ApiClient from "./ApiClient.tsx";
import {Specials} from "../interfaces/SpecialsInterface.tsx";

const client = ApiClient();

export const changeSpecialStat = async (loadoutID: number, special: string, value: number): Promise<void> => {
    try {
        await client.post(`/loadouts/changeSpecial?loadoutID=${loadoutID}&special=${special}&value=${value}`);
    } catch (error) {
        console.error('Error changing stats. ', error);
    }
}

export const changeSpecialsStats = async (loadoutID: number, specials: Specials): Promise<void> => {
    try {
        await client.post(`/loadouts/changeSpecials?loadoutID=${loadoutID}`, specials);
    } catch (error) {
        console.error('Error changing stats:', error);
    }
};