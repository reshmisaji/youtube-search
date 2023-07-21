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

    it('Should not call handleOnSearch on click of search icon if searchQuery is empty', () => {
        const mockSearch = jest.fn()
        render(<SearchBar handleOnSearch={mockSearch} />);

        const searchButton = screen.getByTestId("search-icon");

        expect(searchButton).toBeInTheDocument();

        fireEvent.submit(searchButton)

        expect(mockSearch).not.toHaveBeenCalled()
    });

    it('Should call handleOnSearch on click of search icon if searchQuery has value', () => {
        const mockSearch = jest.fn()
        render(<SearchBar handleOnSearch={mockSearch} />);

        const searchButton = screen.getByTestId("search-icon");
        const searchBar = screen.getByTestId("search-bar");

        fireEvent.change(searchBar, {
            target: { value: "test" }
        });
        fireEvent.submit(searchButton)

        expect(mockSearch).toHaveBeenCalledWith("test")
    });

    it('Should render searchbar', () => {
        render(<SearchBar />);
        const searchBar = screen.getByTestId("search-bar");
        expect(searchBar).toBeInTheDocument()
    });

    it("Should call handleOnSearch when enter key is pressed", async () => {
        const mockSearch = jest.fn()
        render(<SearchBar handleOnSearch={mockSearch} />);

        const searchForm = screen.getByTestId("search-form");
        const searchBar = screen.getByTestId("search-bar");

        fireEvent.change(searchBar, {
            target: { value: "test" }
        });
        fireEvent.submit(searchForm);

        expect(mockSearch).toHaveBeenCalled()
    });

    it("Should clear the text when clear icon is clicked", async () => {
        const mockSearch = jest.fn()
        render(<SearchBar handleOnSearch={mockSearch} />);

        const searchBar = screen.getByTestId("search-bar");

        fireEvent.change(searchBar, {
            target: { value: "test" }
        });

        expect(searchBar.value).toBe("test")

        fireEvent.click(screen.getByTestId("close-icon"))
        
        expect(searchBar.value).toBe("")

    });

})