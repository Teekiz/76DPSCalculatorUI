import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import { PerkActiveGrid } from "../implementation/PerkActiveGrid";
import { Perk } from '../../../../interfaces/PerkInterface';
import { Player } from "../../../../interfaces/PlayerInterface";
import { Specials } from "../../../../interfaces/SpecialsInterface";

jest.mock('../../../../stores/LoadoutSlice.tsx', () => ({
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

const mockRemovePerk = jest.fn();
const mockChangePerkRank = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('PerkActiveGrid', () => {
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
        special: 'STRENGTH',
        baseCost: 2,
        currentRank: 3,
        maxRank: 3
    }

    const mockPerkFour = {
        id: 'perkFour',
        name: 'Perk 4',
        description: 'This is the fourth perk to be tested.',
        special: 'AGILITY',
        baseCost: 2,
        currentRank: 3,
        maxRank: 3
    }

    it('renders no perks as perks list is empty', () => {
        mockLoadoutWithPerks([]);
        mockCharacterStore();
        render(<PerkActiveGrid />);
        expect(screen.getByText('No Active Perks')).toBeInTheDocument();
    });

    it('renders first perk', () => {
        mockLoadoutWithPerks([mockPerkOne]);
        render(<PerkActiveGrid/>);

        const perkCard = screen.getByText('PERK 1').closest('.MuiCard-root') as HTMLElement;
        const perkStarButton = within(perkCard!).getByRole('button', { name: /rank 1/i });

        expect(perkCard).toBeInTheDocument();
        expect(perkStarButton).toBeInTheDocument();
        expect(screen.queryByText('PERK 2')).not.toBeInTheDocument();
    });

    it('renders all perks', () => {
        mockLoadoutWithPerks([mockPerkOne, mockPerkTwo, mockPerkThree, mockPerkFour]);
        render(<PerkActiveGrid />);
        expect(screen.getByText('PERK 1')).toBeInTheDocument();
        expect(screen.getByText('PERK 2')).toBeInTheDocument();
    });

    it('changes perk rank', async () => {
        mockLoadoutWithPerks([mockPerkTwo], mockPlayer(mockSpecials([3])));
        mockCharacterStore();
        render(<PerkActiveGrid />);

        const perkCard = screen.getByText('PERK 2').closest('.MuiCard-root') as HTMLElement;
        const perkStarButton = within(perkCard!).getByRole('button', { name: /rank 2/i });

        fireEvent.click(perkStarButton);
        await waitFor(() =>
            expect(mockChangePerkRank).toHaveBeenCalledWith(mockPerkTwo, 2)
        );
    });

    it('changes perk rank but with insufficient specials', async () => {
        mockLoadoutWithPerks([mockPerkTwo], mockPlayer(mockSpecials([1])));
        mockCharacterStore();
        render(<PerkActiveGrid />);

        const perkCard = screen.getByText('PERK 2').closest('.MuiCard-root') as HTMLElement;
        const perkStarButton = within(perkCard!).getByRole('button', { name: /rank 2/i });

        fireEvent.click(perkStarButton);
        await waitFor(() =>
            expect(mockChangePerkRank).not.toHaveBeenCalled()
        );
    });

    it('changes perk rank but set to current rank', async () => {
        mockLoadoutWithPerks([mockPerkTwo], mockPlayer(mockSpecials([])));
        mockCharacterStore();
        render(<PerkActiveGrid />);

        const perkCard = screen.getByText('PERK 2').closest('.MuiCard-root') as HTMLElement;
        const perkStarButton = within(perkCard!).getByRole('button', { name: /rank 1/i });

        fireEvent.click(perkStarButton);
        await waitFor(() =>
            expect(mockChangePerkRank).not.toHaveBeenCalled()
        );
    });

    it('removes perk', async () => {
        mockLoadoutWithPerks([mockPerkOne, mockPerkTwo], mockPlayer(mockSpecials([])));
        mockCharacterStore();
        render(<PerkActiveGrid />);

        const perkCard = screen.getByText('PERK 1').closest('.MuiCard-root') as HTMLElement;
        fireEvent.mouseOver(perkCard);

        const closeButton = screen.getByLabelText('remove-' + mockPerkOne.id)
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        await waitFor(() =>
            expect(mockRemovePerk).toHaveBeenCalledWith(mockPerkOne)
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
            removePerk: mockRemovePerk,
            changePerkRank: mockChangePerkRank
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
