import { useContext } from "react"
import { LoadoutIDContext, LoadoutsContext } from "../contexts/LoadoutContext";
import Nav from 'react-bootstrap/Nav';

export default function LoadoutNavigationBar()
{
    const { activeLoadoutTab, setActiveLoadoutTab } = useContext(LoadoutIDContext);
    const {loadouts} = useContext(LoadoutsContext);

    const handleTabClick = (index : number) => {
      setActiveLoadoutTab(index);
    };

    const handleNewTabClick = () => {
      alert('tab clicked');
    };
    
    return (
        <Nav variant="tabs" activeKey={activeLoadoutTab.toString()}>
          {loadouts.map((loadout, index) => (
            <Nav.Item key={index}>
                <Nav.Link
                    eventKey={index.toString()}
                    onClick={() => handleTabClick(index)}
                    aria-current={activeLoadoutTab === index ? "page" : undefined}>
                    {'Loadout: ' + loadout.loadoutID}
                </Nav.Link>
            </Nav.Item>
          ))}
          <Nav.Item>
                <Nav.Link
                    onClick={() => handleNewTabClick()}
                    aria-current="page">
                    Create New Loadout
                </Nav.Link>
            </Nav.Item>
        </Nav>
      );
}