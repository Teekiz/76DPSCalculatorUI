import { useState, useEffect, useContext } from 'react';
import ApiClient from "../ApiClient";
import { Weapon } from '../../types/WeaponTypes';
import { LoadoutContext } from '../../contexts/LoadoutContext';

const WeaponClient = ApiClient();
export default WeaponClient;

export const getAllWeapons = () => {
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    useEffect(() => {
        const fetchWeapons = async () => {
            try {
                const weaponsData = (await WeaponClient.get('/getAvailableWeapons')).data;
                if (Array.isArray(weaponsData))
                {
                    const transformedWeapons = weaponsData.map((weapon) => ({
                        id: weapon.weaponID,
                        name: weapon.weaponName
                    }));
                    setWeapons(transformedWeapons);
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





