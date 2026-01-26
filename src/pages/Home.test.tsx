import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { useBerryStore } from '../store/useBerryStore';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
    TreePine: () => <div data-testid="tree-pine-icon" />,
    Pickaxe: () => <div data-testid="pickaxe-icon" />,
    Barrel: () => <div data-testid="barrel-icon" />,
    ScrollText: () => <div data-testid="scroll-text-icon" />,
    Settings2: () => <div data-testid="settings-icon" />,
}));

describe('Home Component', () => {
    // Reset store before each test
    beforeEach(() => {
        useBerryStore.setState({ berries: 0 });
    });

    it('renders the main title', () => {
        render(<Home />);
        expect(screen.getByText(/Damn Beavers/i)).toBeInTheDocument();
    });

    it('renders the TreePine icon', () => {
        render(<Home />);
        const treeIcons = screen.getAllByTestId('tree-pine-icon');
        expect(treeIcons).toHaveLength(1);
    });

    it('renders the Gather Berries button', () => {
        render(<Home />);
        const button = screen.getByRole('button', { name: /Gather Berries/i });
        expect(button).toBeInTheDocument();
    });

    it('renders initial berries count as 0', () => {
        render(<Home />);
        expect(screen.getByTestId('berry-count-header')).toHaveTextContent('0');
        expect(screen.getByText('Berries')).toBeInTheDocument();
    });

    it('increments berries count when the button is clicked', () => {
        render(<Home />);
        const button = screen.getByRole('button', { name: /Gather Berries/i });

        // Initial state
        expect(screen.getByTestId('berry-count-header')).toHaveTextContent('0');

        // Click the button
        fireEvent.click(button);

        // Check if the count updated
        expect(screen.getByTestId('berry-count-header')).toHaveTextContent('1');

        // Click again
        fireEvent.click(button);
        expect(screen.getByTestId('berry-count-header')).toHaveTextContent('2');
    });
});
