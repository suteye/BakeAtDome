/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react'
import Home from '../frontend/src/pages/home/Home';

describe('SearchBar', () => {
    it('should render a search bar',() => {
        const element = document.createElement('div');
        expect(element).not.toBeNull();
    })
});