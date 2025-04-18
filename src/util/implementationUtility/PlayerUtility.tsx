import {Specials} from "../../interfaces/SpecialsInterface";

//a function to determine the specials changed between changes.
export const changedSpecials = (newSpecials: Specials, oldSpecials: Specials): string[] => {
    const changedSpecials: string[] = [];
    Object.keys(newSpecials).forEach((key) => {
        if (newSpecials[key as keyof Specials] !== oldSpecials[key as keyof Specials]) {
            changedSpecials.push(key.toUpperCase());
        }
    });
    return changedSpecials;
}