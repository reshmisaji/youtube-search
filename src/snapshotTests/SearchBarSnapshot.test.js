import React from "react";
import renderer from "react-test-renderer";
import SearchBar from "../components/SearchBar";

describe("SearchBar",()=>{
    it("Should render search bar with props",()=>{
        const handleOnSearch = jest.fn()
        const actualDOM = renderer.create(<SearchBar handleOnSearch={handleOnSearch}/>).toJSON()
        expect(actualDOM).toMatchSnapshot()
    })
})