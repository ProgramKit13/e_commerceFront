export const validateDiferentText = (text: string, required:boolean, pureText: boolean) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};

    if (text === '' && required) {
        verify = false;
        msgm['empty'] = 'O campo não pode ser vazio.';
    }

    if ((text !== '') && (text.length < 3 || text.length > 100)) {
        verify = false;
        msgm['amount'] = 'O campo não pode ter menos de 3 caracteres ou mais de 100.';
    } else if (text[0] === ' ' || text[text.length - 1] === ' ') {
        verify = false;
        msgm['spaces'] = 'Espaços inválidos.';
    }

    if (
        text !== '' &&
        (text.includes('SELECT') ||
        text.includes('UPDATE') ||
        text.includes('DELETE') ||
        text.includes('INSERT'))
    ) {
        verify = false;
        msgm['bad_intention'] = 'Tentativa de injeção de SQL.';
    }

    if (text !== '' && pureText) {
        for (const char of text) {
            if (
                char.toLowerCase() !== char.toUpperCase() &&
                !'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáéíóúàèìòùâêîôûãõçÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇ0123456789 '.includes(char)
            ) {
                verify = false;
                msgm['char'] = 'Campo contém caracteres inválidos.';
                break;
            }
        }
    }

    if (verify === true) {
        text = text.toLowerCase().split(' ').map(word => !isNaN(parseFloat(word.charAt(0))) ? word : word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    }

    if (verify === false) {
        return msgm;
    } else {
        return text;
    }
};

export const validateWeight = (weight: string) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};
  
    if (weight === '') {
      verify = false;
      msgm['empty'] = 'O campo não pode ser vazio.';
    } else {
      const weightValue = parseFloat(weight);
  
      if (isNaN(weightValue) || weightValue < 0 || weightValue > 1000) {
        verify = false;
        msgm['amount'] = 'O peso deve ser um valor numérico entre 0 e 1000.';
      }
    }
  
    if (verify === false) {
      return msgm;
    } else {
      return '';
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


export const valueInputRequired = (value: string) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};

    if (value === '') {
        verify = false;
        msgm['empty'] = 'O campo não pode ser vazio.';
    } else {
        const normalizedValue = value.replace('R$', '').replace('.', '').replace(',', '.').replace('%', '');
        const numberValue = Number(normalizedValue);
        if (isNaN(numberValue) || numberValue < 0) {
            verify = false;
            msgm['format'] = 'O campo precisa ser um número positivo.';
        }
    }

    if (verify === false) {
        return msgm;
    } else {
        return '';
    }
};

export const validateDimensions = (dimensions: string) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};
    if (dimensions !== '') {      
         let values = dimensions.split("x");
         if (values.length !== 3) {
            verify = false;
            msgm['format'] = 'As dimensões devem estar no formato correto (comprimento x largura x altura).';
        } else {
            for (let i = 0; i < values.length; i++) {
                let dimension = parseFloat(values[i]);
                if (isNaN(dimension) || dimension <= 0) {
                    verify = false;
                    msgm['values'] = 'Cada dimensão deve ser um número positivo.';
                    break;
                }
            }
        }

        if (verify === false) {
            return msgm;
        } else {
            return '';
        }
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



export const validateQuantity = (quantity: number) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};
  
    if (isNaN(quantity) || quantity < 0 || quantity > 1000) {
      verify = false;
      msgm['range'] = 'A quantidade deve ser um valor numérico entre 0 e 1000.';
    }
  
    if (quantity === undefined || quantity === null) {
      verify = false;
      msgm['empty'] = 'A quantidade não pode ser vazia.';
    }
  
    if (verify === false) {
      return msgm;
    } else {
      return '';
    }
  };


export const validateBarCode = (barCode: string) => {
    let verify = true;
    const msgm: { [key: string]: string } = {};

    if (barCode !== '') {
        
        if (barCode.length < 8 || barCode.length > 13) {
            verify = false;
            msgm['amount'] = 'O campo não pode ter menos de 8 caracteres ou mais de 13.';
        } else if (!/^\d+$/.test(barCode)) {
            verify = false;
            msgm['digits'] = 'O código de barras deve conter apenas dígitos.';
        }

        if (verify === false) {
            return msgm;
        } else {
            return '';
        }
    }
};

export const validateSupplierCode = (supplierCode: string) => {
    const supplier_code_pattern = /^[A-Z]{3}\d{3}$/;
    if (!supplier_code_pattern.test(supplierCode)) {
        return { format: 'Ex. ABC123' };
    }
    return '';
};

export const getErrorMessage = (msgm: { [key: string]: string }) => {
    let errorMessage = '';
    for (const key in msgm) {
        errorMessage += `${msgm[key]} `;
    }
    return errorMessage.trim();
};
