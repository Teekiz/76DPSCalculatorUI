import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function LoadoutDataAccordion() {

    const menuWidth = "200px";
    const availableWeapons = ["10MM", "GAUSS"];
    const [searchTerm, setSearchTerm] = useState('');
    const filteredOptions = availableWeapons.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleDropdownSelection = (index: Number, value : Number) => ("frerfref");

    return (
            <Dropdown>
                <Dropdown.Toggle split variant="primary" style={{width: menuWidth, paddingRight: '25px'}}>
                    Select Weapon&nbsp;
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
                    filteredOptions.map((option, index) => (
                        <Dropdown.Item key={index} onClick={() => alert(option)}>
                            {option}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No options found</Dropdown.Item>
                )}
                </Dropdown.Menu>
        </Dropdown>
    );
}