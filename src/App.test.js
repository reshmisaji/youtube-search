import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Should render header text properly', () => {
    render(<App />);
    const header = screen.getByTestId("app-header");
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Youtube Search")
  });

  it('Should render search bar', () => {
    render(<App />);
    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();
  });
})