import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import { RangedWeaponDetails, MeleeWeaponDetails} from '../../interfaces/WeaponInterfaces';
import { getRangedStatsRows, getMeleeStatsRows } from './WeaponSpecificStats';
import { getDamageByLevel } from './WeaponMethods';

export default function WeaponStatsTable({ weapon }: { weapon: RangedWeaponDetails | MeleeWeaponDetails | null}){
    const [level, setLevel] = useState<number | null>(null);

    return (
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th colSpan={2}>{weapon ? weapon.weaponName : 'No Weapon Selected'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td colSpan={2}>
                    <Dropdown>
                    <Dropdown.Toggle className="w-100" variant="success" id="dropdown-basic">
                        {level ? 'Level ' + level : 'Set level'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {weapon && weapon.weaponDamageByLevel ? (
                            Object.keys(weapon.weaponDamageByLevel).length > 0 ? (
                                Object.entries(weapon.weaponDamageByLevel).map(([level]) => (
                                    <Dropdown.Item 
                                    key={level}
                                    onClick={() => setLevel(Number(level))}>
                                        Level: {level}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>No damage available</Dropdown.Item>
                            )
                        ) : (
                            <Dropdown.Item disabled>Please set weapon first</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            <tr>
                <td>Weapon type:</td>
                <td>{weapon?.weaponType || ''}</td>
            </tr>
            <tr>
                <td>Damage type:</td>
                <td>{weapon?.damageType || ''}</td>
            </tr>
            <tr>
                <td>Damage:</td>
                <td>{level && weapon ? (getDamageByLevel(weapon, level)) : ('')}</td>
            </tr>
            <tr>
                <td>AP cost:</td>
                <td>{weapon?.apCost || ''}</td>
            </tr>
            {getRangedStatsRows(weapon)}
            {getMeleeStatsRows(weapon)}            
          </tbody>
        </Table>
    ); 
}