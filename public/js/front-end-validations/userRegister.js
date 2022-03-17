window.addEventListener('load',function(){

    let form = document.querySelector('form')
    
    
    form.addEventListener('submit',function(e){
        let inputName1 = document.querySelector('#Name')
        let inputLastName1 = document.querySelector('#LastNamee')
        let inputUserName1 = document.querySelector('#userName')
        let inputDate1 = document.querySelector('#Date')
        let inputPass1 = document.querySelector('#password')
        let inputPassConfirm1 = document.querySelector('#confirm_password')
        let img1 = document.querySelector('#file')
    
        error=[]
        console.log(inputName1.value)
    
        if(inputName1.value=="")
        {
            error.push('El Nombre no puede estar Vacio')      
        }
        else if (inputLastName1.value=="")
        {
            error.push('El Apellido no puede estar Vacio')            
        }
        else if (inputUserName1.value=="")
        {
            error.push('El Nombre de usuario no puede estar Vacio')             
        }
        else if (inputDate1.value=="")
        {
            error.push('La fecha no puede estar Vacia')
        }
        else if (inputPass1.value=="" & inputPass1.value.lenght>8)
        {
            error.push('La contraseña no puede estar Vacia ni tener menos de 8 digitos')     
        }
        else if (inputPassConfirm1.value=="")
        {
            error.push('La a anterior')    
        }
      })
     })