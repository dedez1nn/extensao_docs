async function copiar(texto) {
  await navigator.clipboard.writeText(texto);
}

const selectUF = document.getElementById('uf-ie');
for (const { uf, nome } of ESTADOS) {
  const opcao = document.createElement('option');
  opcao.value = uf;
  opcao.textContent = uf.toUpperCase();
  opcao.title = nome;
  if (uf === 'sp') opcao.selected = true;
  selectUF.appendChild(opcao);
}

document.getElementById('btn-cpf').addEventListener('click', () => {
  document.getElementById('cpf').value = gerarCPF();
});

document.getElementById('btn-rg').addEventListener('click', () => {
  document.getElementById('rg').value = gerarRG();
});

document.getElementById('btn-cnpj').addEventListener('click', () => {
  document.getElementById('cnpj').value = gerarCNPJ();
});

document.getElementById('btn-ie').addEventListener('click', () => {
  document.getElementById('ie').value = gerarIE(selectUF.value);
});

document.getElementById('copiar-cpf').addEventListener('click', () => {
  copiar(document.getElementById('cpf').value);
});

document.getElementById('copiar-rg').addEventListener('click', () => {
  copiar(document.getElementById('rg').value);
});

document.getElementById('copiar-cnpj').addEventListener('click', () => {
  copiar(document.getElementById('cnpj').value);
});

document.getElementById('copiar-ie').addEventListener('click', () => {
  copiar(document.getElementById('ie').value);
});

document.getElementById('btn-opcoes').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

carregarConfiguracao((config) => {
  document.getElementById('secao-tema').style.display = config.popupTema ? '' : 'none';
  document.getElementById('secao-cpf').style.display = config.popupCpf ? '' : 'none';
  document.getElementById('secao-rg').style.display = config.popupRg ? '' : 'none';
  document.getElementById('secao-cnpj').style.display = config.popupCnpj ? '' : 'none';
  document.getElementById('secao-ie').style.display = config.popupIe ? '' : 'none';
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
