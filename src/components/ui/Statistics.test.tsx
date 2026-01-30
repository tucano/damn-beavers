import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Statistics } from './Statistics';
import { useBerryStore } from '../../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useMudStore } from '@/store/useMudStore';
import { useBerryFieldStore } from '@/store/useBerryFieldStore';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
    Settings2: () => <div data-testid="settings-icon" />,
}));

describe('Statistics Component', () => {
    it('renders all resource counters', () => {
        // Set initial states
        useBerryStore.setState({ berries: 10 });
        useBeaverStore.setState({ beavers: [{ name: 'Justin', age: 2, health: 100 }] });
        useWoodStore.setState({ wood: 50 });
        useMudStore.setState({ mud: 20 });

        render(<Statistics />);

        expect(screen.getByText('Population')).toBeInTheDocument();
        expect(screen.getByTestId('beaver-count-stats')).toHaveTextContent('1');

        expect(screen.getByText('Total Berries')).toBeInTheDocument();
        expect(screen.getByTestId('berry-count-stats')).toHaveTextContent('10');

        expect(screen.getByText('Total Wood')).toBeInTheDocument();
        expect(screen.getByTestId('wood-count-stats')).toHaveTextContent('50');

        expect(screen.getByText('Total Mud')).toBeInTheDocument();
        expect(screen.getByTestId('mud-count-stats')).toHaveTextContent('20');

        expect(screen.getByText('Berry Fields')).toBeInTheDocument();
        expect(screen.getByTestId('berry-field-count-stats')).toHaveTextContent('0');
    });

    it('renders berry fields count when updated', () => {
        useBerryFieldStore.setState({ berryFields: 5 });
        render(<Statistics />);
        expect(screen.getByTestId('berry-field-count-stats')).toHaveTextContent('5');
    });
});
