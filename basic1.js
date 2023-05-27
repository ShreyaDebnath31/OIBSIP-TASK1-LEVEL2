let input_user = ''
let disp_input = document.getElementById('input_exp')
let disp_output = document.getElementById('out_in_box')
disp_input.innerHTML = '';
cont = '';
disp_output.innerHTML = '';
function change_digit(a) {
  disp_input.innerHTML += a
  cont = disp_input.innerHTML
}


document.getElementById('add_button').addEventListener('click', () => {

  if (cont.indexOf('+') != -1) {
    let b = cont.split('+')
    if (b[1] == ' ') {
      disp_input.innerHTML +='+' 
      
    }

    else {

      let output = parseFloat(b[0]) + parseFloat(b[1])
      disp_input.innerHTML = output + '+'

    }
  }
  else {
    disp_input.innerHTML += '+'
    
  }





})
document.getElementById('mul_button').addEventListener('click', () => {

  if (cont.indexOf('x') != -1) {
    let b = cont.split('x')
    if (b[1] == ' ') {

      disp_input.innerHTML += 'x'
    }

    else {
      let output = parseFloat(b[0]) * parseFloat(b[1])
      disp_input.innerHTML = output + 'x'
    }
  }
  else {
    disp_input.innerHTML += 'x'
  }





})

document.getElementById('div_button').addEventListener('click', () => {

  if (cont.indexOf('/') != -1) {
    let b = cont.split('/')
    if (b[1] == ' ') {

      disp_input.innerHTML += '/'
    }

    else {
      let output = parseFloat(b[0]) / parseFloat(b[1])
      disp_input.innerHTML = output + '/'
    }
  }
  else {
    disp_input.innerHTML += '/'
  }





})

document.getElementById('sub_button').addEventListener('click', () => {
  let c = disp_input.innerHTML;
  if (c.indexOf('(') !== -1 && c.indexOf('-') > c.indexOf('(')) {
    c = c.slice(c.indexOf('(') + 1)
  }
  if (c.indexOf('-') != -1) {
    let b = c.split('-')
    if (b.length == 2) {
      if (b[0] == '') {
        disp_input.innerHTML += '-'
      }

      else {
        if (b[1] == '') {
          disp_input.innerHTML += '-'
        }
        else {
          let output = parseFloat(b[0]) - parseFloat(b[1])
          disp_input.innerHTML = output.toFixed(2) + '-'
        }
      }
    }
    else if (b.length == 3) {

      if (b[1] == "") {
        let out = (parseFloat(b[0])) + parseFloat(b[2]);
        disp_input.innerHTML = out + '-';
      }

      else {
        if (b[0] != "") {
          disp_input.innerHTML += '-';

        }

        else {
          if (b[2] == '') {
            disp_input.innerHTML += '-';
          }
          else {
            let ans = ((parseFloat(b[1])) + parseFloat(b[2]));

            disp_input.innerHTML = ans.toFixed(2) + b;
          }
        }
      }
    }

  }
  else {
    disp_input.innerHTML += '-'
  }





})

document.getElementById('paren').addEventListener('click', () => {
  if (cont.indexOf('(') != -1 && cont.indexOf(')') != -1 && cont.lastIndexOf('(') < cont.lastIndexOf(')') || (cont.indexOf('(') == -1)) {
    disp_input.innerHTML += '('
  }
  else if ((cont.indexOf('(') != -1 && cont.indexOf(')') == -1) || (cont.indexOf('(') != -1 && cont.indexOf(')') != -1 && cont.LastIndexOf('(') > cont.LastIndexOf(')'))) {
    disp_input.innerHTML += ')'
  }
})

document.getElementById('percentage_button').addEventListener('click', () => {

  if(cont.indexOf('+')===-1 && cont.indexOf('-')===-1 && cont.indexOf('*')===-1 && cont.indexOf('/')===-1){
    b = parseFloat(cont) / 100
    disp_output.innerHTML = b
  }
  else{
    alert('Invalid format')
  }

})

