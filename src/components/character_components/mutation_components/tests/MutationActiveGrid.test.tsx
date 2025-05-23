import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
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
    jest.clearAllMocks();
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

    it('removes mutation', async () => {
        mockLoadoutWithMutations([mockMutationOne, mockMutationTwo]);
        mockCharacterStore();
        render(<MutationActiveGrid />);

        const mutationCard = screen.getByText('MUTATION ONE').closest('.MuiCard-root') as HTMLElement;
        fireEvent.mouseOver(mutationCard);

        const closeButton = screen.getByLabelText('remove-' + mockMutationOne.id)
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        await waitFor(() =>
            expect(mockRemoveMutation).toHaveBeenCalledWith(mockMutationOne)
        );
    });
});

const mockLoadoutWithMutations = (mutations: Mutation[]) => {
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { mutations } })
    );
};

const mockCharacterStore = () => {
    mockUseCharacterStore.mockImplementation((selector) =>
        selector({
            removeMutation: mockRemoveMutation,
        })
    );
};
