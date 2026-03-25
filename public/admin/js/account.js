// showw password
const togglePassword = document.querySelector('#toggle-password');
const passwordInput = document.querySelector('#password-input');
const eyeIcon = document.querySelector('#eye-icon');

togglePassword.addEventListener('click', function () {
    // Chuyển đổi kiểu input
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Thay đổi biểu tượng con mắt
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
});
const preview = document.querySelector("#preview-img");
if (preview) {
    const inputFile = preview.querySelector("#file-input");
    const imgPreview = preview.querySelector("#img-preview");
    inputFile.addEventListener("change",(e)=>{
        const src = URL.createObjectURL(e.target.files[0]);
        imgPreview.src=src;
    })
}