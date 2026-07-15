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

function gerarCNPJ() {
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const cnpj = Array.from({ length: 8 }, digitoAleatorio).concat([0, 0, 0, 1]);

  let soma = cnpj.reduce((acc, d, i) => acc + d * pesos1[i], 0);
  let resto = soma % 11;
  cnpj.push(resto < 2 ? 0 : 11 - resto);

  soma = cnpj.reduce((acc, d, i) => acc + d * pesos2[i], 0);
  resto = soma % 11;
  cnpj.push(resto < 2 ? 0 : 11 - resto);

  const str = cnpj.join('');
  return `${str.slice(0, 2)}.${str.slice(2, 5)}.${str.slice(5, 8)}/${str.slice(8, 12)}-${str.slice(12)}`;
}

// Algoritmos de dígito verificador de Inscrição Estadual por UF, portados e
// validados contra a biblioteca "inscricao-estadual" (github.com/Printi/inscricao-estadual).
const GERADORES_IE = (() => {
  function digitosAleatorios(n) {
    return Array.from({ length: n }, digitoAleatorio).join('');
  }

  function digitoAleatorioDe(conjunto) {
    const idx = digitoAleatorio() % conjunto.length;
    return conjunto[idx];
  }

  function inteiroAleatorio(min, max) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return min + (buf[0] % (max - min + 1));
  }

  // Reproduz o mod() da lib original: dígito mais à direita recebe pesos[0],
  // ciclando os pesos conforme necessário.
  function pesoMod(str, pesos, divisor = 11) {
    let i = 0;
    let soma = 0;
    for (let idx = str.length - 1; idx >= 0; idx--) {
      if (i > pesos.length - 1) i = 0;
      soma += pesos[i++] * parseInt(str[idx], 10);
    }
    return soma % divisor;
  }

  function dv11(resto) {
    return resto < 2 ? 0 : 11 - resto;
  }

  const PESO_2_9 = [2, 3, 4, 5, 6, 7, 8, 9];

  function trivial(base) {
    return base + dv11(pesoMod(base, PESO_2_9));
  }

  return {
    se: () => trivial(digitosAleatorios(8)),
    pb: () => trivial(digitosAleatorios(8)),
    am: () => trivial(digitosAleatorios(8)),
    sc: () => trivial(digitosAleatorios(8)),
    pi: () => trivial(digitosAleatorios(8)),
    es: () => trivial(digitosAleatorios(8)),
    mt: () => trivial(digitosAleatorios(8)),
    to: () => trivial(digitosAleatorios(8)),
    pa: () => trivial(digitoAleatorioDe(['15', '75', '76', '77', '78', '79']) + digitosAleatorios(6)),
    ce: () => trivial('06' + digitosAleatorios(6)),
    ma: () => trivial('12' + digitosAleatorios(6)),
    ms: () => trivial('28' + digitosAleatorios(6)),

    al: () => {
      const base = '24' + digitosAleatorios(6);
      const resto = (pesoMod(base, PESO_2_9) * 10) % 11;
      const digito = resto === 10 ? 0 : resto;
      return base + digito;
    },

    rn: () => {
      const base = '20' + digitosAleatorios(6);
      const resto = (pesoMod(base, PESO_2_9) * 10) % 11;
      const digito = resto === 10 ? 0 : resto;
      return base + digito;
    },

    rr: () => {
      const base = '24' + digitosAleatorios(6);
      const digito = pesoMod(base, [8, 7, 6, 5, 4, 3, 2, 1], 9);
      return base + digito;
    },

    ap: () => {
      const p = 5;
      const d = 0;
      const num = inteiroAleatorio(3000001, 3017000);
      const base = String(num).padStart(8, '0');
      const resto = pesoMod(String(p) + base, [2, 3, 4, 5, 6, 7, 8, 9, 1]);
      let digito;
      if (resto === 1) digito = 0;
      else if (resto === 0) digito = d;
      else digito = 11 - resto;
      return base + digito;
    },

    ro: () => {
      const base = digitosAleatorios(13);
      const resultadoMod = pesoMod(base, PESO_2_9);
      const digito = resultadoMod <= 1 ? 1 : 11 - resultadoMod;
      return base + digito;
    },

    rj: () => {
      const base = digitosAleatorios(7);
      const digito = dv11(pesoMod(base, [2, 3, 4, 5, 6, 7]));
      return base + digito;
    },

    pr: () => {
      const base = digitosAleatorios(8);
      const restoPrimeiro = pesoMod(base, [2, 3, 4, 5, 6, 7]);
      const primeiro = 11 - restoPrimeiro >= 10 ? 0 : 11 - restoPrimeiro;
      const restoSegundo = pesoMod(base + primeiro, [2, 3, 4, 5, 6, 7]);
      const segundo = 11 - restoSegundo >= 10 ? 0 : 11 - restoSegundo;
      return base + primeiro + segundo;
    },

    pe: () => {
      const base = digitosAleatorios(7);
      const restoPrimeiro = pesoMod(base, PESO_2_9);
      const primeiro = 11 - restoPrimeiro >= 10 ? 0 : 11 - restoPrimeiro;
      const restoSegundo = pesoMod(base + primeiro, PESO_2_9);
      const segundo = 11 - restoSegundo >= 10 ? 0 : 11 - restoSegundo;
      return base + primeiro + segundo;
    },

    ac: () => {
      const base = '01' + digitosAleatorios(9);
      const primeiroDigito = dv11(pesoMod(base, PESO_2_9));
      const segundoDigito = dv11(pesoMod(base + primeiroDigito, PESO_2_9));
      return base + primeiroDigito + segundoDigito;
    },

    rs: () => {
      const base = digitosAleatorios(9);
      const digito = dv11(pesoMod(base, PESO_2_9));
      return base + digito;
    },

    ba: () => {
      let base = digitosAleatorios(7);
      base = base[0] + digitoAleatorioDe('0123458'.split('')) + base.slice(2);
      const segundoMultiplicador = [2, 3, 4, 5, 6, 7, 8];
      const primeiroMultiplicador = [2, 3, 4, 5, 6, 7, 8, 9];

      const segundoResto = pesoMod(base, segundoMultiplicador, 10);
      const segundoDigito = segundoResto === 0 ? 0 : 10 - segundoResto;

      const primeiroResto = pesoMod(base + segundoDigito, primeiroMultiplicador, 10);
      const primeiroDigito = primeiroResto === 0 ? 0 : 10 - primeiroResto;

      return base + primeiroDigito + segundoDigito;
    },

    sp: () => {
      const primeiraBase = digitosAleatorios(8);
      const primeiroResto = pesoMod(primeiraBase, [10, 8, 7, 6, 5, 4, 3, 1]).toString();
      const primeiro = primeiroResto.length > 1 ? primeiroResto[1] : primeiroResto[0];

      const segundaBase = digitosAleatorios(2);

      const segundoResto = pesoMod(primeiraBase + primeiro + segundaBase, [2, 3, 4, 5, 6, 7, 8, 9, 10]).toString();
      const segundo = segundoResto.length > 1 ? segundoResto[1] : segundoResto[0];

      return primeiraBase + primeiro + segundaBase + segundo;
    },

    mg: () => {
      const base = digitosAleatorios(11);
      const baseComZero = base.substring(0, 3) + '0' + base.substring(3, 11);

      let i = 0;
      const pesos = [2, 1];
      let produtorioLiteral = '';
      for (let idx = baseComZero.length - 1; idx >= 0; idx--) {
        if (i > pesos.length - 1) i = 0;
        const produto = (pesos[i++] * parseInt(baseComZero[idx], 10)).toString();
        produtorioLiteral = produto + produtorioLiteral;
      }
      const somaDigitos = produtorioLiteral.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);

      let primeiro = ((Math.floor(somaDigitos / 10) + 1) * 10) - somaDigitos;
      if (primeiro === 10) primeiro = 0;

      const segundo = dv11(pesoMod(base + primeiro, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));

      return base + primeiro + segundo;
    },

    go: () => {
      let base;
      do {
        base = digitoAleatorioDe(['10', '11', '15', '20']) + digitosAleatorios(6);
      } while (base === '11094402');

      const resto = pesoMod(base, PESO_2_9);
      const numBase = Number(base);
      let digito;
      if (resto === 0) digito = 0;
      else if (resto === 1) digito = numBase >= 10103105 && numBase <= 10119997 ? 1 : 0;
      else digito = 11 - resto;

      return base + digito;
    },

    df: () => {
      const base = digitosAleatorios(11);
      const primeiro = dv11(pesoMod(base, PESO_2_9));
      const segundo = dv11(pesoMod(base + primeiro, PESO_2_9));
      return base + primeiro + segundo;
    },
  };
})();

function gerarIE(uf) {
  const gerador = GERADORES_IE[uf];
  if (!gerador) throw new Error(`UF inválida: ${uf}`);
  return gerador();
}
