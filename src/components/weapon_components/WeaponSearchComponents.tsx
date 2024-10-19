import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Weapon } from '../../types/WeaponTypes';
import { getAllWeapons, getCurrentWeaponName } from './WeaponApiService';

export default function LoadoutDataAccordion() {

    const menuWidth = "200px";
    const [searchTerm, setSearchTerm] = useState('');
    const {weapons} = getAllWeapons();
    const [currentWeaponName, setCurrentWeaponName] = useState('Select Weapon');

    const filteredOptions = weapons.filter(weapon =>
        weapon.name && weapon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDropdownSelection = (weapon : Weapon) => {
        alert(`Selected: ${weapon.name} with ID: ${weapon.id}`);
    };

    useEffect(() => {
        const fetchWeaponName = async () => {
            const name = await getCurrentWeaponName();
            setCurrentWeaponName(name);
        };

        fetchWeaponName();
    }, []);

    return (
            <Dropdown>
                <Dropdown.Toggle split variant="primary" style={{width: menuWidth, paddingRight: '25px'}}>
                    {currentWeaponName}&nbsp;
                </Dropdown.Toggle>

                <Dropdown.Menu align="start" style={{ width: menuWidth }}>
                <div style={{ textAlign: 'center' }}>
                        <input 
                            type='text'
                            placeholder='Search'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{width: '90%'}}
                        />
                    </div>    
                    {filteredOptions.length > 0 ? (
                    filteredOptions.map((weapon, index) => (
                        <Dropdown.Item key={index} onClick={() => handleDropdownSelection(weapon)}>
                            {weapon.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No options found</Dropdown.Item>
                )}
                </Dropdown.Menu>
        </Dropdown>
    );
}