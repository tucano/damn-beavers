import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BeaverList } from './BeaverList';
import { useBeaverStore } from '@/store/useBeaverStore';
import { DAYS_IN_YEAR } from '@/config/game';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
    Users: () => <div data-testid="users-icon" />,
}));

describe('BeaverList Component', () => {
    beforeEach(() => {
        useBeaverStore.setState({ beavers: [] });
    });

    it('renders empty state when no beavers are present', () => {
        render(<BeaverList />);
        expect(screen.getByText('No beavers in your colony yet.')).toBeInTheDocument();
    });

    it('renders a list of beavers with name, age and health', () => {
        const mockBeavers = [
            { name: 'Justin', age: 2 * DAYS_IN_YEAR, health: 80, birthday: 0 },
            { name: 'Bieber', age: 5 * DAYS_IN_YEAR, health: 100, birthday: 0 },
        ];
        useBeaverStore.setState({ beavers: mockBeavers });

        render(<BeaverList />);

        expect(screen.getByText('Justin')).toBeInTheDocument();
        expect(screen.getByText(`Age: 2`)).toBeInTheDocument();
        expect(screen.getByText('80%')).toBeInTheDocument();

        expect(screen.getByText('Bieber')).toBeInTheDocument();
        expect(screen.getByText(`Age: 5`)).toBeInTheDocument();
        expect(screen.getByText('100%')).toBeInTheDocument();

        const healthBar0 = screen.getByTestId('beaver-health-bar-0');
        expect(healthBar0).toHaveStyle({ width: '80%' });

        const healthBar1 = screen.getByTestId('beaver-health-bar-1');
        expect(healthBar1).toHaveStyle({ width: '100%' });
    });
});
