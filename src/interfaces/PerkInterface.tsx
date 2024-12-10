import {Selectable} from "./SelectableInterface.tsx";

export interface Perk extends Selectable{
    special: string;
    currentRank: number;
    baseCost: number;
    maxRank: number;
    description: string;
}