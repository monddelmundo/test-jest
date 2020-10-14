const fetch = require('node-fetch');
const swapi = require('./script2');

describe("test script2 - two ways of handling async tests", () => {
    //tells jest to wait when the done callback is called,
    //before you call this it statement is finished
    it("calls swapi to get people", (done) => {
        //assertions function must be used against async
        expect.assertions(1);
        swapi.getPeople(fetch).then(res => {
            expect(res.count).toEqual(87);
            done();
        })
    })

    it("calls swapi to get people with a promise", () => {
        expect.assertions(2);
        return swapi.getPeoplePromise(fetch).then(res => {
            expect(res.count).toEqual(87);
            expect(res.results.length).toBeGreaterThan(5);
        })
    })

    it("getPeople returns counts and results", () => {
        //creates mock fetch using jest function
        const mockFetch = jest.fn()
            .mockReturnValue(Promise.resolve({
                json: () => Promise.resolve({
                    count: 87,
                    results: [0, 1, 2, 3, 4, 5]
                })
            }))
        
        //we can spy on the mockFetch variable using jest
        expect.assertions(4);
        return swapi.getPeoplePromise(mockFetch).then(res => {
            expect(mockFetch.mock.calls.length).toBe(1);
            expect(mockFetch).toBeCalledWith("https://swapi.py4e.com/api/people");
            expect(res.count).toEqual(87);
            expect(res.results.length).toBeGreaterThan(5);
        })
    })
})