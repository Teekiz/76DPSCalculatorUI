import '@testing-library/jest-dom';
import { renderWithQueryClient } from "../../../../util/testingUtility/TestQueryClient";
import {fireEvent, screen, waitFor} from '@testing-library/react';
import { PerkSelectionGrid } from "../implementation/PerkSelectionGrid";
import { getAllPerks } from "../../../../api/PerkApiService";
import { Perk } from '../../../../interfaces/PerkInterface';
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
jest.mock('../../../../api/PerkApiService', () => ({
    getAllPerks: jest.fn()
}));

import useLoadoutStore from '../../../../stores/LoadoutSlice';
import useCharacterStore from '../../../../stores/CharacterSlice';

const mockUseLoadoutStore = useLoadoutStore as unknown as jest.Mock;
const mockUseCharacterStore = useCharacterStore as unknown as jest.Mock;

const mockAddPerk = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { perks: [] } })
    );
});

describe('PerkSelectionGrid', () => {
    const mockPerkOne = {
        id: 'perkOne',
        name: 'Perk 1',
        description: 'This is the first perk to be tested.',
        special: 'STRENGTH',
        baseCost: 1,
        currentRank: 1,
        maxRank: 1
    }

    const mockPerkTwo = {
        id: 'perkTwo',
        name: 'Perk 2',
        description: 'This is the second perk to be tested.',
        special: 'STRENGTH',
        baseCost: 1,
        currentRank: 1,
        maxRank: 3
    }

    const mockPerkThree = {
        id: 'perkThree',
        name: 'Perk 3',
        description: 'This is the third perk to be tested.',
        special: 'AGILITY',
        baseCost: 2,
        currentRank: 3,
        maxRank: 3
    }

    it('renders all perks as current perks are empty', async () => {
        mockLoadoutWithPerks([]);
        mockAllPerks([mockPerkOne, mockPerkTwo, mockPerkThree])
        renderWithQueryClient(<PerkSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('PERK 1')).toBeInTheDocument();
            expect(screen.getByText('PERK 2')).toBeInTheDocument();
            expect(screen.getByText('PERK 3')).toBeInTheDocument();
        });
    });

    it('renders no perks as all perks are in loadout', async () => {
        mockLoadoutWithPerks([mockPerkOne, mockPerkTwo, mockPerkThree]);
        mockAllPerks([mockPerkOne, mockPerkTwo, mockPerkThree]);
        renderWithQueryClient(<PerkSelectionGrid />);

        await waitFor(() => {
            expect(screen.queryByText('PERK 1')).not.toBeInTheDocument();
            expect(screen.queryByText('PERK 2')).not.toBeInTheDocument();
            expect(screen.queryByText('PERK 3')).not.toBeInTheDocument();
        });
    });

    it('renders some perks as some perks are in loadout', async () => {
        mockLoadoutWithPerks([mockPerkTwo]);
        mockAllPerks([mockPerkOne, mockPerkTwo, mockPerkThree])
        renderWithQueryClient(<PerkSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('PERK 1')).toBeInTheDocument();
            expect(screen.getByText('PERK 3')).toBeInTheDocument();
        });
    });

    it('filters perks by search term', async () => {
        mockLoadoutWithPerks([]);
        mockAllPerks([mockPerkOne, mockPerkTwo, mockPerkThree]);
        renderWithQueryClient(<PerkSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('PERK 1')).toBeInTheDocument();
            expect(screen.getByText('PERK 2')).toBeInTheDocument();
            expect(screen.getByText('PERK 3')).toBeInTheDocument();
        });

        //input
        const input = screen.getByLabelText('Filter perks');
        fireEvent.change(input, { target: { value: 'PERK 1' } });

        //filtering all so only PERK 1 is visible
        await waitFor(() => {
            expect(screen.getByText('PERK 1')).toBeInTheDocument();
            expect(screen.queryByText('PERK 2')).not.toBeInTheDocument();
            expect(screen.queryByText('PERK 3')).not.toBeInTheDocument();
        });
    });

    it('filters perks by search term with perk in loadout', async () => {
        mockLoadoutWithPerks([mockPerkTwo]);
        mockAllPerks([mockPerkOne, mockPerkTwo, mockPerkThree]);
        renderWithQueryClient(<PerkSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('PERK 1')).toBeInTheDocument();
            expect(screen.queryByText('PERK 2')).not.toBeInTheDocument();
            expect(screen.getByText('PERK 3')).toBeInTheDocument();
        });

        //input
        const input = screen.getByLabelText('Filter perks');
        fireEvent.change(input, { target: { value: 'PERK 1' } });

        //filtering all so only PERK 1 is visible
        await waitFor(() => {
            expect(screen.getByText('PERK 1')).toBeInTheDocument();
            expect(screen.queryByText('PERK 2')).not.toBeInTheDocument();
            expect(screen.queryByText('PERK 3')).not.toBeInTheDocument();
        });
    });

    it('add perk', async () => {
        mockLoadoutWithPerks([], mockPlayer(mockSpecials([3])));
        mockAllPerks([mockPerkOne, mockPerkTwo, mockPerkThree]);
        mockCharacterStore();
        renderWithQueryClient(<PerkSelectionGrid />);

        const perkCard = screen.getByText('PERK 1').closest('.MuiCard-root') as HTMLElement;
        fireEvent.click(perkCard);

        await waitFor(() =>
            expect(mockAddPerk).toHaveBeenCalledWith(mockPerkOne)
        );
    });

    it('add perk with insufficient points', async () => {
        mockLoadoutWithPerks([], mockPlayer(mockSpecials([])));
        mockAllPerks([mockPerkOne, mockPerkTwo, mockPerkThree]);
        mockCharacterStore();
        renderWithQueryClient(<PerkSelectionGrid />);

        const perkCard = screen.getByText('PERK 3').closest('.MuiCard-root') as HTMLElement;
        fireEvent.click(perkCard);

        await waitFor(() =>
            expect(mockAddPerk).not.toHaveBeenCalled()
        );
    });
});

const mockLoadoutWithPerks = (perks: Perk[], player?: Player) => {
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { perks, player } })
    );
};

const mockCharacterStore = () => {
    mockUseCharacterStore.mockImplementation((selector) =>
        selector({
            addPerk: mockAddPerk,
        })
    );
};

const mockAllPerks = (perks: Perk[]) => {
    (getAllPerks as jest.Mock).mockResolvedValue(perks);
}

const mockPlayer = (specials: Specials): Player => ({
    maxHP: 100,
    currentHP: 100,
    specials,
});

const mockSpecials = ([strength = 1, perception = 1, endurance = 1, intelligence = 1, charisma = 1, agility = 1, luck = 1,]:
                          number[]): Specials => ({strength, perception, endurance, intelligence, charisma, agility, luck,
});
