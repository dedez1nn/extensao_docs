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

async function copiar(texto) {
  await navigator.clipboard.writeText(texto);
}

document.getElementById('btn-cpf').addEventListener('click', () => {
  document.getElementById('cpf').value = gerarCPF();
});

document.getElementById('btn-rg').addEventListener('click', () => {
  document.getElementById('rg').value = gerarRG();
});

document.getElementById('copiar-cpf').addEventListener('click', () => {
  copiar(document.getElementById('cpf').value);
});

document.getElementById('copiar-rg').addEventListener('click', () => {
  copiar(document.getElementById('rg').value);
});

const TEMAS = ['auto', 'light', 'dark'];
const ROTULOS = { auto: 'Automático', light: 'Claro', dark: 'Escuro' };
const btnTema = document.getElementById('btn-tema');

function aplicarTema(tema) {
  if (tema === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', tema);
  }
  btnTema.textContent = `Tema: ${ROTULOS[tema]}`;
}

const temaSalvo = localStorage.getItem('tema') || 'auto';
aplicarTema(temaSalvo);

btnTema.addEventListener('click', () => {
  const atual = localStorage.getItem('tema') || 'auto';
  const proximo = TEMAS[(TEMAS.indexOf(atual) + 1) % TEMAS.length];
  localStorage.setItem('tema', proximo);
  aplicarTema(proximo);
});
