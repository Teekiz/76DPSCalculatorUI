import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MutationActiveGrid } from '../implementation/MutationActiveGrid';
import { Mutation } from '../../../../interfaces/MutationInterface';

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

const mockUseCharacterStore = useCharacterStore as unknown as jest.Mock;
const mockUseLoadoutStore = useLoadoutStore as unknown as jest.Mock;
const mockRemoveMutation = jest.fn();

beforeEach(() => {
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { mutations: [] } })
    );
    mockUseCharacterStore.mockImplementation((selector) =>
        selector({ removeMutation: mockRemoveMutation })
    );
});

describe('MutationActiveGrid', () => {
    const mockMutationOne: Mutation = {
        id: 'mutationOne',
        name: 'Mutation One',
        description: 'This is the first mutation to be tested.',
    };

    const mockMutationTwo: Mutation = {
        id: 'mutationTwo',
        name: 'Mutation Two',
        description: 'This is also a test mutation.'
    }

    it('renders no mutations as mutation list is empty', () => {
        mockLoadoutWithMutations([]);
        render(<MutationActiveGrid />);
        expect(screen.getByText('No Active Mutations')).toBeInTheDocument();
    });

    it('renders first mutation', () => {
        mockLoadoutWithMutations([mockMutationOne]);
        render(<MutationActiveGrid />);
        expect(screen.getByText('Mutation One')).toBeInTheDocument();
        expect(screen.queryByText('Mutation Two')).not.toBeInTheDocument();
    });

    it('renders both mutations', () => {
        mockLoadoutWithMutations([mockMutationOne, mockMutationTwo]);
        render(<MutationActiveGrid />);
        expect(screen.getByText('Mutation One')).toBeInTheDocument();
        expect(screen.getByText('Mutation Two')).toBeInTheDocument();
    });
});

const mockLoadoutWithMutations = (mutations: Mutation[]) => {
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { mutations } })
    );
};
