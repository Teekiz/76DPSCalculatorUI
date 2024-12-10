import {Selectable} from "./SelectableInterface.tsx";

export interface Consumable extends Selectable{
    consumableType: string;
    addictionType: string;
}