import {getDamageByLevel, isMeleeWeapon, isRangedWeapon} from "../implementation/WeaponMethods";
import {createMockWeapon} from "../../../../util/testingUtility/CreateMockWeapon";

describe('weapon methods', () => {
    describe('getDamageByLevel', () => {
        it('returns damage for valid level', () => {
            const weapon = createMockWeapon("RANGED", {1: 10, 2: 20});
            expect(getDamageByLevel(weapon, 1)).toBe(10);
            expect(getDamageByLevel(weapon, 2)).toBe(20);
        });

        it('returns 0 for invalid level', () => {
            const weapon = createMockWeapon("RANGED", {1: 10, 2: 20});
            expect(getDamageByLevel(weapon, 3)).toBe(0);
        });

        it('returns 0 for null weapon', () => {
            expect(getDamageByLevel(null, 3)).toBe(0);
        });
    });

    describe('isRangedWeapon', () => {
        it('returns true for ranged weapon', () => {
            const weapon = createMockWeapon("RANGED");
            expect(isRangedWeapon(weapon)).toBe(true);
        });

        it('returns false for melee weapon', () => {
            const weapon = createMockWeapon("MELEE");
            expect(isRangedWeapon(weapon)).toBe(false);
        });

        it('returns false for invalid weapon', () => {
            expect(isRangedWeapon(null)).toBe(false);
        });
    });

    describe('isMeleeWeapon', () => {
        it('returns true for melee weapon', () => {
            const weapon = createMockWeapon("MELEE");
            expect(isMeleeWeapon(weapon)).toBe(true);
        });

        it('returns false for ranged weapon', () => {
            const weapon = createMockWeapon("RANGED");
            expect(isMeleeWeapon(weapon)).toBe(false);
        });

        it('returns false for invalid weapon', () => {
            expect(isMeleeWeapon(null)).toBe(false);
        });
    });
});