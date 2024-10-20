import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { MeleeWeaponDetails, RangedWeaponDetails, WeaponBasic, WeaponDetails } from '../../interfaces/WeaponInterfaces';
import { getAllWeapons, getWeaponDetails, setWeapon } from './WeaponApiService';
import WeaponSearchCard, {PlaceholderWeaponSearchCard} from './WeaponSearchCard';

export default function WeaponSearchComponent({weapon, loadoutID}: {weapon: RangedWeaponDetails | MeleeWeaponDetails | null, loadoutID: number}) {

    const menuWidth = "200px";
    const [searchTerm, setSearchTerm] = useState('');
    const {weapons} = getAllWeapons();

    const [hoveredWeapon, setHoveredWeapon] = useState<WeaponDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const filteredOptions = weapons.filter(weapon =>
        weapon.weaponName && weapon.weaponName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //used to set the button label
    const buttonName = (): string => {
        return weapon && weapon.weaponName.length > 1 ? 'Change weapon ' : 'Set weapon ';
    }

    //EVENTS
    //used when the user clicks on an option in the dropdown menu*
    const handleDropdownSelection = (weapon : WeaponBasic) => {
        setWeapon(weapon.weaponID, weapon.weaponName, loadoutID);
    };

    //used when the user hovers over an option in the dropdown menu
    const handleMouseEnter = async (weapon: WeaponBasic) => {
        try{
            setLoading(true);
            const weaponDetails = await getWeaponDetails(weapon.weaponName);
            setHoveredWeapon(weaponDetails);
        } catch (error) {
            console.error('Error fetching weapon details:', error);
        } finally {
            setLoading(false);
        }
    };

    //used when the user leaves an option in the dropdown menu*
    const handleMouseLeave = () => {
        setHoveredWeapon(null);
    };

    return (
        <div className="d-flex align-items-start">
                <Dropdown>
                    <Dropdown.Toggle split variant="primary" style={{width: menuWidth, paddingRight: '25px'}}>
                        {buttonName()}
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
                            <Dropdown.Item 
                            key={index} 
                            onClick={() => handleDropdownSelection(weapon)}
                            onMouseEnter={() => handleMouseEnter(weapon)}
                            onMouseLeave={handleMouseLeave}
                            >
                                {weapon.weaponName}
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item disabled>No options found</Dropdown.Item>
                    )}
                    </Dropdown.Menu>
            </Dropdown>

            {/* Displays a WeaponSearchCard if available */}
            <div style={{ marginLeft: '10px' }}>
                {hoveredWeapon && !loading && (
                    <WeaponSearchCard weapon={hoveredWeapon} />
                )}
                {/* Displays a Placeholder while loading */}
                {loading && (
                    <PlaceholderWeaponSearchCard />
                )}
            </div>
        </div>
    );
}