import { useState } from 'react';
import { MeleeWeaponDetails, RangedWeaponDetails, WeaponBasic, WeaponDetails } from '../../../interfaces/WeaponInterfaces.tsx';
import { getAllWeapons, getWeaponDetails } from '../../../api/WeaponApiService.tsx';
import WeaponSearchCard, {PlaceholderWeaponSearchCard} from './WeaponSearchCard.tsx';

import { Autocomplete, TextField, Box, CircularProgress } from '@mui/material';
import {useQuery, useQueryClient} from "react-query";

export default function WeaponSearchComponent({
    weapon, 
    onWeaponSelect
}: {
    weapon: RangedWeaponDetails | MeleeWeaponDetails | null | undefined,
    onWeaponSelect: (weapon: WeaponBasic) => void }) {

    const menuWidth = "200px";
    const [searchTerm, setSearchTerm] = useState('');
    const { data: weapons} = useQuery<WeaponBasic[]>('weapons', getAllWeapons);
    const queryClient = useQueryClient();

    const [hoveredWeapon, setHoveredWeapon] = useState<WeaponDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const filteredOptions = weapons?.filter(weapon =>
        weapon.name && weapon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    //used to set the button label
    const buttonName = (): string => {
        return weapon && weapon.name.length > 1 ? 'Change weapon ' : 'Set weapon ';
    }

    //EVENTS
    //used when the user clicks on an option in the dropdown menu
    const handleDropdownSelection = (weapon : WeaponBasic) => {
        setHoveredWeapon(null);
        onWeaponSelect(weapon);
    };

    //used when the user hovers over an option in the dropdown menu
    const handleMouseEnter = async (weapon: WeaponBasic) => {
        setLoading(true);
        try {
            const queryKey = ['weaponDetails', weapon];
            const cachedWeaponDetails = queryClient.getQueryData<WeaponDetails>(queryKey);
            if (cachedWeaponDetails) {
                setHoveredWeapon(cachedWeaponDetails);
            } else {
                const weaponDetails = await queryClient.fetchQuery<WeaponDetails>(queryKey, () => getWeaponDetails(weapon));
                setHoveredWeapon(weaponDetails);
            }
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
        <div className="d-flex align-items-start" style={{ gap: '10px' }}>
            <Autocomplete
                options={filteredOptions}
                getOptionLabel={(option) => option.name || ''}
                onChange={(_event, newValue) => {
                    if (newValue) {
                        handleDropdownSelection(newValue);
                        setSearchTerm(''); // Clear input if needed
                    }
                }}
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
                renderOption={(props, option) => {
                    const { key, ...rest } = props;  // Destructure 'key' separately
                    return (
                        <Box
                            component="li"
                            key={key}    // Pass 'key' directly
                            {...rest}    // Spread the remaining props
                            onMouseEnter={() => handleMouseEnter(option)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {option.name}
                        </Box>
                    );
                }}
                noOptionsText="No options found"
            />

            {/* Weapon details or loading indicators */}
            <div>
                {loading ? (
                    <>
                        <PlaceholderWeaponSearchCard />
                        <CircularProgress size={24} style={{ display: 'block', margin: '10px auto' }} />
                    </>
                ) : (
                    hoveredWeapon && <WeaponSearchCard weapon={hoveredWeapon} />
                )}
            </div>
        </div>
    );
}
