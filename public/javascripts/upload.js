const form = document.querySelector("form");
const field = document.querySelector("#file_label");
const file = document.querySelector("#file_name");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (field.value == "") {
        alert("File Description is Required");
    }
    else if (file.value == "") {
        alert("Please chose a file");
    }
    else {
        const formData = new FormData(form);
        axios.post("http://localhost:3001/docs-list", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

