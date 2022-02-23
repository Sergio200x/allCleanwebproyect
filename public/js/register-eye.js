if(document.getElementById("visibilityBtn")){
    const visibilityBtn = document.getElementById("visibilityBtn");

    visibilityBtn.addEventListener("click", toggleVisibility);

    function toggleVisibility()
    {
        const passwordInput = document.getElementById("password");  
        const icon = document.getElementById("icon");
        
        if(passwordInput.type === "password")
        {
            passwordInput.type = "text";
            icon.innerText = "visibility_off"

        }else{
            passwordInput.type = "password";
            icon.innerText = "visibility"
        }
    }
}

if(document.getElementById("visibilityBtn2")){
    const visibilityBtn2 = document.getElementById("visibilityBtn2");

    visibilityBtn2.addEventListener("click", toggleVisibility2);

    function toggleVisibility2()
    {
        const confirmPasswordInput = document.getElementById("confirm_password");
        const icon2 = document.getElementById("icon2");
        if(confirmPasswordInput.type === "password")
        {
            confirmPasswordInput.type = "text";
            icon2.innerText = "visibility_off"

        }else{
            confirmPasswordInput.type = "password";
            icon2.innerText = "visibility"
        }
    }
}

