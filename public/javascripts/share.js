
// remove shared file
function showConfirmBox(fileId, sharedID) {
    document.getElementById("overlay").hidden = false;
    let delete_btn = document.querySelector('.deleteBtn');
    delete_btn.addEventListener('click', (e) =>{
        axios.get(`http://localhost:3001/share/${fileId}/${sharedID}`).then(response =>{
            
        })
        location.reload();
    })
}
    

function ThisConfirm() {
    
    closeConfirmBox();
}



