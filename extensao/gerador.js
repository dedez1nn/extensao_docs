function digitoAleatorio() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % 10;
}

function gerarCPF() {
  const cpf = Array.from({ length: 9 }, digitoAleatorio);

  let soma = cpf.reduce((acc, d, i) => acc + d * (10 - i), 0);
  let resto = (soma * 10) % 11;
  cpf.push(resto === 10 ? 0 : resto);

  soma = cpf.reduce((acc, d, i) => acc + d * (11 - i), 0);
  resto = (soma * 10) % 11;
  cpf.push(resto === 10 ? 0 : resto);

  const cpfStr = cpf.join('');
  return `${cpfStr.slice(0, 3)}.${cpfStr.slice(3, 6)}.${cpfStr.slice(6, 9)}-${cpfStr.slice(9)}`;
}

function gerarRG() {
  return Array.from({ length: 9 }, digitoAleatorio).join('');
}
