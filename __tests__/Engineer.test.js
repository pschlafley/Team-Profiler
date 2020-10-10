const Engineer = require('../lib/Engineer');

test("Creates Engineer object", () => {
    const engineer = new Engineer('Peyton', 200, 'ps@ps.com', 'pschlafley/github.com')
    console.log(engineer);

    expect(engineer.getGitHub()).toEqual(expect.any(String));
    expect(engineer.getRole()).toBe('Engineer');
});