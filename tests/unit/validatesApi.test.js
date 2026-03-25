// tests/unit/validatesApi.test.js
const { loginPostApi } = require('../../validatesapi/admin/auth.validate');

// Hàm hỗ trợ tạo req giả
const taoReqGia = (body) => ({
    body: body || {}
});

// Hàm hỗ trợ tạo res giả
const taoResGia = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('loginPostApi - Kiểm thử validation', () => {
    let reqGia;
    let resGia;
    let nextGia;

    beforeEach(() => {
        nextGia = jest.fn();
        resGia = taoResGia();
    });

    // TC01: Validation thành công
    describe('TC01 - Dữ liệu hợp lệ', () => {
        test('nên gọi next() khi email và password hợp lệ', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(nextGia).toHaveBeenCalled();
            expect(resGia.json).not.toHaveBeenCalled();
        });
    });

    // TC05: Email rỗng
    describe('TC05 - Email để trống', () => {
        test('nên trả về lỗi khi email là chuỗi rỗng', () => {
            reqGia = taoReqGia({
                email: '',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Email không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi email là null', () => {
            reqGia = taoReqGia({
                email: null,
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Email không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi không có email', () => {
            reqGia = taoReqGia({
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Email không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });
    });

    // TC06: Email có khoảng trắng
    describe('TC06 - Email chứa khoảng trắng', () => {
        test('nên trả về lỗi khi email có khoảng trắng ở giữa', () => {
            reqGia = taoReqGia({
                email: 'abc def@gmail.com',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Email không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi email có khoảng trắng ở đầu', () => {
            reqGia = taoReqGia({
                email: ' levana@gmail.com',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Email không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi email có khoảng trắng ở cuối', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com ',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Email không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });
    });

    // TC07: Email > 30 ký tự
    describe('TC07 - Email dài hơn 30 ký tự', () => {
        test('nên trả về lỗi khi email vượt quá 30 ký tự', () => {
            reqGia = taoReqGia({
                email: 'verylongemail12345678901234567890@gmail.com',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Email tối đa 30 ký tự!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });
    });

    // TC10: Password rỗng
    describe('TC10 - Mật khẩu để trống', () => {
        test('nên trả về lỗi khi mật khẩu là chuỗi rỗng', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: ''
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi mật khẩu là null', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: null
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi không có mật khẩu', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });
    });

    // TC11: Password có khoảng trắng
    describe('TC11 - Mật khẩu chứa khoảng trắng', () => {
        test('nên trả về lỗi khi mật khẩu có khoảng trắng ở giữa', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '123 45678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi mật khẩu có khoảng trắng ở đầu', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: ' 12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi mật khẩu có khoảng trắng ở cuối', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '12345678 '
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu không được để trống!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });
    });

    // TC08: Password < 8 ký tự
    describe('TC08 - Mật khẩu dưới 8 ký tự', () => {
        test('nên trả về lỗi khi mật khẩu có 7 ký tự', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '1234567'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu phải có ít nhất 8 ký tự!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });

        test('nên trả về lỗi khi mật khẩu có 1 ký tự', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '1'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu phải có ít nhất 8 ký tự!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });
    });

    // TC09: Password > 30 ký tự
    describe('TC09 - Mật khẩu dài hơn 30 ký tự', () => {
        test('nên trả về lỗi khi mật khẩu có 31 ký tự', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '1234567890123456789012345678901'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(resGia.json).toHaveBeenCalledWith({
                success: false,
                message: "Mật khẩu tối đa 30 ký tự!"
            });
            expect(nextGia).not.toHaveBeenCalled();
        });
    });

    // Các trường hợp biên
    describe('Trường hợp biên', () => {
        test('nên hợp lệ khi mật khẩu đúng 8 ký tự', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(nextGia).toHaveBeenCalled();
            expect(resGia.json).not.toHaveBeenCalled();
        });

        test('nên hợp lệ khi mật khẩu đúng 30 ký tự', () => {
            reqGia = taoReqGia({
                email: 'levana@gmail.com',
                password: '123456789012345678901234567890'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(nextGia).toHaveBeenCalled();
            expect(resGia.json).not.toHaveBeenCalled();
        });

        test('nên hợp lệ khi email đúng 30 ký tự', () => {
            reqGia = taoReqGia({
                email: '123456789012345678901234567890',
                password: '12345678'
            });

            loginPostApi(reqGia, resGia, nextGia);

            expect(nextGia).toHaveBeenCalled();
            expect(resGia.json).not.toHaveBeenCalled();
        });
    });
});