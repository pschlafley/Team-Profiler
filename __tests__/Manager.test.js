const Manager = require('../lib/Manager');


test("Creates a new manager object", () => {
    const manager = new Manager('Peyton', 300, 'ps@ps.com', 101)
    console.log(manager);

    expect(manager.officeNumber).toEqual(expect.any(Number));
    expect(manager.getRole()).toBe("Manager");
});