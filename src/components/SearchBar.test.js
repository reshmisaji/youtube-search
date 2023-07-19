import { render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe('SearchBar', () => {
    it('Should render search bar with placeholder', () => {
        render(<SearchBar />);
        const searchBar = screen.getByTestId("search-bar");
        expect(searchBar).toBeInTheDocument();
        expect(searchBar).toHaveAttribute('placeholder', "Search")
    });

    it('Should render search bar with search icon', () => {
        render(<SearchBar />);
        const searchIcon = screen.getByTestId("search-icon");
        expect(searchIcon).toBeInTheDocument();
        expect(searchIcon).toHaveAttribute('data-icon', 'magnifying-glass')
    });
})