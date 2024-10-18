import React, { useContext } from "react"
import { LoadoutContext } from "../contexts/LoadoutContext";

export default function LoadoutNavigationBar()
{
    const { activeLoadoutTab, setActiveLoadoutTab } = useContext(LoadoutContext);
    const loadouts = ["Loadout #1", "Loadout #2", "Loadout #3", "New Loadout"];

    const handleTabClick = (tabNumber: number) => {
      setActiveLoadoutTab(tabNumber);
    };
    //used to determine if the name should include active or not (for bootstrap).
    const getClassName = (tabNumber : number) => {
       return activeLoadoutTab === tabNumber ? 'nav-link active' : 'nav-link';
    };
    
    return (
        <nav aria-label="Loadout navigation">
            <ul className="nav nav-tabs" role="tablist">
              {loadouts.map((loadout, index) => (
                    <li className="nav-item" key={index} role="presentation">
                        <a className={getClassName(index)}
                        onClick={() => handleTabClick(index)}
                        aria-selected={activeLoadoutTab === index} //the tab which is active
                        aria-controls={`loadout-${index}`}
                        href={`#loadout-${index}`}
                        tabIndex={0} role="tab">
                        { loadout }
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}