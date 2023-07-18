export const validateCpfChecksum = (cpf) => {
    let sum = 0;
    let remainder;
    cpf.split('').forEach((digit, index) => {
      if (index < 9) {
        sum += parseInt(digit, 10) * (10 - index);
      }
    });

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === parseInt(cpf[9], 10)) {
      sum = 0;
      cpf.split('').forEach((digit, index) => {
        if (index < 10) {
          sum += parseInt(digit, 10) * (11 - index);
        }
      });

      remainder = (sum * 10) % 11;

      return remainder === 10 || remainder === parseInt(cpf[10], 10);
    }
    return false;
  };

  export const validateBrazilianPhoneNumber = (phoneNumber) => {
    const brazilianPhoneNumberPattern = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    return brazilianPhoneNumberPattern.test(phoneNumber);
  };

  export const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return '';
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  };

  export const validatePassword = (password) => {
    // Pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordPattern.test(password);
  }

  export const formatCep = (inputText) => {
    const cleaned = inputText.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);
    if (!match) return '';
    return `${match[1]}-${match[2]}`;
  };

  export const validateCep = (inputCep) => {
    const cepPattern = /^\d{5}-\d{3}$/;
    return cepPattern.test(inputCep);
  };

  
