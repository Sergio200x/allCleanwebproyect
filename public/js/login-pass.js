function validateForm() {
    const password = document.forms["login-form"]["password"].value;
    const email = document.forms["login-form"]["email"].value;
    if (password == "") {
      alert("El password no puede estar vacío");
      return false;
    }else if(email == ""){
        alert("El email no puede estar vacío");
        return false;
    }
  }