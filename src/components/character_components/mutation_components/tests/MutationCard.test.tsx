import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MutationCard } from "../implementation/MutationCard";
import { Mutation } from '../../../../interfaces/MutationInterface';

describe('MutationCard', () => {
    const mockAddMutation = jest.fn();
    const mockRemoveMutation = jest.fn();

    const mockMutation: Mutation = {
        id: 'mutation1',
        name: 'Test Mutation',
        description: 'This is a test mutation',
    };

    beforeEach(() => {
        mockAddMutation.mockClear();
        mockRemoveMutation.mockClear();
    });

    //all tests combined
    it.each([
        ['no callbacks', {}],
        ['with addMutation', { addMutation: mockAddMutation }],
        ['with removeMutation', { removeMutation: mockRemoveMutation }],
    ])('renders correctly %s', (_, props) => {
        render(<MutationCard mutation={mockMutation} {...props} />);
        expect(screen.getByText('Test Mutation')).toBeInTheDocument();
        expect(screen.getByText('This is a test mutation')).toBeInTheDocument();
    });
});
