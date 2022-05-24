function validateForm(){
    let valid = true;

    const nameInput =document.getElementById('name');
    const availableQuantityInput =document.getElementById('availablePartQuantity');
    const priceInput =document.getElementById('price');
    const typeInput =document.getElementById('type');
    const unicycleInput =document.getElementById('forUnicycle');
    
    
    const errorName =document.getElementById('errorName');
    const errorAvailableQuantity =document.getElementById('errorAvailablePartQuantity');
    const errorPrice =document.getElementById('errorPrice');
    const errorType =document.getElementById('errorType');
    //const errorUniBrand =document.getElementById('errorForBrand');
    //const errorUniModel =document.getElementById('errorForModel');
    const errorsSummary =document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const signsMessage = document.getElementById('errorMessage-20signs').innerText;
    const sumMessage = document.getElementById('errorMessage-sum').innerText;

    resetErrors(
        [nameInput,availableQuantityInput,priceInput,typeInput,
            unicycleInput],
        [errorName,errorAvailableQuantity,errorPrice,errorType,],
        errorsSummary)

        
    

    if(checkSubmitted()){

        if(!checkRequired(nameInput.value)){

            valid=false;
            nameInput.classList.add("error-input");
            errorName.innerText = reqMessage;
        } else if(!checkTextLengthRange(nameInput.value,0,20)){
            valid=false;
            nameInput.classList.add("error-input");
            errorName.innerText = signsMessage;
        }else{
            nameInput.classList.add("correct-input");
        }

        if(!checkRequired(availableQuantityInput.value)){

            valid=false;
            availableQuantityInput.classList.add("error-input");
            errorAvailableQuantity.innerText = reqMessage;
        } else {
            availableQuantityInput.classList.add("correct-input");
        }

        if(!checkRequired(priceInput.value)){

            valid=false;
            priceInput.classList.add("error-input");
            errorPrice.innerText = reqMessage;
        }else{
            priceInput.classList.add("correct-input");
        }


       

        if(!checkRequired(typeInput.value)){

            valid=false;
            typeInput.classList.add("error-input");
            errorType.innerText = reqMessage;
        }else{
            typeInput.classList.add("correct-input");
        }
        // if(!checkRequired(uniBrandInput.value)){

        //     valid=false;
        //     uniBrandInput.classList.add("error-input");
        //     errorUniBrand.innerText = "Pole jest wymagane.";
        // }else{
        //     uniBrandInput.classList.add("correct-input");
        // }
        // if(!checkRequired(uniModelInput.value)){

        //     valid=false;
        //     uniModelInput.classList.add("error-input");
        //     errorUniModel.innerText = "Pole jest wymagane.";
        // }else{
        //     uniModelInput.classList.add("correct-input");
        // }
        unicycleInput.classList.add("correct-input");
        

        if(!valid){

        errorsSummary.innerText = sumMessage;

        }
    }
return valid;
}

