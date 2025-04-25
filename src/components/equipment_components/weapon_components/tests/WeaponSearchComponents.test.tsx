import '@testing-library/jest-dom';
import {createMockBasicWeapon, createMockWeapon} from "../../../../util/testingUtility/CreateMockWeapon";
import {screen, waitFor, within} from "@testing-library/react";
import WeaponSearchComponent from "../implementation/WeaponSearchComponents";
import {renderWithQueryClient} from "../../../../util/testingUtility/TestQueryClient";
import {getAllWeapons, getWeaponDetails} from "../../../../api/WeaponApiService";
import {WeaponBasic} from "../../../../interfaces/WeaponInterfaces";
import userEvent from "@testing-library/user-event";

jest.mock("axios")

jest.mock('../../../../api/WeaponApiService', () => ({
    getAllWeapons: jest.fn(),
    getWeaponDetails: jest.fn()
}));

const onWeaponSelectMock = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('WeaponSearchComponents', () => {
    const basicWeaponOne = createMockBasicWeapon('Ranged Weapon One');
    const basicWeaponTwo = createMockBasicWeapon('Ranged Weapon Two');
    const basicWeaponThree = createMockBasicWeapon('Melee Weapon One');

    it('should load all weapons', async () => {
        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={null} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Set weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);

        await waitFor(() => {
            expect(screen.getByText('Ranged Weapon One')).toBeInTheDocument();
            expect(screen.getByText('Ranged Weapon Two')).toBeInTheDocument();
            expect(screen.getByText('Melee Weapon One')).toBeInTheDocument();
        });

    });

    it('should filter some weapons - complete match', async () => {
        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={null} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Set weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);
        await userEvent.type(inputButton, 'Ranged Weapon One');

        await waitFor(() => {
            expect(screen.getByText('Ranged Weapon One')).toBeInTheDocument();
            expect(screen.queryByText('Ranged Weapon Two')).not.toBeInTheDocument();
            expect(screen.queryByText('Melee Weapon One')).not.toBeInTheDocument();
        });
    });

    it('should filter some weapons - partial match - case insensitive', async () => {
        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={null} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Set weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);
        await userEvent.type(inputButton, 'ranged weapon');

        await waitFor(() => {
            expect(screen.getByText('Ranged Weapon One')).toBeInTheDocument();
            expect(screen.getByText('Ranged Weapon Two')).toBeInTheDocument();
            expect(screen.queryByText('Melee Weapon One')).not.toBeInTheDocument();
        });
    });

    it('should filter some weapons - partial match - missing start', async () => {
        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={null} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Set weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);
        await userEvent.type(inputButton, 'weapon o');

        await waitFor(() => {
            expect(screen.getByText('Ranged Weapon One')).toBeInTheDocument();
            expect(screen.queryByText('Ranged Weapon Two')).not.toBeInTheDocument();
            expect(screen.getByText('Melee Weapon One')).toBeInTheDocument();
        });
    });

    it('should filter all weapons - no matching weapons', async () => {
        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={null} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Set weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);
        await userEvent.type(inputButton, 'not a real weapon here');

        await waitFor(() => {
            expect(screen.queryByText('Ranged Weapon One')).not.toBeInTheDocument();
            expect(screen.queryByText('Ranged Weapon Two')).not.toBeInTheDocument();
            expect(screen.queryByText('Melee Weapon One')).not.toBeInTheDocument();
            expect(screen.getByText('No options found')).toBeInTheDocument();
        });
    });

    it('search with weapon already set', async () => {
        const currentMockWeapon = createMockWeapon("RANGED");
        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={currentMockWeapon} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Change weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);
        await userEvent.type(inputButton, 'Ranged Weapon');

        await waitFor(() => {
            expect(screen.getByText('Ranged Weapon One')).toBeInTheDocument();
            expect(screen.getByText('Ranged Weapon Two')).toBeInTheDocument();
            expect(screen.queryByText('Melee Weapon One')).not.toBeInTheDocument();
        });
    });

    it('hover over result', async () => {
        const hoveredWeapon = createMockWeapon('RANGED', {1: 10, 2: 20});
        //this should result in the hovered card becoming hovered weapon
        (getWeaponDetails as jest.Mock).mockResolvedValue(hoveredWeapon);

        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={null} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Set weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);

        const option = screen.getByText('Ranged Weapon One');
        expect(option).toBeInTheDocument();
        await userEvent.hover(option);

        await waitFor(() => {
            expect(screen.getByText('Weapon Two')).toBeInTheDocument();
            expect(screen.getByText('Weapon type: PISTOL', {exact: false})).toBeInTheDocument();
            expect(screen.getByText('Damage type: PHYSICAL', {exact: false})).toBeInTheDocument();

            const rows = screen.getAllByRole('row');
            expect(rows).toHaveLength(3);

            const secondRow = rows[1];

            expect(within(secondRow).getByText('1')).toBeInTheDocument();
            expect(within(secondRow).getByText('10')).toBeInTheDocument();
        });
    });

    it('hover over result - clicking result', async () => {
        const hoveredWeapon = createMockWeapon('RANGED', {1: 10, 2: 20});
        //this should result in the hovered card becoming hovered weapon
        (getWeaponDetails as jest.Mock).mockResolvedValue(hoveredWeapon);

        mockAllWeapons([basicWeaponOne, basicWeaponTwo, basicWeaponThree]);
        renderWithQueryClient(<WeaponSearchComponent weapon={null} onWeaponSelect={onWeaponSelectMock}/>);

        const inputButton = screen.getByLabelText('Set weapon');
        expect(inputButton).toBeInTheDocument();
        await userEvent.click(inputButton);

        const option = screen.getByText('Ranged Weapon One');
        expect(option).toBeInTheDocument();
        await userEvent.hover(option);
        await userEvent.click(option);

        await waitFor(() => {
            expect(onWeaponSelectMock).toHaveBeenCalledWith(expect.objectContaining(basicWeaponOne));
        });
    });
});

const mockAllWeapons = (weapons: WeaponBasic[]) => {
    (getAllWeapons as jest.Mock).mockResolvedValue(weapons);
}
