import { useState, useEffect, useContext } from 'react';
import ApiClient from "../ApiClient";
import { weaponDetails, WeaponSearch } from '../../types/WeaponTypes';
import { LoadoutContext } from '../../contexts/LoadoutContext';

const WeaponClient = ApiClient();
export default WeaponClient;

//used to retrieve a list of all weapons (with the name and id).
export const getAllWeapons = () => {
    const [weapons, setWeapons] = useState<WeaponSearch[]>([]);
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

// used to return the name of the weapon currently in use.
export const getCurrentWeaponName = async (): Promise<string> => {
    const { activeLoadoutTab } = useContext(LoadoutContext);
    const defaultName = 'Select Weapon';

    try {
        const weapon = (await WeaponClient.get(`/getWeapon?loadoutID=${activeLoadoutTab}`)).data;
        return weapon.name || defaultName;
    } catch (error) {
        console.error('Error fetching weapons:', error);
        return defaultName;
    }
}

//used to get some extra details of the weapon name provided.
export const getWeaponDetails = async (name: string): Promise<weaponDetails> => {
    try {
        const weapon = (await WeaponClient.get(`/getWeaponDetails?weaponName=${name}`)).data;
        return weapon;
    } catch (error) {
        console.error(`Error fetching weapon: ${name}`, error);
        return {weaponName: name, weaponType: '', damageType: '', weaponDamageByLevel: {}};
    }
}





