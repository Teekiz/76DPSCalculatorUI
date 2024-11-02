export function PrimaryCardColour(special: string): string {
    switch (special.toLowerCase()) {
        case 'strength': return '#637e65';
        case 'perception': return '#d3973d';
        case 'endurance': return '#599da5';
        case 'charisma': return '#83781c';
        case 'intelligence': return '#737272';
        case 'agility': return '#ac3836';
        case 'luck': return '#8b6293';
        default: return '#ffffff'
    }
}

export function SecondaryCardColour(special: string): string {
    switch (special.toLowerCase()) {
        case 'strength': return '#a5d6a7';
        case 'perception': return '#ffb74d';
        case 'endurance': return '#80deea';
        case 'charisma': return '#ffeb3b';
        case 'intelligence': return '#bdbdbd';
        case 'agility': return '#ef5350';
        case 'luck': return '#ce93d8';
        default: return '#ffffff'
    }
}