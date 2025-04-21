import '@testing-library/jest-dom';
import {createMockWeapon} from "../../../../util/testingUtility/CreateMockWeapon";
import {render, screen, within} from "@testing-library/react";
import WeaponSearchCard, {PlaceholderWeaponSearchCard} from "../implementation/WeaponSearchCard";

describe('WeaponSearchCard', () => {
    const mockWeapon = createMockWeapon('RANGED', {1: 10, 2: 20});
    expect(mockWeapon).not.toBeNull();

    it('should load weapon search card', () => {
        render(<WeaponSearchCard weapon={mockWeapon!}/>);

        expect(screen.getByText('Weapon Two')).toBeInTheDocument();
        expect(screen.getByText('Weapon type: PISTOL', {exact: false})).toBeInTheDocument();
        expect(screen.getByText('Damage type: PHYSICAL', {exact: false})).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(3);

        const secondRow = rows[1];

        expect(within(secondRow).getByText('1')).toBeInTheDocument();
        expect(within(secondRow).getByText('10')).toBeInTheDocument();
    });

    it('should load placeholder card', () => {
        render(<PlaceholderWeaponSearchCard />);
        const skeletons = screen.getAllByTestId('skeleton');
        expect(skeletons).toHaveLength(6);
    });
});