import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

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

    it('Should call handleOnSearch on click of search icon', () => {
        const mockSearch = jest.fn()
        render(<SearchBar handleOnSearch={mockSearch} />);
        const searchButton = screen.getByTestId("search-icon");
        expect(searchButton).toBeInTheDocument();
        fireEvent.click(searchButton)
        expect(mockSearch).toHaveBeenCalled()
    });

    it('Should render searchbar with the searchText', () => {
        const props = { searchText: "test" }
        render(<SearchBar {...props} />);
        const searchBar = screen.getByTestId("search-bar");
        expect(searchBar).toHaveProperty('value', 'test')
    });

    it("Should call setSearchText with target value on change of input value", async () => {
        const props = { searchText: "test", setSearchText: jest.fn() }
        render(<SearchBar {...props} />);
        const searchBar = screen.getByTestId("search-bar");

        expect(searchBar).toHaveProperty('value', 'test')
        fireEvent.change(searchBar, {
            target: { value: "new value" }
        });
        expect(props.setSearchText).toHaveBeenCalledWith("new value")
    });

})