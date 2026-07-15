# Gerador de Documentos (CPF/RG/CNPJ/IE)

Ferramentas para gerar CPF, RG, CNPJ e Inscrição Estadual com formato e dígitos verificadores válidos, para uso em testes de software. Os números são aleatórios e não correspondem a pessoas ou empresas reais.

## Por que esse projeto existe

Cada vez mais sites e formulários pedem CPF, RG, CNPJ ou Inscrição Estadual só para um cadastro simples — muitas vezes sem necessidade real, e nem sempre com garantia de que esses dados serão bem guardados ou usados com a devida seriedade. Este projeto existe para cobrir esses casos: gera documentos com formato e dígito verificador válidos, mas com números aleatórios, sem vínculo com pessoas ou empresas reais, para:

- Testar formulários e sistemas sem precisar expor dados reais.
- Evitar preencher informação sensível em cadastros de origem duvidosa.
- Povoar bancos de dados de teste/homologação com dados plausíveis.

## Estrutura do projeto

- `extensao/` — extensão de navegador (Chrome, Edge, Firefox) com gerador completo e autopreenchimento.

## Extensão de navegador

Pasta: `extensao/`.

### Funcionalidades

- Gera CPF, RG, CNPJ e Inscrição Estadual — os 27 algoritmos de dígito verificador de IE (um por estado) foram validados contra a biblioteca de referência [`inscricao-estadual`](https://github.com/Printi/inscricao-estadual).
- Sugestão de autopreenchimento estilo gerenciador de senhas: ao focar um campo rotulado como CPF/RG/CNPJ/IE em qualquer site, aparece uma sugestão para preencher com um valor gerado.
- Tema claro/escuro, automático (segue o sistema) ou manual.
- Página de opções: liga/desliga a sugestão de autopreenchimento (geral e por tipo de documento), define o estado usado para gerar IE, e permite esconder itens do menu principal.

### Instalar (modo desenvolvedor)

**Chrome / Edge**
1. Acesse `chrome://extensions`.
2. Ative o "Modo do desenvolvedor".
3. Clique em "Carregar sem compactação" e selecione a pasta `extensao/`.

**Firefox**
1. Acesse `about:debugging#/runtime/this-firefox`.
2. Clique em "Carregar extensão temporária" e selecione o arquivo `extensao/manifest.json`.
3. A extensão some ao reiniciar o navegador; para instalação permanente, ela precisa ser assinada pela Mozilla.

## Configuração / variáveis de ambiente

Nenhuma necessária. Todo o código roda localmente na extensão de navegador, sem chamadas a APIs externas, credenciais ou chaves de serviço.
