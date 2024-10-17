import React, { useState } from "react"

export default function LoadoutNavigationBar()
{
    const loadouts = ["Loadout #1", "Loadout #2", "Loadout #3", "New Loadout"]
    const [activeLoadoutTab, setActiveLoadoutTab] = useState<number>(0)
    const handleTabClick = (tabNumber: number) => {
      setActiveLoadoutTab(tabNumber);
    };
    //used to determine if the name should include active or not (for bootstrap).
    const getClassName = (tabNumber : number) => {
       return activeLoadoutTab === tabNumber ? 'nav-link active' : 'nav-link';
    };
    
    return (
        <ul className="nav nav-tabs">
          {loadouts.map((loadout, index) => (
                <li className="nav-item" key={index}>
                    <a className={getClassName(index)}
                        onClick={() => handleTabClick(index)}>
                        { loadout }
                    </a>
                </li>
            ))}
        </ul>
    );
}