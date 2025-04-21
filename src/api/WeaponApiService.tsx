import ApiClient from "./ApiClient";
import { WeaponDetails, WeaponBasic, RangedWeaponDetails, MeleeWeaponDetails, WeaponDetailsFull } from '../interfaces/WeaponInterfaces';
import { isRangedWeapon, isMeleeWeapon } from '../components/equipment_components/weapon_components/implementation/WeaponMethods.tsx'

const client = ApiClient();

//used to retrieve a list of all weapons (with the name and id).
export const getAllWeapons = async (): Promise <WeaponBasic[]> => {
    try {
        const weaponsData = (await client.get('/loadouts/getAvailableWeapons')).data;
        if (Array.isArray(weaponsData))
        {
            console.debug('Retreived weapons data (getAllWeapons):', weaponsData)
            return weaponsData;
        } else {
            console.error('Error fetching weapons: expected array but received: ', weaponsData);
            return [];
        }
    } catch (error) {
        console.error('Error fetching weapons:', error);
        return [];
    }
}

// used to return the weapon currently in use.
export const getCurrentWeapon = async (loadoutID: number): Promise<WeaponDetailsFull | null> => {
    try {
        const weapon = (await client.get(`/loadouts/getWeapon?loadoutID=${loadoutID}`)).data;
        console.debug(weapon)
        if (weapon && isRangedWeapon(weapon))
        {
            console.debug('Retreived rangedWeapon data (getCurrentWeapon):', weapon)
            return weapon as RangedWeaponDetails;
        } else if (weapon && isMeleeWeapon(weapon)){
            console.debug('Retreived meleeWeapon data (getCurrentWeapon):', weapon)
            return weapon as MeleeWeaponDetails;
        } else{
            return null;
        }
    } catch (error) {
        console.error('Error fetching weapons:', error);
        return null;
    }
}

//used to get some extra details of the weapon name provided.
export const getWeaponDetails = async (weapon: WeaponBasic): Promise<WeaponDetails> => {
    try {
        const data = (await client.get(`/loadouts/getWeaponDetails?weaponID=${weapon.id}`)).data;
        console.debug('Retrieved weapon data (getWeaponDetails):', data)
        return data;
    } catch (error) {
        console.error(`Error fetching weapon: ${weapon.name}`, error);
        return {id: weapon.id, name: weapon.name, weaponType: '', damageType: '', weaponDamageByLevel: {}};
    }
}

export const setWeapon = async (weapon: WeaponBasic, loadoutID: number) => {
    try {
        await client.post(`/loadouts/setWeapon?loadoutID=${loadoutID}&weaponID=${weapon.id}`);
        console.debug(`Sent new weapon post: ${weapon.id}, ${weapon.name}, ${loadoutID}`)
    } catch (error) {
        console.error(`Error posting weapon: ${weapon.id}, ${weapon.name}`, error);
    }
}





