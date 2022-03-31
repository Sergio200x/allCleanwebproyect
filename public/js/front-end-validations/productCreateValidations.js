window.addEventListener('load',function(){
   

    let form = document.querySelector('#product-create-form')
    let submit = document.querySelector('.register-submit')

    form.addEventListener('submit', (e) =>{

        let name = document.querySelector('#name-prod')
        let description = document.querySelector('#description-prod')
        let category = document.querySelector('#category-prod')
        let price = document.querySelector('#price-prod')
        let quantity = document.querySelector('#quantity-prod')
        let isOffer= document.querySelector('#yesCheck')
        let offerYes = document.querySelector('#yes')
        let file = document.querySelector('#file')

        let errors= []

        if (name.value == ''){
            errors.push('El nombre del producto no puede estar vacio')
        }
        else if (name.value.length < 5){
            errors.push('El nombre debe tener un mínimo de 5 caracteres')
        }

        else if(description.value == ""){
            errors.push('La descripcion del producto no puede estar vacia')
        }
        else if (description.value.length < 20){
            errors.push('La descripción debe tener un mínimo de 20 caracteres')
        }
        else if (description.value.length > 45){
            errors.push('La descripción debe tener un máximo de 45 caracteres')
        }

        else if(category.value == ""){
            errors.push('Debes elegir una categoría')
        }

        else if(price.value == ""){
            errors.push('El precio del producto no puede estar vacio')
        }
        else if(price.value < 1){
            errors.push('El precio debe ser mayor a cero')
        }

        else if(quantity.value == ""){
            errors.push('La cantidad del producto no puede estar vacio')
        }
        else if(quantity.value <1){
            errors.push('Debes ingresar al menos 1 unidad para el producto')
        }

        else if(offerYes.value == "" && !offerYes.disabled){
            errors.push('Debes ingresar un valor de descuento')
        }
        else if(offerYes.value < 1  && !offerYes.disabled){
            errors.push('El descuento no puede ser menor a 1')
        }

        else if(file.value == ""){
            errors.push('Debes subir una imagen del producto')
        }


        if (errors.length > 0){
            e.preventDefault()
            for(let i=0; i < errors.length;i++){
                swal('Se encontro un error!', errors[i], "error")
            }
        } 
            
        else{  
            swal("No se encontraron errores",'', "success");
    
            submit.addEventListener('click', function(){
    
                form.submit()
                
    
            })
    
        }

    })

})