function evalExp(exp) {
 
  while (exp.indexOf('(') !== -1) {
    let openParenIndex = exp.indexOf('(');
    let closeParenIndex = exp.indexOf(')', openParenIndex);

    let subExpression = exp.slice(openParenIndex + 1, closeParenIndex);
    let subExpressionResult = evalExp(subExpression);
    
    if(closeParenIndex!==(exp.length - 1)){
      exp =
      exp.slice(0, openParenIndex) +
      subExpressionResult +
      exp.slice(closeParenIndex + 1);
    }
    else{
      exp =
      exp.slice(0, openParenIndex) +
      subExpressionResult 
      
    }
    
  }
 
  while (exp.indexOf('x') !== -1 || exp.indexOf('/') !== -1) {
    const mulInd = exp.indexOf('x');
    const divInd = exp.indexOf('/');

    let operatorInd;
    if (mulInd !== -1 && (divInd === -1 || mulInd < divInd)) {
      operatorInd = mulInd;
    } else {
      operatorInd = divInd;
    }

    let leftOperandStartIndex = 0;
    let leftOperandEndIndex = operatorInd - 1;
    let rightOperandStartIndex = operatorInd + 1;
    let rightOperandEndIndex = exp.length-1;

    for (let i = operatorInd - 1; i >= 0; i--) {
      const char = exp.charAt(i);
  
      if (char === '+' || char === '-' || char === 'x' || char === '/') {
        leftOperandStartIndex = i + 1;
        break;
      }
      leftOperandStartIndex = i;
    }
    let leftOperand = parseFloat(exp.slice(leftOperandStartIndex, leftOperandEndIndex + 1));

    let count = 0;
    for (let i = operatorInd + 1; i < exp.length; i++) {
      const char = exp.charAt(i);

      if (char === '-') {
        if (i === operatorInd + 1) {
          count = 1;
        }
      }
      else if (char === '+' || char === '-' || char === 'x' || char === '/') {
        rightOperandEndIndex = i - 1;
        break;
        
      }

      else{
        rightOperandEndIndex = i;
      }
      
    }
    let rightOperand = parseFloat(exp.slice(rightOperandStartIndex, rightOperandEndIndex + 1));

    if (operatorInd === mulInd) {
      let prod;
      if (exp.charAt(operatorInd + 1) !== '') {
        if(count===0){
          prod = leftOperand * rightOperand;
          
          
        }else{
          let p = leftOperand * rightOperand;
          prod = '-' + p
        }
        
      }
      else {
        alert("Invalid format")

      }
      exp = exp.slice(0, leftOperandStartIndex) + prod + exp.slice(rightOperandEndIndex + 1);
    } else {
      let quot;
      if (exp.charAt(operatorInd + 1) !== '') {
        quot = leftOperand / rightOperand;

      }
      else {
        alert("Invalid format")

      }

      exp = exp.slice(0, leftOperandStartIndex) + quot + exp.slice(rightOperandEndIndex + 1);
    }
  }

  let result = 0;
  let operator = '+';
  let char = ''
  for (let i = 0; i < exp.length; i++) {
    char = exp.charAt(i);

    if (char === '+' || char === '-') {
      operator = char;
    } else {
      const operand = parseFloat(exp.slice(i));

      if (operator === '+') {
        result += operand;
      } else {
        result -= operand;
      }

      i += operand.toString().length - 1;
    }
  }

  return result.toFixed(2);
}



let DECIMAL = document.getElementById('dec');

DECIMAL.addEventListener('click', () => {
  disp_input.innerHTML += '.';
})



document.getElementById('equal_button').addEventListener('click', () => {

  e = disp_input.innerHTML;
  disp_output.innerHTML = evalExp(e);
  cont = disp_output.innerHTML

})


document.getElementById('all_clr').addEventListener('click', () => {
  disp_input.innerHTML = '';
  cont = '';
  disp_output.innerHTML = '';
});



document.getElementById('del').addEventListener('click', () => {
  let val = disp_input.innerHTML;


  if (val.length == 1) {
    disp_input.innerHTML = 0;
    disp_output.innerHTML = 0;
  }


  else {

    disp_input.innerHTML = val.slice(0, -1);

  }
})

