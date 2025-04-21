import '@testing-library/jest-dom';
import {renderWithQueryClient} from "../../../../util/testingUtility/TestQueryClient";
import {fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerStatsForm from '../implementation/PlayerStatsForm'
import {Specials} from "../../../../interfaces/SpecialsInterface";
import {Player} from "../../../../interfaces/PlayerInterface";

jest.mock("axios")

jest.mock('../../../../stores/LoadoutSlice', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('../../../../stores/CharacterSlice.tsx', () => ({
    __esModule: true,
    default: jest.fn(),
}));

import useLoadoutStore from '../../../../stores/LoadoutSlice';
import useCharacterStore from '../../../../stores/CharacterSlice';

const mockUseLoadoutStore = useLoadoutStore as unknown as jest.Mock;
const mockUseCharacterStore = useCharacterStore as unknown as jest.Mock;

const mockChangeSpecials = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { mutations: [] } })
    );
});

describe('PlayerStatsForm', () => {
    it('increased special - accepted range', async () => {
        mockLoadout(mockPlayer(mockSpecials([])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const button = screen.getByLabelText('Increase agility by one point.');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        const expectedSpecials = mockSpecials([1,1,1,1,1,2,1]);

        await waitFor(() =>
            expect(mockChangeSpecials).toHaveBeenCalledWith(expectedSpecials)
        );
    });

    it('increased special - max range', async () => {
        mockLoadout(mockPlayer(mockSpecials([1,1,1,1,1,15,1])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const button = screen.getByLabelText('Increase agility by one point.');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        await waitFor(() =>
            expect(mockChangeSpecials).not.toHaveBeenCalled()
        );
    });

    it('decrease special - accepted range', async () => {
        mockLoadout(mockPlayer(mockSpecials([1,1,1,1,1,2,1])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const button = screen.getByLabelText('Decrease agility by one point.');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        const expectedSpecials = mockSpecials([1,1,1,1,1,1,1]);

        await waitFor(() =>
            expect(mockChangeSpecials).toHaveBeenCalledWith(expectedSpecials)
        );
    });

    it('decrease special - min range', async () => {
        mockLoadout(mockPlayer(mockSpecials([1,1,1,1,1,1,1])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const button = screen.getByLabelText('Decrease agility by one point.');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        await waitFor(() =>
            expect(mockChangeSpecials).not.toHaveBeenCalled()
        );
    });

    it('change special value - increase', async () => {
        mockLoadout(mockPlayer(mockSpecials([1,1,1,1,1,1,1])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const textField = screen.getByLabelText('Change perception value.').querySelector('input');
        expect(textField).toBeInTheDocument();

        await userEvent.clear(textField!);
        await userEvent.type(textField!, String(5));
        fireEvent.blur(textField!);

        const expectedSpecials = mockSpecials([1,5,1,1,1,1,1]);

        await waitFor(() =>
            expect(mockChangeSpecials).toHaveBeenCalledWith(expectedSpecials)
        );
    });

    it('change special value - increase maximum', async () => {
        mockLoadout(mockPlayer(mockSpecials([1,1,1,1,1,1,1])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const textField = screen.getByLabelText('Change perception value.').querySelector('input');
        expect(textField).toBeInTheDocument();

        await userEvent.clear(textField!);
        await userEvent.type(textField!, String(20));
        fireEvent.blur(textField!);

        const expectedSpecials = mockSpecials([1,15,1,1,1,1,1]);

        await waitFor(() =>
            expect(mockChangeSpecials).toHaveBeenCalledWith(expectedSpecials)
        );
    });

    it('change special value - decrease', async () => {
        mockLoadout(mockPlayer(mockSpecials([1,1,10,1,1,1,1])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const textField = screen.getByLabelText('Change endurance value.').querySelector('input');
        expect(textField).toBeInTheDocument();

        await userEvent.clear(textField!);
        await userEvent.type(textField!, String(8));
        fireEvent.blur(textField!);

        const expectedSpecials = mockSpecials([1,1,8,1,1,1,1]);

        await waitFor(() =>
            expect(mockChangeSpecials).toHaveBeenCalledWith(expectedSpecials)
        );
    });

    it('changing multiple specials at once', async () => {
        mockLoadout(mockPlayer(mockSpecials([1,6,10,1,4,12,3])))
        mockCharacterStore();
        renderWithQueryClient(<PlayerStatsForm />);

        const decreaseAgilityButton = screen.getByLabelText('Decrease agility by one point.');
        const increaseStrengthButton = screen.getByLabelText('Increase strength by one point.');
        const decreaseIntelligenceButton = screen.getByLabelText('Decrease intelligence by one point.');

        fireEvent.click(decreaseAgilityButton);
        fireEvent.click(decreaseAgilityButton);
        fireEvent.click(increaseStrengthButton);
        fireEvent.click(decreaseAgilityButton);
        fireEvent.click(decreaseIntelligenceButton);
        fireEvent.click(increaseStrengthButton);

        const expectedSpecials = mockSpecials([3,6,10,1,4,9,3]);

        await waitFor(() =>
            expect(mockChangeSpecials).toHaveBeenCalledWith(expectedSpecials)
        );
    });
});

const mockLoadout = (player?: Player) => {
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { player } })
    );
};

const mockCharacterStore = () => {
    mockUseCharacterStore.mockImplementation((selector) =>
        selector({
            changeSpecials: mockChangeSpecials,
        })
    );
};


const mockPlayer = (specials: Specials): Player => ({
    maxHP: 100,
    currentHP: 100,
    specials,
});

const mockSpecials = ([strength = 1, perception = 1, endurance = 1, intelligence = 1, charisma = 1, agility = 1, luck = 1,]:
                          number[]): Specials => ({strength, perception, endurance, intelligence, charisma, agility, luck,
});
