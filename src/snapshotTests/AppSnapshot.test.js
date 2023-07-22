import React from "react";
import renderer from "react-test-renderer";
import App from "../App.js"

describe("App Snapshot", () => {
    it("should render the initial state", () => {
        const appDom = renderer.create(<App />)
        const actualSnapshot = appDom.toJSON();
        expect(actualSnapshot).toMatchSnapshot()
    })
})