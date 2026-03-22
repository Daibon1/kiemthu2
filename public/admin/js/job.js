//change status
const changeStatus = document.querySelectorAll("[change-status]");
if (changeStatus.length > 0) {
    changeStatus.forEach(button => {
        button.addEventListener("click", () => {
            let status = button.getAttribute("data-status");
            let id = button.getAttribute("data-id")
            let changeStatus = status == "active" ? "inactive" : "active";
            const formChangeStatus = document.querySelector("#form-change-status")
            formChangeStatus.action = `${formChangeStatus.getAttribute("path")}/${changeStatus}/${id}?_method=PATCH`;
            formChangeStatus.submit();
        })
    })
}
// end change status
// delete 
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xoá không?");
            if (isConfirm) {
                let id = button.getAttribute("data-id");
                let path = formDeleteItem.getAttribute("path");
                formDeleteItem.action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.submit();
            }
        })
    })
}
// end delete
// preview
const preview = document.querySelector("#preview-img");
if (preview) {
    const inputFile = preview.querySelector("#file-input");
    const imgPreview = preview.querySelector("#img-preview");
    inputFile.addEventListener("change",(e)=>{
        const src = URL.createObjectURL(e.target.files[0]);
        imgPreview.src=src;
    })
}
// end preview