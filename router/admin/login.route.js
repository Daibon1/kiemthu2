const express = require('express');
const router = express.Router();
const systemConfig = require('../../config/system');

router.get('/', (req, res) => {
  res.render('admin/pages/login', { error: null });
});

router.post('/', (req, res) => {
  // TODO: Xử lý đăng nhập admin
  const { username, password } = req.body;
  // Giả sử kiểm tra đơn giản
  if (username === 'admin' && password === '123456') {
    // Đăng nhập thành công
    // Có thể lưu session tại đây
    return res.redirect(systemConfig.prefixAdmin + '/dashboard');
  }
  res.render('admin/pages/login', { error: 'Sai tên đăng nhập hoặc mật khẩu!' });
});

module.exports = router;
