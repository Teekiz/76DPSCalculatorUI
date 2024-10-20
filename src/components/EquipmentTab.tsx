import { useState, useContext, useEffect } from 'react';
import { RangedWeaponDetails, MeleeWeaponDetails } from "../interfaces/WeaponInterfaces";
import { LoadoutContext } from '../contexts/LoadoutContext';
import { getCurrentWeapon } from './weapon_components/WeaponApiService';
import WeaponSearchComponent from './weapon_components/WeaponSearchComponents'
import WeaponStatsTable from './weapon_components/WeaponStatsTable';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EquipmentTab()
{
    const [currentWeapon, setCurrentWeapon] = useState<RangedWeaponDetails | MeleeWeaponDetails | null>(null);
    const { activeLoadoutTab } = useContext(LoadoutContext); // Example context usage

    // Fetch the current weapon when the component mounts or when activeLoadoutTab changes
    useEffect(() => {
        const fetchWeapon = async () => {
            const weapon = await getCurrentWeapon(activeLoadoutTab); // Fetch the weapon
            setCurrentWeapon(weapon); // Update state with fetched weapon
        };

        fetchWeapon();
    }, [activeLoadoutTab]);

    return (
        <>
            <Row>
                <Col><WeaponSearchComponent weapon={currentWeapon} loadoutID={activeLoadoutTab}/></Col>            
                <Col><WeaponStatsTable weapon={currentWeapon}/></Col>
            </Row>
        </>
    );
}