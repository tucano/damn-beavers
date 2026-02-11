import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VillageActions } from './VillageActions';
import { useBerryStore } from '@/store/useBerryStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useLogStore } from '@/store/useLogStore';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
    Pickaxe: () => <div data-testid="pickaxe-icon" />,
    Barrel: () => <div data-testid="barrel-icon" />,
    Wheat: () => <div data-testid="wheat-icon" />,
    TreePine: () => <div data-testid="tree-pine-icon" />,
    Mountain: () => <div data-testid="mountain-icon" />,
    Home: () => <div data-testid="home-icon" />,
}));

describe('VillageActions Component', () => {
    beforeEach(() => {
        useBerryStore.setState({ berries: 0 });
        useWoodStore.setState({ wood: 0 });
    });

    it('renders the "Gather Berries" button', () => {
        render(<VillageActions />);
        expect(screen.getByText('Gather Berries')).toBeInTheDocument();
        expect(screen.getByText('+1 Berry')).toBeInTheDocument();
    });

    it('calls increaseBerries and addLog when "Gather Berries" is clicked', () => {
        // Create spies for the store actions
        const increaseBerriesSpy = vi.fn();
        const addLogSpy = vi.fn();

        // Inject spies into the stores
        const originalIncreaseBerries = useBerryStore.getState().increaseBerries;
        const originalAddLog = useLogStore.getState().addLog;

        useBerryStore.setState({ increaseBerries: increaseBerriesSpy });
        useLogStore.setState({ addLog: addLogSpy });

        render(<VillageActions />);

        const button = screen.getByRole('button', { name: /gather berries/i });
        fireEvent.click(button);

        expect(increaseBerriesSpy).toHaveBeenCalledWith(1);
        expect(addLogSpy).toHaveBeenCalledWith('Gathered 1 berry', 'success');

        // Restore original actions
        useBerryStore.setState({ increaseBerries: originalIncreaseBerries });
        useLogStore.setState({ addLog: originalAddLog });
    });

    it('disables "Gnaw Wood" button when berries are insufficient', () => {
        useBerryStore.setState({ berries: 50 });
        render(<VillageActions />);
        const button = screen.getByRole('button', { name: /gnaw wood/i });
        expect(button).toBeDisabled();
    });

    it('enables "Gnaw Wood" button when berries are sufficient', () => {
        useBerryStore.setState({ berries: 100 });
        render(<VillageActions />);
        const button = screen.getByRole('button', { name: /gnaw wood/i });
        expect(button).not.toBeDisabled();
    });

    it('calls increaseBerries(-100), increaseWood(1) and addLog when "Gnaw Wood" is clicked', () => {
        const increaseBerriesSpy = vi.fn();
        const increaseWoodSpy = vi.fn();
        const addLogSpy = vi.fn();

        const originalIncreaseBerries = useBerryStore.getState().increaseBerries;
        const originalIncreaseWood = useWoodStore.getState().increaseWood;
        const originalAddLog = useLogStore.getState().addLog;

        useBerryStore.setState({ berries: 100, increaseBerries: increaseBerriesSpy });
        useWoodStore.setState({ increaseWood: increaseWoodSpy });
        useLogStore.setState({ addLog: addLogSpy });

        render(<VillageActions />);

        const button = screen.getByRole('button', { name: /gnaw wood/i });
        fireEvent.click(button);

        expect(increaseBerriesSpy).toHaveBeenCalledWith(-100);
        expect(increaseWoodSpy).toHaveBeenCalledWith(1);
        expect(addLogSpy).toHaveBeenCalledWith('Gnawed some wood for 100 berries', 'success');

        // Restore original actions
        useBerryStore.setState({ increaseBerries: originalIncreaseBerries });
        useWoodStore.setState({ increaseWood: originalIncreaseWood });
        useLogStore.setState({ addLog: originalAddLog });
    });
});
