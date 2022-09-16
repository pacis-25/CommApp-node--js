let editForm = document.querySelector("#editForm");

editForm.addEventListener('submit', editUser);
function editUser(e) {
    e.preventDefault();

    let name = document.getElementById("fullName").value;
    let email = document.getElementById("Email").value;

    if (name == ""){
        alert("name is required");
        return false;
    } else if (email == "" ){
        alert("email is required");
    } else {
        let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(emailformat)){
            axios.post('/edit-user/:_id', {
                name: name,
                email: email
            }).then(response => {
                location.assign('/user-list');
            }).catch(err => {
                alert(err.response.data.error)
            })
            return true;
        } else {
            alert("invalid email");
            return false;
        }
    }
}