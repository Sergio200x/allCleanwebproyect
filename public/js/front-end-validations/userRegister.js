window.addEventListener('load',function(){

let form = document.querySelector('#register-create-form')
let submit = document.querySelector('.register-submit')

console.log(submit.value)

form.addEventListener('submit',function(e){
    let inputName = document.querySelector('#Name')
    let inputLastName = document.querySelector('#LastName')
    let inputUserName = document.querySelector('#userName')
    let inputMail = document.querySelector('#Mail')
    let inputDate = document.querySelector('#Date')
    let inputPass= document.querySelector('#password')
    let inputPassConfirm = document.querySelector('#confirm_password')

     let error=[]
    
    if(inputName.value=="")
    {        
        error.push('El Nombre no puede estar Vacio') 
    }
    else if (inputLastName.value=="")
    {
        error.push('El Apellido no puede estar Vacio')  
    }    
    else if (inputUserName.value=="")
    {
        error.push('El Nombre de usuario no puede estar Vacio') 
    }
    else if (inputMail.value=="")
    {
        error.push('El Mail no puede estar Vacio') 
    }
    else if (inputDate.value=="")
    {
        error.push('La fecha no puede estar Vacia')
    }
    else if (inputPass.value=="")
    {
        error.push('La contraseña no puede estar Vacia ni tener menos de 8 digitos') 
    }
    else if (inputPassConfirm.value=="")
    {
        error.push('La a anterior')
    } 
   
    
    if(error.length>0)
    {
        for(errors of error)
        {
            swal("Aviso!!!", errors, "error");
        }
        e.preventDefault()
    }
    else
    {
        swal("Excelente!!!", "Te registraste exitosamente", "success");
    }

    


  })
 })