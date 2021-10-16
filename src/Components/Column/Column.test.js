const Column = require("./Column")

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new Column.default("Anas")
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getTickets", () => {
    let inst

    beforeEach(() => {
        inst = new Column.default("Pierre Edouard")
    })

    test("0", () => {
        let callFunction = () => {
            inst.getTickets()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("allowDrop", () => {
    let inst

    beforeEach(() => {
        inst = new Column.default("Michael")
    })

    test("0", () => {
        let callFunction = () => {
            inst.allowDrop({ preventDefault: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.allowDrop({ preventDefault: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.allowDrop(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
