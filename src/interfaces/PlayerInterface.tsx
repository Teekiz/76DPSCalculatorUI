import {Specials} from "./SpecialsInterface.tsx";

export interface Player {
    maxHP: number;
    currentHP: number;
    specials: Specials;
}