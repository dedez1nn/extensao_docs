const selectUF = document.getElementById('ufIE');
for (const { uf, nome } of ESTADOS) {
  const opcao = document.createElement('option');
  opcao.value = uf;
  opcao.textContent = `${nome} (${uf.toUpperCase()})`;
  selectUF.appendChild(opcao);
}

const CAMPOS = ['ativo', 'cpf', 'rg', 'cnpj', 'ie'];
const SUBCAMPOS = ['cpf', 'rg', 'cnpj', 'ie'];

const CAMPOS_PERSONALIZAR = [
  { id: 'popup-tema', chave: 'popupTema' },
  { id: 'popup-cpf', chave: 'popupCpf' },
  { id: 'popup-rg', chave: 'popupRg' },
  { id: 'popup-cnpj', chave: 'popupCnpj' },
  { id: 'popup-ie', chave: 'popupIe' },
];

function atualizarHabilitados() {
  const ativo = document.getElementById('ativo').checked;
  for (const campo of SUBCAMPOS) {
    document.getElementById(campo).disabled = !ativo;
  }
  selectUF.disabled = !ativo;
}

carregarConfiguracao((config) => {
  for (const campo of CAMPOS) {
    document.getElementById(campo).checked = config[campo];
  }
  selectUF.value = config.ufIE;
  atualizarHabilitados();

  for (const { id, chave } of CAMPOS_PERSONALIZAR) {
    document.getElementById(id).checked = config[chave];
  }
});

for (const campo of CAMPOS) {
  document.getElementById(campo).addEventListener('change', (e) => {
    salvarConfiguracao({ [campo]: e.target.checked });
    if (campo === 'ativo') atualizarHabilitados();
  });
}

selectUF.addEventListener('change', (e) => {
  salvarConfiguracao({ ufIE: e.target.value });
});

for (const { id, chave } of CAMPOS_PERSONALIZAR) {
  document.getElementById(id).addEventListener('change', (e) => {
    salvarConfiguracao({ [chave]: e.target.checked });
  });
}
