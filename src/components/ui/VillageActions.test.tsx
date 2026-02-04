import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VillageActions } from './VillageActions';
import { useBerryStore } from '@/store/useBerryStore';
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
    it('renders the "Gather Berries" button', () => {
        render(<VillageActions />);
        expect(screen.getByText('Gather Berries')).toBeInTheDocument();
        expect(screen.getByText('+1 Berry')).toBeInTheDocument();
    });

    it('calls increaseBerries and addLog when clicked', () => {
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
});
