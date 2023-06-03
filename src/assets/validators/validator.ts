export const validateText = (text: string) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};

    if (text === '') {
        verify = false;
        msgm['empty'] = 'O campo não pode ser vazio.';
    } else if (text.length < 3 || text.length > 100) {
        verify = false;
        msgm['amount'] = 'O campo não pode ter menos de 3 caracteres ou mais de 100.';
    } else if (text[0] === ' ' || text[text.length - 1] === ' ') {
        verify = false;
        msgm['spaces'] = 'Espaços inválidos.';
    }

    for (const char of text) {
        if (
            char.toLowerCase() !== char.toUpperCase() &&
            !'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ0 '.includes(char)
        ) {
            verify = false;
            msgm['char'] = 'Campo contém caracteres inválidos.';
            break;
        }
    }

    if (
        text.includes('SELECT') ||
        text.includes('UPDATE') ||
        text.includes('DELETE') ||
        text.includes('INSERT')
    ) {
        verify = false;
        msgm['bad_intention'] = 'Tentativa de injeção de SQL.';
    }

    if (verify === false) {
        return msgm;
    } else {
        return '';
    }
};



export const validateTextofDescription = (text: string) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};

    if (text === '') {
        verify = false;
        msgm['empty'] = 'O campo não pode ser vazio.';
    } else if (text.length < 3 || text.length > 2045) {
        verify = false;
        msgm['amount'] = 'O campo não pode ter menos de 3 caracteres ou mais de 2045.';
    } else if (text[0] === ' ' || text[text.length - 1] === ' ') {
        verify = false;
        msgm['spaces'] = 'Espaços inválidos.';
    }

    for (const char of text) {
        if (
            char.toLowerCase() !== char.toUpperCase() &&
            !'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ0 '.includes(char)
        ) {
            verify = false;
            msgm['char'] = 'Campo contém caracteres inválidos.';
            break;
        }
    }

    if (
        text.includes('SELECT') ||
        text.includes('UPDATE') ||
        text.includes('DELETE') ||
        text.includes('INSERT')
    ) {
        verify = false;
        msgm['bad_intention'] = 'Tentativa de injeção de SQL.';
    }

    if (verify === false) {
        return msgm;
    } else {
        return '';
    }
};


export const pass_validate = (password: string): boolean => {
    while (!(
        /.{8,}/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%&*]/.test(password)
    )) {
        return false;
    }
    return true;
}


export const confirm_pass = (password: string, confirmPassword: string): boolean => {
    if (password !== confirmPassword) {
        return false;
    }

    return true;
};


export const emailValidate = (email: string) => {
    const regexEmail = /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+([.]\w{2,})+$/;
    return regexEmail.test(email);
};


export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/[-.()]+/g, '');
    if (/^\d{1,11}$/.test(cleanedPhoneNumber)) {
        return true;
    } else {
        return false;
    }
};


export const valueInput = (value: string): boolean => {
    const normalizedValue = value.replace('R$', '').replace('.', '').replace(',', '.').replace('%', '');
    const numberValue = Number(normalizedValue);
    if (isNaN(numberValue) || numberValue < 0) {
      return false;
    }
  
    return true;
};


  export const validateQuantity = (quantity: number): boolean => {
    if (isNaN(quantity) || quantity < 0 || quantity > 99999) {
      return false;
    }
  
    return true;
  };


  export const isValidDate = (dateString: string): boolean => {
    return !isNaN(Date.parse(dateString));
};

export const getErrorMessage = (msgm: { [key: string]: string }) => {
    let errorMessage = '';
    for (const key in msgm) {
        errorMessage += `${msgm[key]} `;
    }
    return errorMessage.trim();
};
