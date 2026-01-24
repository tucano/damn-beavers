import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
    TreePine: () => <div data-testid="tree-pine-icon" />,
    Pickaxe: () => <div data-testid="pickaxe-icon" />,
}));

describe('App Component', () => {
    it('renders the main title', () => {
        render(<App />);
        expect(screen.getByText(/Damn Beavers/i)).toBeInTheDocument();
    });

    it('renders the TreePine icons', () => {
        render(<App />);
        const treeIcons = screen.getAllByTestId('tree-pine-icon');
        expect(treeIcons).toHaveLength(2);
    });

    it('renders the Gnaw Wood button', () => {
        render(<App />);
        const button = screen.getByRole('button', { name: /Gnaw Wood/i });
        expect(button).toBeInTheDocument();
    });

    it('renders initial wood count as 0', () => {
        render(<App />);
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('Wood')).toBeInTheDocument();
    });
});
