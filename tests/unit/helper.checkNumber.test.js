// tests/unit/helpers.test.js
const { isNumber } = require('../../helpers/checkNumber.js');

describe('isNumber - Kiểm tra chuỗi có phải toàn chữ số hay không', () => {
    
    // TC01: Chuỗi số hợp lệ
    describe('TC01 - Chuỗi toàn chữ số', () => {
        test('nên trả về true khi chuỗi là số nguyên dương', () => {
            expect(isNumber('123456')).toBe(true);
        });

        test('nên trả về true khi chuỗi là số 0', () => {
            expect(isNumber('0')).toBe(true);
        });

        test('nên trả về true khi chuỗi là số có 1 chữ số', () => {
            expect(isNumber('5')).toBe(true);
        });

        test('nên trả về true khi chuỗi là số có nhiều chữ số', () => {
            expect(isNumber('999999999999')).toBe(true);
        });
    });

    // TC02: Chuỗi rỗng, null, undefined
    describe('TC02 - Giá trị rỗng hoặc không hợp lệ', () => {
        test('nên trả về false khi chuỗi rỗng', () => {
            expect(isNumber('')).toBe(false);
        });

        test('nên trả về false khi giá trị là null', () => {
            expect(isNumber(null)).toBe(false);
        });

        test('nên trả về false khi giá trị là undefined', () => {
            expect(isNumber(undefined)).toBe(false);
        });
    });

    // TC03: Chuỗi chứa ký tự không phải chữ số
    describe('TC03 - Chuỗi có chứa ký tự không phải chữ số', () => {
        test('nên trả về false khi chuỗi có chữ cái', () => {
            expect(isNumber('123abc')).toBe(false);
        });

        test('nên trả về false khi chuỗi có ký tự đặc biệt', () => {
            expect(isNumber('123@456')).toBe(false);
        });

        test('nên trả về false khi chuỗi có khoảng trắng', () => {
            expect(isNumber('123 456')).toBe(false);
        });

        test('nên trả về false khi chuỗi có dấu chấm', () => {
            expect(isNumber('123.456')).toBe(false);
        });

        test('nên trả về false khi chuỗi có dấu phẩy', () => {
            expect(isNumber('123,456')).toBe(false);
        });

        test('nên trả về false khi chuỗi có dấu trừ', () => {
            expect(isNumber('-123')).toBe(false);
        });

        test('nên trả về false khi chuỗi có dấu cộng', () => {
            expect(isNumber('+123')).toBe(false);
        });
    });

    // TC04: Chuỗi hỗn hợp
    describe('TC04 - Các trường hợp hỗn hợp', () => {
        test('nên trả về false khi chuỗi bắt đầu bằng chữ', () => {
            expect(isNumber('a123')).toBe(false);
        });

        test('nên trả về false khi chuỗi kết thúc bằng chữ', () => {
            expect(isNumber('123a')).toBe(false);
        });

        test('nên trả về false khi chuỗi chỉ có chữ', () => {
            expect(isNumber('abc')).toBe(false);
        });

        test('nên trả về false khi chuỗi chỉ có ký tự đặc biệt', () => {
            expect(isNumber('@#$%')).toBe(false);
        });
    });

    // TC05: Trường hợp biên
    describe('TC05 - Trường hợp biên', () => {
        test('nên trả về true khi chuỗi số rất dài', () => {
            const soDai = '1'.repeat(1000);
            expect(isNumber(soDai)).toBe(true);
        });

        test('nên trả về false khi chuỗi có ký tự đặc biệt Unicode (số Ả Rập)', () => {
            expect(isNumber('١٢٣')).toBe(false);
        });
    });
});