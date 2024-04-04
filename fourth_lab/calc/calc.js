let a = '';   // Первое число
let b = '';   // Второе число
let sign = '';   // Знак математической операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

// Экран
const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = ''; // это первое число
    b = ''; // второе
    sign = ''; // знак
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
	  // нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
		// нажата кнопка ClearAll (ac) 
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';
		// получаю нажатую кнопку
    const key = event.target.textContent;
    
		// если нажата клавиша - +/- или "%"
    if (key === '+/-') {
        if (b === '') {
            a = (+a) * -1;
            out.textContent = a;
        } else {
            b = (+b) * -1;
            out.textContent = b;
        }
        return;
    }

    if (key === '%') {
        if (b === '') {
            a = (+a) / 100;
            out.textContent = a;
        } else {
            b = (+b) / 100;
            out.textContent = b;
        }
        return;
    }

		// если нажата клавиша 0-9 или "."
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            b += key;
            out.textContent = b;
        }
        return;
    }

		// если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        return;
    }

		// результат мат. операции =
    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case 'X':
                a = a * b;
                break;
            case '/':
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
    }
};
