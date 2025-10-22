const temp = prompt("Enter temperature and unit(eg: 32F, 25C):");

function CtoF(celsius) {
    return (celsius * 9 / 5) + 32;
}

function FtoC(fahrenheit) {
    console.log((fahrenheit - 32) * 5 / 9);
    return (fahrenheit - 32) * 5 / 9;
}

function convertTemp(tempStr, unitFrom, unitTo) {
    const originalTemp = parseFloat(tempStr.slice(0,-1));
    const convertTemp = (unitFrom === 'C') ? CtoF(originalTemp).toFixed(2) : FtoC(originalTemp).toFixed(2);
    const result = `${originalTemp}${unitFrom} is ${convertTemp}${unitTo}`;
    resultPre.textContent = result;
    alert(result);
}

const unit = temp.slice(-1).toUpperCase();
const resultPre = document.querySelector('pre');
if(unit === 'C' ){
    convertTemp(temp, 'C', 'F');
}else if(unit === 'F'){
    convertTemp(temp, 'F', 'C');
}else{
    alert("Invalid unit!")
}