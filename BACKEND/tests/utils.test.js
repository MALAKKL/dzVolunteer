const { hashPassword, comparePassword } = require('../src/utils/password');

// Mock bcrypt to avoid actual hashing cost during tests
jest.mock('bcrypt', () => ({
    genSalt: jest.fn().mockResolvedValue('salt'),
    hash: jest.fn().mockResolvedValue('$2b$10$mockedhashvalue'),
    compare: jest.fn().mockImplementation((plain, hash) => plain === 'malak123' && hash === '$2b$10$mockedhashvalue')
}));

describe('Password Utility', () => {
    test('should hash the password correctly', async () => {
        const plain = 'malak123';
        const hashed = await hashPassword(plain);
        expect(hashed).toBe('$2b$10$mockedhashvalue');
    });

    test('should return true for correct password', async () => {
        const plain = 'malak123';
        const hashed = '$2b$10$mockedhashvalue';
        const isValid = await comparePassword(plain, hashed);
        expect(isValid).toBe(true);
    });

    test('should return false for incorrect password', async () => {
        const plain = 'wrongpass';
        const hashed = '$2b$10$mockedhashvalue';
        const isValid = await comparePassword(plain, hashed);
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
