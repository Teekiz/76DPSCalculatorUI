import { useContext } from "react"
import { LoadoutIDContext, LoadoutsContext } from "../contexts/LoadoutContext";
import { getLoadout } from "../api/LoadoutApiService";
import Nav from 'react-bootstrap/Nav';

export default function LoadoutNavigationBar()
{
    const { activeLoadoutTab, setActiveLoadoutTab } = useContext(LoadoutIDContext);
    const {loadouts, setLoadouts} = useContext(LoadoutsContext);

    const handleTabClick = (index : number) => {
      setActiveLoadoutTab(index);
    };

    //adds a new loadout to the list
    const handleNewTabClick = async () => {
      const newLoadout = await getLoadout(loadouts.length + 1);
      if(newLoadout != null){
        setLoadouts([...loadouts, newLoadout]);
      }
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