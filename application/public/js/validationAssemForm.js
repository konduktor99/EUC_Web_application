function validateForm(){
    let valid = true;

    //const idAssemblyInput =document.getElementById('idAssembly');
    const priceInput =document.getElementById('assemblyPrice');
    const startDateInput =document.getElementById('startDate');
    const endDateInput =document.getElementById('endDate');
    const clientNameInput =document.getElementById('clientName');
    const unicycleInput =document.getElementById('unicycle');
    const clientRemarksInput =document.getElementById('clientRemarks');
    const partNameInput =document.getElementById('partName');
    const clientNumberInput =document.getElementById('clientNumber');
    
    
    //const errorIdAssembly =document.getElementById('errorIdAssembly');
    const errorPrice =document.getElementById('errorAssemblyPrice');
    const errorStartDate =document.getElementById('errorStartDate');
    const errorEndDate =document.getElementById('errorEndDate');
    const errorClientName =document.getElementById('errorClientName');
    const errorUnicycle =document.getElementById('errorUnicycle');
    const errorPartName =document.getElementById('errorPartName');
    const errorClientNumber =document.getElementById('errorClientNumber');
    const errorsSummary =document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const signs25Message = document.getElementById('errorMessage-25signs').innerText;
    const signs9Message = document.getElementById('errorMessage-25signs').innerText;
    const priceMessage = document.getElementById('errorMessage-price').innerText;
    const sumMessage = document.getElementById('errorMessage-sum').innerText;
    const dateFormatMessage = document.getElementById('errorMessage-dateFormat').innerText;
    const datePastMessage = document.getElementById('errorMessage-datePast').innerText;
    const dateBeforeMessage = document.getElementById('errorMessage-dateBefore').innerText;


    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + (nowDate.getDate() ),
    year = '' + (nowDate.getFullYear())

    if(month.length<2)
        month = '0' + month;
    if(day.length<2)
        day = '0' + day;
    const nowString = [year,month,day].join('-');



    resetErrors(
        [priceInput,startDateInput,endDateInput,clientNameInput,clientRemarksInput,
            unicycleInput,partNameInput,clientNumberInput],
        [errorPrice,errorStartDate,errorEndDate,errorClientName,errorUnicycle
           ,errorPartName,errorClientNumber],
        errorsSummary)
        
if(checkSubmitted()){
    if(!checkRequired(clientNameInput.value)){

        valid=false;
        clientNameInput.classList.add("error-input");
        errorClientName.innerText = reqMessage;
    } else if(!checkTextLengthRange(clientNameInput.value,0,25)){
        valid=false;
        clientNameInput.classList.add("error-input");
        errorClientName.innerText = signs25Message;
    }else{
        clientNameInput.classList.add("correct-input");
    }

    if(!checkRequired(clientNumberInput.value)){

        valid=false;
        clientNumberInput.classList.add("error-input");
        errorClientNumber.innerText = reqMessage;
    } else if(!checkTextLengthRange(clientNumberInput.value,9,9)){
        valid=false;
        clientNumberInput.classList.add("error-input");
        errorClientNumber.innerText = signs9Message;
    }else{
        clientNumberInput.classList.add("correct-input");
    }

    // if(!checkRequired(idAssemblyInput.value)){

    //     valid=false;
    //     idAssemblyInput.classList.add("error-input");
    //     errorIdAssembly.innerText = "Pole jest wymagane.";
    // } else {
    //     idAssemblyInput.classList.add("correct-input");
    // }
    if(!checkRequired(priceInput.value)){

        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = reqMessage;
    }else if(!checkNumberRange(priceInput.value,0,10000)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = priceMessage;
        //"Cena musi być większa od 0 zł i mniejsza od 10000 zł.";
    }else{
        priceInput.classList.add("correct-input");
    }

    if(!checkRequired(startDateInput.value)){

        valid=false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = reqMessage;
    }else if(!checkDate(startDate.value)){

        valid=false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = dateFormatMessage;
        //"Data musi być w formacie dd-mm-yyyy.";

    }else if(checkDateIfAfter(startDateInput.value,nowString)){

        valid=false;
        startDateInput.classList.add("error-input");
        errorStartDate.innerText = datePastMessage;

    }else{
        startDateInput.classList.add("correct-input");
    }


    if(!checkRequired(endDateInput.value)){

        valid=false;
        endDateInput.classList.add("error-input");
        errorEndDate.innerText = reqMessage;
    }else if(!checkDate(endDateInput.value)){

        valid=false;
        endDateInput.classList.add("error-input");
        errorEndDate.innerText = dateFormatMessage;

    }else if(checkDateIfAfter(startDateInput.value,endDateInput.value)){

        valid=false;
        endDateInput.classList.add("error-input");
        errorEndDate.innerText = dateBeforeMessage;

    }else{
        endDateInput.classList.add("correct-input");
    }

    if(!checkRequired(unicycleInput.value)){

        valid=false;
        unicycleInput.classList.add("error-input");
        errorUnicycle.innerText = reqMessage;
    }else{
        unicycleInput.classList.add("correct-input");
    }

 
    clientRemarksInput.classList.add("correct-input");
    

    if(!checkRequired(partNameInput.value)){

        valid=false;
        partNameInput.classList.add("error-input");
        errorPartName.innerText = reqMessage;
    }else{
        partNameInput.classList.add("correct-input");
    }


    if(!valid){

    errorsSummary.innerText = sumMessage;

    }
}    

return valid;
}