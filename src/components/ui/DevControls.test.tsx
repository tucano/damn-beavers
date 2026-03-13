import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DevControls } from './DevControls';
import { useBerryStore } from '@/store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useMudStore } from '@/store/useMudStore';
import { useBerryFieldStore } from '@/store/useBerryFieldStore';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
    Settings2: () => <div data-testid="settings-icon" />,
}));

describe('DevControls Component', () => {
    beforeEach(() => {
        useBerryStore.setState({ berries: 0 });
        useBeaverStore.setState({ beavers: [] });
        useWoodStore.setState({ wood: 0 });
        useMudStore.setState({ mud: 0 });
        useBerryFieldStore.setState({ berryFields: 0 });
    });

    it('renders all buttons', () => {
        render(<DevControls />);
        expect(screen.getByRole('button', { name: /\+ Beaver/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /\+10 Wood/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /\+10 Mud/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Reset All/i })).toBeInTheDocument();
    });

    it('adds beavers when "+ Beaver" button is clicked', () => {
        render(<DevControls />);
        const button = screen.getByRole('button', { name: /\+ Beaver/i });
        fireEvent.click(button);
        expect(useBeaverStore.getState().beavers).toHaveLength(1);
    });

    it('adds wood when "+10 Wood" button is clicked', () => {
        render(<DevControls />);
        const button = screen.getByRole('button', { name: /\+10 Wood/i });
        fireEvent.click(button);
        expect(useWoodStore.getState().wood).toBe(10);
    });

    it('adds mud when "+10 Mud" button is clicked', () => {
        render(<DevControls />);
        const button = screen.getByRole('button', { name: /\+10 Mud/i });
        fireEvent.click(button);
        expect(useMudStore.getState().mud).toBe(10);
    });

    it('resets all resources when "Reset All" button is clicked', () => {
        // Set some initial state
        useBerryStore.setState({ berries: 10 });
        useBeaverStore.setState({ beavers: [{ name: 'Test', age: 0, health: 100, birthday: 0 }] });
        useWoodStore.setState({ wood: 10 });
        useMudStore.setState({ mud: 10 });
        useBerryFieldStore.setState({ berryFields: 5 });

        render(<DevControls />);
        const button = screen.getByRole('button', { name: /Reset All/i });
        fireEvent.click(button);

        expect(useBerryStore.getState().berries).toBe(0);
        expect(useBeaverStore.getState().beavers).toHaveLength(0);
        expect(useWoodStore.getState().wood).toBe(0);
        expect(useMudStore.getState().mud).toBe(0);
        expect(useBerryFieldStore.getState().berryFields).toBe(0);
    });

    it('renders the game constants table', () => {
        render(<DevControls />);
        expect(screen.getByText('Game Constants')).toBeInTheDocument();
        expect(screen.getByText('TICKS_PER_DAY')).toBeInTheDocument();
        expect(screen.getAllByText('10').length).toBeGreaterThan(0); // Value for TICKS_PER_DAY and others
        expect(screen.getByText('BERRY_CONSUMPTION_PER_TICK')).toBeInTheDocument();
        expect(screen.getByText('0.85')).toBeInTheDocument();
    });
});
