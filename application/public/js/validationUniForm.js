
function validateForm(){
    let valid = true;
  
   
    const brandInput =document.getElementById('brand');
    const modelInput =document.getElementById('model');
    const waterproofRatingInput =document.getElementById('waterproofRating');
    const priceInput =document.getElementById('price');
    const availableQuantityInput =document.getElementById('availableQuantity');
    const motorPowerInput =document.getElementById('motorPower');
    const batteryCapacityInput =document.getElementById('batteryCapacity');
    const tireDiameterInput =document.getElementById('tireDiameter');
    
    
    const errorBrand =document.getElementById('errorBrand');
    const errorModel =document.getElementById('errorModel');
    const errorWaterproofRating =document.getElementById('errorWaterproofRating');
    const errorPrice =document.getElementById('errorPrice');
    const errorAvailableQuantity =document.getElementById('errorAvailableQuantity');
    const errorMotorPower =document.getElementById('errorMotorPower');
    const errorBatteryCapacity =document.getElementById('errorBatteryCapacity');
    const errorTireDiameter =document.getElementById('errorTireDiameter');
    const errorsSummary =document.getElementById('errorsSummary');


    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const signsMessage = document.getElementById('errorMessage-10signs').innerText;
    const sumMessage = document.getElementById('errorMessage-sum').innerText;

   

resetErrors(
[brandInput,modelInput,waterproofRatingInput,priceInput,availableQuantityInput,
    motorPowerInput,batteryCapacityInput,tireDiameterInput],
[errorBrand,errorModel,errorWaterproofRating,errorPrice,errorAvailableQuantity,
    errorMotorPower,errorBatteryCapacity,errorTireDiameter],
errorsSummary)
    

   
if(checkSubmitted()){
    if(!checkRequired(brandInput.value)){

        valid=false;
        brandInput.classList.add("error-input");
        brandInput.classList.remove("correct-input");
        errorBrand.innerText = reqMessage;
    } else if(!checkTextLengthRange(brandInput.value,0,10)){
        valid=false;
        brandInput.classList.add("error-input");
        brandInput.classList.remove("correct-input");
        errorBrand.innerText = signsMessage;
    }else{
        brandInput.classList.remove("error-input");
        brandInput.classList.add("correct-input");
        errorBrand.innerText = ""
    }

    if(!checkRequired(modelInput.value)){

        valid=false;
        modelInput.classList.add("error-input");
        modelInput.classList.remove("correct-input");
        errorModel.innerText = reqMessage;
    } else if(!checkTextLengthRange(modelInput.value,0,10)){
        valid=false;
        modelInput.classList.add("error-input");
        modelInput.classList.remove("correct-input");
        errorModel.innerText = signsMessage;
    }else{
        modelInput.classList.remove("error-input");
        modelInput.classList.add("correct-input");
        errorModel.innerText = ""
    }


    if(!checkRequired(availableQuantityInput.value)){

        valid=false;
        availableQuantityInput.classList.add("error-input");
        availableQuantityInput.classList.remove("correct-input");
        errorAvailableQuantity.innerText = reqMessage;
    }else{
        availableQuantityInput.classList.remove("error-input");
        availableQuantityInput.classList.add("correct-input");
        errorAvailableQuantity.innerText = "";
    }

    if(!checkRequired(motorPowerInput.value)){

        valid=false;
        motorPowerInput.classList.add("error-input");
        motorPowerInput.classList.remove("correct-input");
        errorMotorPower.innerText = reqMessage;
    }else{
        motorPowerInput.classList.remove("error-input");
        motorPowerInput.classList.add("correct-input");
        errorMotorPower.innerText = "";
    }

    if(!checkRequired(batteryCapacityInput.value)){

        valid=false;
        batteryCapacityInput.classList.add("error-input");
        batteryCapacityInput.classList.remove("correct-input");
        errorBatteryCapacity.innerText = reqMessage;
    }else{
        batteryCapacityInput.classList.remove("error-input");
        batteryCapacityInput.classList.add("correct-input");
        errorBatteryCapacity.innerText = "";
    }

    if(!checkRequired(priceInput.value)){

        valid=false;
        priceInput.classList.add("error-input");
        priceInput.classList.remove("correct-input");
        errorPrice.innerText = reqMessage;
    }else{
        priceInput.classList.remove("error-input");
        priceInput.classList.add("correct-input");
        errorPrice.innerText = "";
    }

    if(!checkRequired(tireDiameterInput.value)){

        valid=false;
        tireDiameterInput.classList.add("error-input");
        tireDiameterInput.classList.remove("correct-input");
        errorTireDiameter.innerText = reqMessage;
    }else{
        tireDiameterInput.classList.remove("error-input");
        tireDiameterInput.classList.add("correct-input");
        errorTireDiameter.innerText = "";
    }

    waterproofRatingInput.classList.add("correct-input");

    if(!valid){

    errorsSummary.innerText = sumMessage;

    }

}
    
return valid;
}



