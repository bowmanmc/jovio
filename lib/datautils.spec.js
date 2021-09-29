import DataUtils from './datautils';


describe('DataUtils', () => {

    test('generates partition keys', () => {
        const email = 'foo@bar.com';
        const result = DataUtils.pk(email);
        expect(result).toBe('USER#foo@bar.com');
    });

    test('generates sort keys', () => {
        const email = 'foo@bar.com';
        let result = DataUtils.sk(email);
        expect(result).toContain('JOVEY#foo@bar.com');
        result = DataUtils.sk(email, 'baz');
        expect(result).toBe('JOVEY#foo@bar.com#baz');
    });

    test('generates ids', () => {
        const result = DataUtils.id();
        expect(result.length).toBe(21);
    });
});
