import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PerkCard } from "../implementation/PerkCard";
import {Perk} from "../../../../interfaces/PerkInterface";

describe('PerkCard', () => {
    const mockAddPerk = jest.fn();
    const mockRemovePerk = jest.fn();
    const mockChangeRank = jest.fn();

    const mockPerk: Perk = {
        id: 'perk1',
        name: 'Test Perk',
        description: 'This is a test perk',
        special: 'STRENGTH',
        currentRank: 1,
        maxRank: 3,
        baseCost: 1,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.each([
        ['no callbacks', {}],
        ['with addPerk', { addPerk: mockAddPerk }],
        ['with removePerk', { removePerk: mockRemovePerk }],
        ['with changePerkRank', { changeRank: mockChangeRank }],
    ])('renders correctly %s', (_, props) => {
        render(<PerkCard perk={mockPerk} isDetailed={true} {...props} />);
        expect(screen.getByText('TEST PERK')).toBeInTheDocument();
        expect(screen.getByText('This is a test perk')).toBeInTheDocument();
    });
});
