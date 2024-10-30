import useLoadoutStore from "../../stores/LoadoutsStore.tsx";
import {SyntheticEvent} from "react";

import { Tabs, Tab, Box } from '@mui/material';

export default function LoadoutNavigationBar()
{
    const loadouts = useLoadoutStore(state => state.loadouts);
    const activeLoadout = useLoadoutStore(state => state.activeLoadout);
    const changeActiveLoadout = useLoadoutStore(state => state.actions.loadoutActions.changeActiveLoadout);
    const addLoadout = useLoadoutStore(state => state.actions.loadoutActions.addLoadout);

    const handleTabClick = (_event: SyntheticEvent, loadoutID: number) => {
        changeActiveLoadout(loadoutID);
    };

    //adds a new loadout to the list
    const handleNewTabClick = async () => {
          await addLoadout();
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={activeLoadout?.loadoutID}
                onChange={handleTabClick}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Loadout Tabs"
            >

                {loadouts.map((loadout) => (
                    <Tab
                        key={loadout.loadoutID}
                        label={'Loadout: ' + loadout.loadoutID}
                        value={loadout.loadoutID}
                        aria-current={activeLoadout?.loadoutID === loadout.loadoutID ? "page" : undefined}
                    />
                ))}

                <Tab
                    label="Create New Loadout"
                    onClick={handleNewTabClick}
                    value="createNewLoadout"
                    sx={{ ml: 2 }} // Optional margin for spacing
                />
            </Tabs>
        </Box>
      );
}