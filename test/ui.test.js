import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../frontend/src/pages/home/Home';

describe('SearchBar', () => {
    it('should render a search bar',() => {
        render(<Home/>)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
});