import '@testing-library/jest-dom';
import {screen} from "@testing-library/react";
import {render} from "@testing-library/react";
import {createMockWeapon} from "../../../../util/testingUtility/CreateMockWeapon";
import {getRangedStatsRows, getMeleeStatsRows} from "../implementation/WeaponSpecificStats";
import { TableBody } from '@mui/material';

describe('weapon specific stats', () => {
    describe('getRangedStatsRows', () => {
        it('returns a table row with fire rate.', () => {
            const weapon = createMockWeapon("RANGED", {1: 10, 2: 20});
            render(
                <table>
                    <TableBody>{getRangedStatsRows(weapon)}</TableBody>
                </table>
            );

            expect(screen.getByText('Fire rate:')).toBeInTheDocument();
            expect(screen.getByText('10')).toBeInTheDocument();
        });

        it('returns null for invalid weapon type.', () => {
            const weapon = createMockWeapon("MELEE", {1: 10, 2: 20});
            const result = getRangedStatsRows(weapon);
            expect(result).toBeNull();
        });
    });

    //todo - update these tests when melee is implemented
    describe('getMeleeStatsRows', () => {
        it('returns null for valid melee weapon.', () => {
            const weapon = createMockWeapon("MELEE", {1: 10, 2: 20});
            const result = getMeleeStatsRows(weapon);
            expect(result).toBeNull();
        });

        it('returns null for invalid weapon type.', () => {
            const weapon = createMockWeapon("RANGED", {1: 10, 2: 20});
            const result = getMeleeStatsRows(weapon);
            expect(result).toBeNull();
        });
    });
});