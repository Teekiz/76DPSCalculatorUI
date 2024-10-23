import ApiClient from "./ApiClient";
import { WeaponDetails, WeaponBasic, RangedWeaponDetails, MeleeWeaponDetails, WeaponDetailsFull } from '../interfaces/WeaponInterfaces';
import { isRangedWeapon, isMeleeWeapon } from '../components/weapon_components/WeaponMethods'

const client = ApiClient();
export default client;

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
    } catch (error: any) {
        console.error('Error fetching weapons:', error.message);
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
    } catch (error : any) {
        console.error('Error fetching weapons:', error.message);
        return null;
    }
}

//used to get some extra details of the weapon name provided.
export const getWeaponDetails = async (name: string): Promise<WeaponDetails> => {
    try {
        const weapon = (await client.get(`/getWeaponDetails?weaponName=${name}`)).data;
        console.debug('Retreived weapon data (getWeaponDetails):', weapon)
        return weapon;
    } catch (error: any) {
        console.error(`Error fetching weapon: ${name}`, error.message);
        return {weaponID: 0, weaponName: name, weaponType: '', damageType: '', weaponDamageByLevel: {}};
    }
}

export const setWeapon = async (weaponID: number, weaponName: string, loadoutID: number) => {
    try {
        await client.post(`/setWeapon?loadoutID=${loadoutID}&weaponName=${weaponName}`);
        console.debug(`Sent new weapon post: ${weaponID}, ${weaponName}, ${loadoutID}`)
    } catch (error : any) {
        console.error(`Error posting weapon: ${weaponID}, ${weaponName}`, error.message);
    }
}





