import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
    TreePine: () => <div data-testid="tree-pine-icon" />,
    Pickaxe: () => <div data-testid="pickaxe-icon" />,
}));

describe('Home Component', () => {
    it('renders the main title', () => {
        render(<Home />);
        expect(screen.getByText(/Damn Beavers/i)).toBeInTheDocument();
    });

    it('renders the TreePine icons', () => {
        render(<Home />);
        const treeIcons = screen.getAllByTestId('tree-pine-icon');
        expect(treeIcons).toHaveLength(2);
    });

    it('renders the Gnaw Wood button', () => {
        render(<Home />);
        const button = screen.getByRole('button', { name: /Gnaw Wood/i });
        expect(button).toBeInTheDocument();
    });

    it('renders initial wood count as 0', () => {
        render(<Home />);
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('Wood')).toBeInTheDocument();
    });
});
