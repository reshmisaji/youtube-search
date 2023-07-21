import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';
import * as YouTube from './clients/YouTube';
const { search } = YouTube;

const mockSearchBarComponent = jest.fn()
const mockSearchResultsComponent = jest.fn()

jest.mock("./components/SearchBar", () => (props) => {
  mockSearchBarComponent(props)
  const { handleOnSearch, setSearchText } = props
  return (<>
    <input data-testid="search-bar" onClick={setSearchText.bind(this, "new value")} />
    <div data-testid="search-icon" onClick={handleOnSearch} />
  </>);
});

jest.mock("./components/SearchResults", () => (props) => {
  mockSearchResultsComponent(props)
  const { results } = props
  return (<div data-testid="search-results" id="search-results">
    {results && results.map((result, index) => (<div key={index}>{result?.snippet?.title}</div>))}
  </div>);
});

jest.mock('./clients/YouTube', () => ({
  search: jest.fn()
}))



describe('App', () => {

  it('Should render header text properly', () => {
    render(<App />);
    const header = screen.getByTestId("app-header");

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Youtube Search")
  });

  it('Should render search bar', () => {
    render(<App />);
    const searchBarComponent = screen.getByTestId("search-bar");

    expect(searchBarComponent).toBeInTheDocument();
  });

  it("It should invoke searchBar with updated value when value changed in searchBar", () => {
    render(<App />)
    fireEvent.click(screen.getByTestId("search-bar"))

    expect(mockSearchBarComponent).toHaveBeenCalledWith(expect.objectContaining({
      searchText: "new value"
    }))
  })

  it('Should invoke search api when handleOnSearch is triggered', async () => {
    render(<App />);
    search.mockResolvedValue()

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("search-bar"))
      fireEvent.click(screen.getByTestId("search-icon"))

      expect(search).toHaveBeenCalled();
    });
  });

  it('Should not render search results container when results are empty or not present', async () => {
    render(<App />);
    search.mockResolvedValue()

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("search-icon"))
      const searchResult = screen.queryByTestId("search-results");

      expect(searchResult).not.toBeInTheDocument();
    });
  });

  it('Should render search results container when results are present', async () => {
    render(<App />);
    search.mockResolvedValue({ data: { items: [{ snippet: { title: "flower" } }], nextPageToken: "123" } })

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("search-icon"))
      const searchResult = screen.getByTestId("search-results");

      expect(searchResult).toBeInTheDocument();
    });
  });
})