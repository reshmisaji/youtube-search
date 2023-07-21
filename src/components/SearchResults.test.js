import { render, screen } from "@testing-library/react"
import SearchResults from "./SearchResults"


describe('SearchResults', () => {
    it('Should render the component properly with results from props', () => {
        const results = [{ snippet: { title: "flower" } }, { snippet: { title: "color" } }]
        render(<SearchResults results={results} />)

        const searchResultsComponent = screen.getByTestId('search-results')
        expect(searchResultsComponent).toBeInTheDocument()
        expect(screen.getAllByTestId(/video-card/).length).toBe(results.length)
    })
})