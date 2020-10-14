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
})