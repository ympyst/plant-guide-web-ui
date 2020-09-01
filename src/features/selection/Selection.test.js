import React from 'react';
import { Selection } from './Selection';
import { render, fireEvent, screen } from '@testing-library/react'

const selection = [
    {
        id: 1,
        bio_taxon_name: '',
        bio_taxon_type: '',
        thesis: 'Thesis 1',
        selection_id: 1,
        next_selection_id: 2,
    },
    {
        id: 2,
        bio_taxon_name: '',
        bio_taxon_type: '',
        thesis: 'Thesis 2',
        selection_id: 1,
        next_selection_id: 30,
    }
];

describe('Selection component', () => {
    it('should call selectCallback on every "select" button', () => {
        const mockSelectCallback = jest.fn();
        render(<Selection selection={selection} selectCallback={mockSelectCallback} />);
        let buttons = screen.getAllByText(/Выбрать/i);
        fireEvent.click(buttons[0]);
        expect(mockSelectCallback).toHaveBeenCalledTimes(1);
        fireEvent.click(buttons[1]);
        expect(mockSelectCallback).toHaveBeenCalledTimes(2);
    });
    it('should call selectCallback with full selection props', () => {
        const mockSelectCallback = jest.fn();
        render(<Selection selection={selection} selectCallback={mockSelectCallback} />);
        let buttons = screen.getAllByText(/Выбрать/i);
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);
        expect(mockSelectCallback.mock.calls[0][0]).toStrictEqual(selection[0]);
        expect(mockSelectCallback.mock.calls[1][0]).toStrictEqual(selection[1]);
    });
});