const Intern = require('../lib/Intern');


test("Creates a new manager object", () => {
    const intern = new Intern('Peyton', 300, 'ps@ps.com', 'Richwoods')
    console.log(intern);

    expect(intern.getSchool()).toEqual(expect.any(String));
    expect(intern.getRole()).toBe("Intern");
});