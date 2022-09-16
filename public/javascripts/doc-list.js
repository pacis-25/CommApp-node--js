function showUploadModal() {
    document.getElementById("overlay").hidden = false;
}

function closeConfirmBox() {
    document.getElementById("overlay").hidden = true;
}
function closeConfirmBox1() {
    document.getElementById("overlay1").hidden = true;
}
function closeConfirmBox2() {
    document.getElementById("overlay2").hidden = true;
}


// upload files

//edit file
function showEditBox(userID) {
    document.getElementById("overlay1").hidden = false;
    let update_btn = document.querySelector('.btnSave');
    let update_label = document.querySelector("#editFile");
    update_btn.addEventListener('click', (e) =>{
        if (update_label.value == ""){
            alert("file description is require")
        } else {
            axios.put(`http://localhost:3001/docs-list/${userID}`,{
                labelName: update_label.value}).then(response => {
            })
            location.reload();
        }
       
    })
}




// delete file
function confirmDelete(userId) {
    document.getElementById("overlay2").hidden = false;
    let delete_btn = document.querySelector('.btn-delete');

  delete_btn.addEventListener('click', (e)=>{
    window.location.href=`/docs-list/${userId}`
  })
  console.log(userId);
}

function deleteFile() {
    closeConfirmBox();
}