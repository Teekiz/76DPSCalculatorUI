import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Table from 'react-bootstrap/Table';
import { WeaponDetails } from '../../interfaces/WeaponInterfaces';

//Creates a card containing extra details.
export default function WeaponSearchCard({weapon}: {weapon: WeaponDetails}){
    return (
    <div className="d-flex justify-content-around">
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{weapon.weaponName}</Card.Title>
            <Card.Text>
            Weapon type: {weapon.weaponType}<br />
            Damage type: {weapon.damageType}<br />
            </Card.Text>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Base Damage</th>
                    </tr>
                </thead>
                <tbody>
                    {weapon.weaponDamageByLevel && Object.entries(weapon.weaponDamageByLevel).map(([level, damage]) => (
                        <tr key={level}>
                            <td>{level}</td>
                            <td>{damage}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>    
        </Card.Body>
        </Card>
    </div>
    );
}

//Creates a placeholder card.
export function PlaceholderWeaponSearchCard(){
    return (
        <div className="d-flex justify-content-around">
            <Card style={{ width: '18rem' }}>
                <Card.Body> 
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                </Card.Body>                 
            </Card>
        </div>
    );
}