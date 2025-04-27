import '@testing-library/jest-dom';
import {screen, waitFor} from "@testing-library/react";
import {render} from "@testing-library/react";
import {createMockWeapon} from "../../../../util/testingUtility/CreateMockWeapon";
import WeaponStatsTable from "../implementation/WeaponStatsTable";
import userEvent from "@testing-library/user-event";

describe('weapon stats table', () => {
    describe('WeaponStatsTable', () => {
        const rangedWeapon = createMockWeapon('RANGED', {1: 10, 2: 20, 3: 30});
        const meleeWeapon = createMockWeapon('MELEE', {1: 15, 2: 25, 3: 35});
        const nullDamageValues = createMockWeapon('RANGED');

        it('displays a weapon table', () => {
            render(<WeaponStatsTable weapon={rangedWeapon}/>);
            expect(screen.getByText('Weapon Two')).toBeInTheDocument();

            expect(screen.getByLabelText('Set level')).toBeInTheDocument();

            expect(screen.getByText('Weapon type:')).toBeInTheDocument();
            expect(screen.getByText('PISTOL')).toBeInTheDocument();

            expect(screen.getByText('Damage type:')).toBeInTheDocument();
            expect(screen.getByText('PHYSICAL')).toBeInTheDocument();

            expect(screen.getByText('Damage:')).toBeInTheDocument();
        });

        it('displays a weapon table - with no values', () => {
            render(<WeaponStatsTable weapon={null}/>);
            expect(screen.getByText('No Weapon Selected')).toBeInTheDocument();

            expect(screen.getByText('Weapon type:')).toBeInTheDocument();
            expect(screen.getByText('Damage type:')).toBeInTheDocument();
            expect(screen.getByText('Damage:')).toBeInTheDocument();
        });

        it('displays a weapon table - with ranged weapon', () => {
            render(<WeaponStatsTable weapon={rangedWeapon}/>);
            expect(screen.getByText('Weapon Two')).toBeInTheDocument();

            expect(screen.getByText('Fire rate:')).toBeInTheDocument();
            expect(screen.getByText('10')).toBeInTheDocument();
        });

        //todo - update this one melee weapons are implemented.
        it('displays a weapon table - with melee weapon', () => {
            render(<WeaponStatsTable weapon={meleeWeapon}/>);
            expect(screen.getByText('Weapon One')).toBeInTheDocument();
        });

        it('select weapon level', async () => {
            render(<WeaponStatsTable weapon={rangedWeapon}/>);

            const inputButton = screen.getByLabelText('Set level');
            expect(inputButton).toBeInTheDocument();
            await userEvent.click(inputButton);

            await waitFor(() => {
                expect(screen.getByText('Level: 1')).toBeInTheDocument();
                expect(screen.getByText('Level: 2')).toBeInTheDocument();
                expect(screen.getByText('Level: 3')).toBeInTheDocument();
            });

            const menuItem = screen.getByText('Level: 3') as HTMLElement;
            await userEvent.click(menuItem);

            expect(screen.getByText('Level 3')).toBeInTheDocument();

            expect(screen.getByText('Damage:')).toBeInTheDocument();
            expect(screen.getByText('30')).toBeInTheDocument();
        });

        it('select weapon level - with null values', async () => {
            render(<WeaponStatsTable weapon={nullDamageValues}/>);

            const inputButton = screen.getByLabelText('Set level');
            expect(inputButton).toBeInTheDocument();
            await userEvent.click(inputButton);

            await waitFor(() => {
                expect(screen.getByText('No damage available')).toBeInTheDocument();
            });
        });

        it('select weapon level - null weapon', async () => {
            render(<WeaponStatsTable weapon={null}/>);

            const inputButton = screen.getByLabelText('Set level');
            expect(inputButton).toBeInTheDocument();
            await userEvent.click(inputButton);

            await waitFor(() => {
                expect(screen.getByText('Please set weapon first')).toBeInTheDocument();
            });
        });
    });
});