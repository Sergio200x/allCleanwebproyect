window.addEventListener("load", ()=>{
    const form = document.querySelector('#login-form');
    const submit = document.querySelector('#login-submit');
    
    submit.addEventListener('click', (e)=>{
        e.preventDefault();

        const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const email = document.querySelector('#login-email');
        const errorEmail = document.querySelector('.errorEmail');
        const password = document.querySelector('#password');  
        const errorPassword = document.querySelector('.errorPassword');  
                
        let errors = {};

        if(email.value == ""){
            errors.email = "Debes ingresar un email";
        }
        else if(!email.value.match(validEmail)){
            errors.email = "Debes ingresar un email válido";
        }

        if(password.value == ""){
            errors.password = "Debes ingresar un password";
        }
        
        if(Object.keys(errors).length >= 1){
            errorEmail.innerText = (errors.email) ? errors.email : '';
            errorPassword.innerText = (errors.password) ? errors.password : '';
        }else{
            form.submit();
        }
    })
})