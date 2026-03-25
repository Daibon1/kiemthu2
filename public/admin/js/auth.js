const formLogin=document.querySelector("#form-login");
if(formLogin){
    const inputs=formLogin.querySelectorAll("input");
    console.log(inputs);
    inputs.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Ngăn form submit khi Enter
        const nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus(); // Chuyển sang input tiếp theo
        else document.getElementById('submitBtn').focus(); // Nếu cuối, nhảy nút gửi
      }
    });
  });
}