import { useContext } from "react"
import { LoadoutIDContext } from "../contexts/LoadoutContext";
import Nav from 'react-bootstrap/Nav';

export default function LoadoutNavigationBar()
{
    const { activeLoadoutTab, setActiveLoadoutTab } = useContext(LoadoutIDContext);
    const loadouts = ["Loadout #1", "Loadout #2", "Loadout #3", "New Loadout"];

    const handleTabClick = (index : number) => {
      setActiveLoadoutTab(index);
    };
    
    return (
        <Nav variant="tabs" activeKey={activeLoadoutTab.toString()}>
          {loadouts.map((loadout, index) => (
            <Nav.Item key={index}>
                <Nav.Link
                    eventKey={index.toString()}
                    onClick={() => handleTabClick(index)}
                    aria-current={activeLoadoutTab === index ? "page" : undefined}>
                    {loadout}
                </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      );
}