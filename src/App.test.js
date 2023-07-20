import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { search } from './apis/YouTube';

const mockSearchBarComponent = jest.fn()

jest.mock("./components/SearchBar", () => (props) => {
  mockSearchBarComponent(props)
  const { handleOnSearch, setSearchText } = props
  return (<>
    <input data-testid="search-bar" onClick={setSearchText.bind(this, "new value")} />
    <div data-testid="search-icon" onClick={handleOnSearch} />
  </>);
});

jest.mock('./apis/YouTube', () => ({
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

  it('Should invoke search api when handleOnSearch is triggered', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("search-bar"))
    fireEvent.click(screen.getByTestId("search-icon"))

    expect(search).toHaveBeenCalledWith("new value");
  });
})