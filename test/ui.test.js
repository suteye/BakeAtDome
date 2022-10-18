/**
 * @jest-environment jsdom
*/

import {render, screen} from '@testing-library/react'
import Home from '../frontend/src/pages/home/Home';

describe('Home Page', () => {
    it('use jsdom in this test file', () => {
        const element = document.createElement('div');
        expect(element).not.toBeNull();
    });

})