import { useState, useEffect } from 'react';
import { MeleeWeaponDetails, RangedWeaponDetails, WeaponBasic, WeaponDetails } from '../../../interfaces/WeaponInterfaces.tsx';
import { getAllWeapons, getWeaponDetails } from '../../../api/WeaponApiService.tsx';
import WeaponSearchCard, {PlaceholderWeaponSearchCard} from './WeaponSearchCard.tsx';

import { Autocomplete, TextField, Box, CircularProgress } from '@mui/material';

export default function WeaponSearchComponent({
    weapon, 
    onWeaponSelect
}: {
    weapon: RangedWeaponDetails | MeleeWeaponDetails | null | undefined,
    onWeaponSelect: (weapon: WeaponBasic) => void }) {

    const menuWidth = "200px";
    const [searchTerm, setSearchTerm] = useState('');
    const [weapons, setWeapons] = useState<WeaponBasic[]>([]);

    const [hoveredWeapon, setHoveredWeapon] = useState<WeaponDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [weaponDetailsCache, setWeaponDetailsCache] = useState<{ [weaponName: string]: WeaponDetails }>({});

    //loads the weapons data from the API.
    useEffect(() => {
        const fetchWeapons = async () => {
            const weaponsData = await getAllWeapons();
            setWeapons(weaponsData);
        }
        fetchWeapons();
    }, []);

    const filteredOptions = weapons.filter(weapon =>
        weapon.weaponName && weapon.weaponName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //used to set the button label
    const buttonName = (): string => {
        return weapon && weapon.weaponName.length > 1 ? 'Change weapon ' : 'Set weapon ';
    }

    //EVENTS
    //used when the user clicks on an option in the dropdown menu
    const handleDropdownSelection = (weapon : WeaponBasic) => {
        setHoveredWeapon(null);
        onWeaponSelect(weapon);
    };

    //used when the user hovers over an option in the dropdown menu
    const handleMouseEnter = async (weapon: WeaponBasic) => {
        //uses a cached version of the weapon if it already exists
        if (weaponDetailsCache[weapon.weaponName]){
            setHoveredWeapon(weaponDetailsCache[weapon.weaponName]);
            return;
        }
        try{
            setLoading(true);
            const weaponDetails = await getWeaponDetails(weapon.weaponName);
            setHoveredWeapon(weaponDetails);
            setWeaponDetailsCache((previous) => ({
                ...previous,
                [weapon.weaponName]: weaponDetails
            }));
        } catch (error) {
            console.error('Error fetching weapon details:', error);
        } finally {
            setLoading(false);
        }
    };

    //used when the user leaves an option in the dropdown menu
    const handleMouseLeave = () => {
        setHoveredWeapon(null);
    };

    return (
        <div className="d-flex align-items-start">
            <Autocomplete
                options={filteredOptions}
                getOptionLabel={(option) => option.weaponName || ''}
                onChange={(_event, newValue) => newValue && handleDropdownSelection(newValue)}
                onInputChange={(_event, newInputValue) => setSearchTerm(newInputValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={buttonName()}
                        variant="outlined"
                        fullWidth
                    />
                )}
                style={{ width: menuWidth }}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        onMouseEnter={() => handleMouseEnter(option)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {option.weaponName}
                    </Box>
                )}
                noOptionsText="No options found"
            />
            {/* Displays a weapon search card placeholder */}
            <div style={{ marginLeft: '10px' }}>
                {hoveredWeapon && !loading && (
                    <WeaponSearchCard weapon={hoveredWeapon} />
                )}
                {loading && (
                    <PlaceholderWeaponSearchCard />
                )}
                {loading && <CircularProgress size={24} />}
            </div>
        </div>
    );
}
