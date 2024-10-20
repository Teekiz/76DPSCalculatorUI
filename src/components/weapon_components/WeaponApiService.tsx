import { useState, useEffect } from 'react';
import ApiClient from "../ApiClient";
import { WeaponDetails, WeaponBasic, RangedWeaponDetails, MeleeWeaponDetails } from '../../interfaces/WeaponInterfaces';
import { isRangedWeapon, isMeleeWeapon } from '../weapon_components/WeaponMethods'

const WeaponClient = ApiClient();
export default WeaponClient;

//used to retrieve a list of all weapons (with the name and id).
export const getAllWeapons = () => {
    const [weapons, setWeapons] = useState<WeaponBasic[]>([]);
    useEffect(() => {
        const fetchWeapons = async () => {
            try {
                const weaponsData = (await WeaponClient.get('/getAvailableWeapons')).data;
                if (Array.isArray(weaponsData))
                {
                    setWeapons(weaponsData);
                } else {
                    console.error('Error fetching weapons: expected array but received: ', weaponsData);
                }
            } catch (error) {
                console.error('Error fetching weapons:', error);
            }
        };
    
        fetchWeapons();
    }, []);

    return {weapons};
}

// used to return the weapon currently in use.
export const getCurrentWeapon = async (loadoutID: number): Promise<RangedWeaponDetails | MeleeWeaponDetails | null> => {
    try {
        const weapon = (await WeaponClient.get(`/getWeapon?loadoutID=${loadoutID}`)).data;
        if (weapon && isRangedWeapon(weapon))
        {
            return weapon as RangedWeaponDetails;
        } else if (weapon && isMeleeWeapon(weapon)){
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
export const getWeaponDetails = async (name: string): Promise<WeaponDetails> => {
    try {
        const weapon = (await WeaponClient.get(`/getWeaponDetails?weaponName=${name}`)).data;
        return weapon;
    } catch (error) {
        console.error(`Error fetching weapon: ${name}`, error);
        return {weaponID: 0, weaponName: name, weaponType: '', damageType: '', weaponDamageByLevel: {}};
    }
}

export const setWeapon = async (weaponID: number, weaponName: string, loadoutID: number) => {
    try {
        WeaponClient.post(`/setWeapon?loadoutID=${loadoutID}&weaponName=${weaponName}`);
        console.debug(`Sent new weapon post: ${weaponID}, ${weaponName}, ${loadoutID}`)
    } catch (error) {
        console.error(`Error posting weapon: ${weaponID}, ${weaponName}`, error);
    }
}





