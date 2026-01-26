const { hashPassword, comparePassword } = require('../src/utils/password');

describe('Password Utility', () => {
    test('should hash the password correctly', async () => {
        const plain = 'malak123';
        const hashed = await hashPassword(plain);
        expect(hashed).not.toBe(plain);
        expect(hashed).toContain('$2b$'); // bcrypt prefix
    });

    test('should return true for correct password', async () => {
        const plain = 'malak123';
        const hashed = await hashPassword(plain);
        const isValid = await comparePassword(plain, hashed);
        expect(isValid).toBe(true);
    });

    test('should return false for incorrect password', async () => {
        const plain = 'malak123';
        const hashed = await hashPassword(plain);
        const isValid = await comparePassword('wrongpass', hashed);
        expect(isValid).toBe(false);
    });
});

const { validateEmail, validatePassword } = require('../src/utils/validation');

describe('Validation Utility', () => {
    test('should validate correct email', () => {
        expect(validateEmail('test@dzvolunteer.com')).toBe(true);
    });

    test('should reject invalid email', () => {
        expect(validateEmail('invalid-email')).toBe(false);
    });

    test('should validate password length', () => {
        expect(validatePassword('12345678')).toBe(true);
        expect(validatePassword('1234')).toBe(false);
    });
});
