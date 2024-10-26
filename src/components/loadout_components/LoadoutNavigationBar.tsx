import Nav from 'react-bootstrap/Nav';
import useLoadoutStore from "../../stores/LoadoutsStore.tsx";
export default function LoadoutNavigationBar()
{
    const loadouts = useLoadoutStore(state => state.loadouts);
    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const changeActiveLoadout = useLoadoutStore(state => state.actions.loadoutActions.changeActiveLoadout);
    const addLoadout = useLoadoutStore(state => state.actions.loadoutActions.addLoadout);

    const handleTabClick = (index : number) => {
        changeActiveLoadout(index);
    };

    //adds a new loadout to the list
    const handleNewTabClick = async () => {
          await addLoadout();
    };

    return (
        <Nav variant="tabs" activeKey={activeLoadout?.loadoutID.toString()}>
          {loadouts.map((loadout, index) => (
            <Nav.Item key={loadout.loadoutID}>
                <Nav.Link
                    eventKey={index.toString()}
                    onClick={() => handleTabClick(index)}
                    aria-current={activeLoadout?.loadoutID === index ? "page" : undefined}>
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