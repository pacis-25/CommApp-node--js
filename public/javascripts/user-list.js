// for modals
function showConfirmBox(userId) {
  document.getElementById("overlay").hidden = false;
  let delete_btn = document.querySelector('.btn-delete');

  delete_btn.addEventListener('click', (e)=>{
    window.location.href=`user-list/${userId}`
  })
  console.log(userId);

}
  function closeConfirmBox() {
  document.getElementById("overlay").hidden = true;
}



