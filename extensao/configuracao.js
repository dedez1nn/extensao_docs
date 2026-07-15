const CONFIG_PADRAO = {
  ativo: true,
  cpf: true,
  rg: true,
  cnpj: true,
  ie: true,
  ufIE: 'sp',
  popupTema: true,
  popupCpf: true,
  popupRg: true,
  popupCnpj: true,
  popupIe: true,
};

function carregarConfiguracao(callback) {
  chrome.storage.sync.get(CONFIG_PADRAO, callback);
}

function salvarConfiguracao(parcial) {
  chrome.storage.sync.set(parcial);
}
