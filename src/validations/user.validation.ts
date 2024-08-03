const validateCPF = (cpf: string) => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
};

const validatePhone = (phone: string) => {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};

const validateEmail = (email: string) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;
  return emailRegex.test(email);
}

export { validateCPF, validatePhone, validateEmail };