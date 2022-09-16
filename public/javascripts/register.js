let regForm = document.querySelector('#register');

regForm.addEventListener('submit', registration);
function registration(e) {
	e.preventDefault();
	let name = document.getElementById("fullname").value;
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	let confirmPass = document.getElementById("cpassword").value;
	let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (name == ""){
		alert("Name is requried");
		return false;
	} else if (email == ""){
		alert("email is required");
		return false;
	} else if (password == ""){
		alert("password is required");
		return false;
	} else if (confirmPass == ""){
		alert("confirm password is required");
		return false;
	} else if (password != confirmPass){
		alert("password does not matched");
		return false;
	} else {
		if (email.match(emailformat)) {
			axios.post('register', {
				name: name,
				email: email,
				password: password
			}).then(response => {
				location.assign('/registration-success');
			}). catch(err => {
				alert(err.response.data.error)
			})
			return true;
		} else {
			alert("email is invalid");
			return false;
		}
	}
	
}

	
	




