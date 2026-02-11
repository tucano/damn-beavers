import { render, screen, fireEvent, act } from '@testing-library/react';
import { JobBoard } from './JobBoard';
import { useBeaverStore } from '@/store/useBeaverStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('JobBoard', () => {
    beforeEach(() => {
        act(() => {
            useBeaverStore.getState().reset();
        });
    });

    it('renders correctly with no beavers', () => {
        render(<JobBoard />);
        expect(screen.getByText('Unemployed Beavers:')).toBeInTheDocument();
        const zeros = screen.getAllByText('0');
        expect(zeros.length).toBeGreaterThan(0);
        expect(screen.getByText('Wood Gnawer')).toBeInTheDocument();
    });

    it('renders counts correctly', () => {
        act(() => {
            useBeaverStore.getState().addBeavers(5);
            useBeaverStore.getState().assignJob('woodGnawer', 2);
        });

        render(<JobBoard />);

        // Unemployed should be 3
        expect(screen.getByText('3')).toBeInTheDocument();
        // Wood Gnawers should be 2
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('allows assigning jobs via buttons', () => {
        act(() => {
            useBeaverStore.getState().addBeavers(5);
        });

        render(<JobBoard />);

        const assignBtn = screen.getByText('+');
        fireEvent.click(assignBtn);

        const woodGnawers = useBeaverStore.getState().beavers.filter(b => b.job === 'woodGnawer').length;
        expect(woodGnawers).toBe(1);
    });

    it('allows unassigning jobs via buttons', () => {
        act(() => {
            useBeaverStore.getState().addBeavers(5);
            useBeaverStore.getState().assignJob('woodGnawer', 5);
        });

        render(<JobBoard />);

        const unassignBtn = screen.getByText('-');
        fireEvent.click(unassignBtn);

        const woodGnawers = useBeaverStore.getState().beavers.filter(b => b.job === 'woodGnawer').length;
        expect(woodGnawers).toBe(4);
    });
});
