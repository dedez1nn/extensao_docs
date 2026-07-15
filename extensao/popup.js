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
