import { render, screen } from '@testing-library/react';
import { SupportItem } from './SupportItem';
import { describe, it, expect } from 'vitest';

describe('SupportItem', () => {
    it('renders title and description', () => {
        render(<SupportItem title="Test Title" description="Test Description" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
});
