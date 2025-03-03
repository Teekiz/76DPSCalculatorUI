import { WeaponDetails } from '../../../interfaces/WeaponInterfaces.tsx';

import {
    Card,
    CardContent,
    TableContainer,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell, TableBody, Skeleton, Box
} from '@mui/material';

//Creates a card containing extra details.
export default function WeaponSearchCard({weapon}: {weapon: WeaponDetails}){
    return (
        <div className="d-flex justify-content-around">
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography variant="h5" component="div">{weapon.name}</Typography>
                    <Typography>
                        Weapon type: {weapon.weaponType}<br/>
                        Damage type: {weapon.damageType}<br/>
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Level</TableCell>
                                    <TableCell>Base Damage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {weapon.weaponDamageByLevel && Object.entries(weapon.weaponDamageByLevel).map(([level, damage]) => (
                                    <TableRow key={level}>
                                        <TableCell>{level}</TableCell>
                                        <TableCell>{damage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    );
}

//Creates a placeholder card.
export function PlaceholderWeaponSearchCard() {
    return (
        <Box display="flex" justifyContent="center" mt={2}>
            <Card sx={{ width: '18rem', padding: 2 }}>
                <CardContent>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="70%" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="40%" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="50%" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="80%" height={30} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="90%" height={30} sx={{ mt: 1 }} />
                </CardContent>
            </Card>
        </Box>
    );
}