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
    Users: () => <div data-testid="users-icon" />,
    Pause: () => <div data-testid="pause-icon" />,
    Play: () => <div data-testid="play-icon" />,
    Wheat: () => <div data-testid="wheat-icon" />,
    Mountain: () => <div data-testid="mountain-icon" />,
    Home: () => <div data-testid="home-icon" />,
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
        expect(treeIcons).toHaveLength(2);
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

    it('renders DevControls when in development mode', () => {
        // In Vitest, import.meta.env.DEV is true by default
        render(<Home />);
        expect(screen.getByText(/Dev Controls/i)).toBeInTheDocument();
    });

    it('does not render DevControls when not in development mode', () => {
        vi.stubEnv('DEV', '');
        render(<Home />);
        expect(screen.queryByText(/Dev Controls/i)).not.toBeInTheDocument();
        vi.unstubAllEnvs();
    });
});
