(function () {
  const REGEX_CPF = /\bcpf\b/i;
  const REGEX_RG = /\brg\b|registro\s*geral|identidade/i;

  function textoAssociado(input) {
    const partes = [];

    if (input.id) {
      const label = document.querySelector(`label[for="${CSS.escape(input.id)}"]`);
      if (label) partes.push(label.textContent);
    }

    const labelEnvolvente = input.closest('label');
    if (labelEnvolvente) partes.push(labelEnvolvente.textContent);

    if (input.getAttribute('aria-label')) partes.push(input.getAttribute('aria-label'));
    if (input.placeholder) partes.push(input.placeholder);
    if (input.name) partes.push(input.name);
    if (input.id) partes.push(input.id);

    return partes.join(' ');
  }

  function tipoCampo(input) {
    const texto = textoAssociado(input);
    if (REGEX_CPF.test(texto)) return 'cpf';
    if (REGEX_RG.test(texto)) return 'rg';
    return null;
  }

  const TIPOS_ACEITOS = new Set(['text', 'tel', 'search', '']);

  let sugestaoEl = null;

  function removerSugestao() {
    if (sugestaoEl) {
      sugestaoEl.remove();
      sugestaoEl = null;
    }
  }

  function preencher(input, tipo) {
    const valor = tipo === 'cpf' ? gerarCPF() : gerarRG();
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, valor);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function mostrarSugestao(input, tipo) {
    removerSugestao();

    const rect = input.getBoundingClientRect();
    sugestaoEl = document.createElement('div');
    sugestaoEl.textContent = tipo === 'cpf' ? '🔑 Preencher CPF gerado' : '🔑 Preencher RG gerado';

    Object.assign(sugestaoEl.style, {
      position: 'fixed',
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      zIndex: 2147483647,
      background: '#1a1a1a',
      color: '#ffffff',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '13px',
      fontFamily: 'sans-serif',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
    });

    sugestaoEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      preencher(input, tipo);
      removerSugestao();
    });

    document.body.appendChild(sugestaoEl);
  }

  document.addEventListener('focusin', (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (!TIPOS_ACEITOS.has(input.type)) return;

    const tipo = tipoCampo(input);
    if (tipo) {
      mostrarSugestao(input, tipo);
    } else {
      removerSugestao();
    }
  });

  document.addEventListener('focusout', () => {
    setTimeout(removerSugestao, 150);
  });

  window.addEventListener('scroll', removerSugestao, true);
  window.addEventListener('resize', removerSugestao);
})();
