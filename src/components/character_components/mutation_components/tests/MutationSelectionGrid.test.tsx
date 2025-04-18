import '@testing-library/jest-dom';
import { renderWithQueryClient } from "../../../../util/testingUtility/TestQueryClient";
import {fireEvent, screen, waitFor} from '@testing-library/react';
import { MutationSelectionGrid } from "../implementation/MutationSelectionGrid";
import { getAllMutations } from "../../../../api/MutationApiService";
import { Mutation } from '../../../../interfaces/MutationInterface';

jest.mock("axios")

jest.mock('../../../../stores/LoadoutSlice', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('../../../../api/MutationApiService', () => ({
    getAllMutations: jest.fn()
}));

import useLoadoutStore from '../../../../stores/LoadoutSlice';
const mockUseLoadoutStore = useLoadoutStore as unknown as jest.Mock;

beforeEach(() => {
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { mutations: [] } })
    );
});

describe('MutationSelectionGrid', () => {
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

    const mockMutationThree: Mutation = {
        id: 'mutationThree',
        name: 'Mutation Three',
        description: 'This is another test mutation.'
    }

    //none - all - filtered - active mutations

    it('renders all mutations as current mutations is empty', async () => {
        mockLoadoutWithMutations([]);
        mockAllMutations([mockMutationOne, mockMutationTwo, mockMutationThree])
        renderWithQueryClient(<MutationSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('Mutation One')).toBeInTheDocument();
            expect(screen.getByText('Mutation Two')).toBeInTheDocument();
            expect(screen.getByText('Mutation Three')).toBeInTheDocument();
        });
    });

    it('renders no mutation as all mutations are in loadout', async () => {
        mockLoadoutWithMutations([mockMutationOne, mockMutationTwo, mockMutationThree]);
        mockAllMutations([mockMutationOne, mockMutationTwo, mockMutationThree])
        renderWithQueryClient(<MutationSelectionGrid />);

        await waitFor(() => {
            expect(screen.queryByText('Mutation One')).not.toBeInTheDocument();
            expect(screen.queryByText('Mutation Two')).not.toBeInTheDocument();
            expect(screen.queryByText('Mutation Three')).not.toBeInTheDocument();
        });
    });

    it('renders some mutation as some mutations are in loadout', async () => {
        mockLoadoutWithMutations([mockMutationTwo]);
        mockAllMutations([mockMutationOne, mockMutationTwo, mockMutationThree])
        renderWithQueryClient(<MutationSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('Mutation One')).toBeInTheDocument();
            expect(screen.getByText('Mutation Three')).toBeInTheDocument();
        });
    });

    it('filters mutations by search term', async () => {
        mockLoadoutWithMutations([]);
        mockAllMutations([mockMutationOne, mockMutationTwo, mockMutationThree]);
        renderWithQueryClient(<MutationSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('Mutation One')).toBeInTheDocument();
            expect(screen.getByText('Mutation Two')).toBeInTheDocument();
            expect(screen.getByText('Mutation Three')).toBeInTheDocument();
        });

        //input
        const input = screen.getByLabelText('Filter mutations');
        fireEvent.change(input, { target: { value: 'Mutation One' } });

        //filtering all so only mutation one is visible
        await waitFor(() => {
            expect(screen.getByText('Mutation One')).toBeInTheDocument();
            expect(screen.queryByText('Mutation Two')).not.toBeInTheDocument();
            expect(screen.queryByText('Mutation Three')).not.toBeInTheDocument();
        });
    });

    it('filters mutations by search term with mutation in loadout', async () => {
        mockLoadoutWithMutations([mockMutationTwo]);
        mockAllMutations([mockMutationOne, mockMutationTwo, mockMutationThree]);
        renderWithQueryClient(<MutationSelectionGrid />);

        await waitFor(() => {
            expect(screen.getByText('Mutation One')).toBeInTheDocument();
            expect(screen.queryByText('Mutation Two')).not.toBeInTheDocument();
            expect(screen.getByText('Mutation Three')).toBeInTheDocument();
        });

        //input
        const input = screen.getByLabelText('Filter mutations');
        fireEvent.change(input, { target: { value: 'Mutation One' } });

        //filtering all so only mutation one is visible
        await waitFor(() => {
            expect(screen.getByText('Mutation One')).toBeInTheDocument();
            expect(screen.queryByText('Mutation Two')).not.toBeInTheDocument();
            expect(screen.queryByText('Mutation Three')).not.toBeInTheDocument();
        });
    });
});

const mockLoadoutWithMutations = (mutations: Mutation[]) => {
    mockUseLoadoutStore.mockImplementation((selector) =>
        selector({ activeLoadout: { mutations } })
    );
};

const mockAllMutations = (mutations: Mutation[]) => {
    (getAllMutations as jest.Mock).mockResolvedValue(mutations);
}
