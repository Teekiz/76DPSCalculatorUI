import ApiClient from "./ApiClient";
import { WeaponDetails, WeaponBasic, RangedWeaponDetails, MeleeWeaponDetails, WeaponDetailsFull } from '../interfaces/WeaponInterfaces';
import { isRangedWeapon, isMeleeWeapon } from '../components/equipment_components/weapon_components/WeaponMethods'

const client = ApiClient();

//used to retrieve a list of all weapons (with the name and id).
export const getAllWeapons = async (): Promise <WeaponBasic[]> => {
    try {
        const weaponsData = (await client.get('/getAvailableWeapons')).data;
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
        const weapon = (await client.get(`/getWeapon?loadoutID=${loadoutID}`)).data;
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
        const data = (await client.get(`/getWeaponDetails?weaponID=${weapon.weaponID}`)).data;
        console.debug('Retrieved weapon data (getWeaponDetails):', data)
        return data;
    } catch (error) {
        console.error(`Error fetching weapon: ${weapon.weaponName}`, error);
        return {weaponID: weapon.weaponID, weaponName: weapon.weaponName, weaponType: '', damageType: '', weaponDamageByLevel: {}};
    }
}

export const setWeapon = async (weapon: WeaponBasic, loadoutID: number) => {
    try {
        await client.post(`/setWeapon?loadoutID=${loadoutID}&weaponID=${weapon.weaponID}`);
        console.debug(`Sent new weapon post: ${weapon.weaponID}, ${weapon.weaponName}, ${loadoutID}`)
    } catch (error) {
        console.error(`Error posting weapon: ${weapon.weaponID}, ${weapon.weaponName}`, error);
    }
}





