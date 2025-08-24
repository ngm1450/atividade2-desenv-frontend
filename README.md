# E-Commerce - Login, Cadastro, Produtos & Pagamento (HTML • CSS • JS)

Mini-sistema front-end que simula o fluxo básico de login,
cadastro de usuário, lista de produtos e pagamento de um
e-commerce.

Disciplina: Desenvolvedor Front-End (PRTI)\
Aluno: Nícolas Georgeos Mantzos\
Matrícula: 2025200254

------------------------------------------------------------------------

## Estrutura do projeto

    ecommerce/
    ├── index.html     # Página única com todas as views (Login, Cadastro, Produtos, Pagamento, Confirmação)
    ├── styles.css     # Estilos customizados + tema responsivo
    └── script.js      # Lógica de navegação, validações, máscaras, catálogo e carrinho

------------------------------------------------------------------------

## Como executar

1.  Faça o download dos arquivos ou do ZIP.
2.  Abra o `index.html` diretamente no navegador.\
    Não é necessário servidor --- é um projeto estático.
3.  (Opcional) Use uma extensão como Live Server (VS Code) para
    auto-recarregar.

> Requisito de internet: o projeto usa CDNs do Bootstrap e
> Bootstrap Icons.\
> Para rodar offline, substitua os links por arquivos locais.

------------------------------------------------------------------------

## Funcionalidades

### 1) Tela de Login

-   Campos: Usuário e Senha.
-   Botões:
    -   Confirmar: redireciona para a página de Produtos (mostra
        "Seja Bem Vindo!").
    -   Cadastrar Novo Usuário: abre o formulário de cadastro.

### 2) Tela de Cadastro de Novo Usuário

-   Campos:
    -   Dados pessoais: Nome, CPF, E-mail, Profissão, Data de
        Nascimento.
    -   Endereço: Logradouro, Número, Quadra, Lote, Bairro, CEP,
        Cidade (select), Estado (select).
-   Botão Salvar:
    -   Volta ao login.
    -   Mostra aviso de sucesso (*sem persistência de dados*).
-   Máscaras simples para CPF e CEP no front-end.
-   Validação visual dos campos obrigatórios.

### 3) Tela de Produtos

-   Lista com 12 produtos (mínimo exigido: 10).
-   Cada card exibe:
    -   Foto do produto.
    -   Nome.
    -   Valor (preço unitário).
    -   Detalhes: modelo, marca e cor.
    -   Campo de quantidade.
    -   Avaliação (estrelas).
-   Botão Adicionar atualiza o carrinho.
-   Contador de itens no carrinho.
-   Botão Finalizar a compra direciona à tela de Pagamento
    (habilitado apenas se houver itens).

### 4) Tela de Pagamento

-   Campos:
    -   Bandeira do Cartão (Visa, Mastercard, American Express).
    -   Número do Cartão (com máscara).
    -   Data de Expiração (MM/AA).
    -   Código de Segurança (CVV).
    -   Nome impresso no cartão.
-   Resumo do carrinho ao lado, com valores e total.
-   Botão Finalizar:
    -   Mostra a tela de Confirmação.
    -   Exibe os dados da compra e forma de pagamento.

### 5) Tela de Confirmação

-   Mensagem de sucesso: *"Compra realizada com sucesso!"*
-   Tabela com:
    -   Produtos adquiridos.
    -   Quantidades.
    -   Valores unitários e subtotal.
    -   Bandeira do cartão.
    -   Total final.
-   Botões:
    -   Continuar comprando: volta à tela de Produtos.
    -   Sair: retorna à tela de Login.

------------------------------------------------------------------------

## Layout e UI/UX

-   Bootstrap 5 para grid, responsividade e componentes.
-   Bootstrap Icons para ícones.
-   Design unificado: gradiente de fundo, cartões arredondados,
    sombras e animações.
-   Feedback acessível: validações visuais e mensagens via `flash`.

------------------------------------------------------------------------

## Tecnologias e bibliotecas

-   HTML5, CSS3, JavaScript (Vanilla).
-   [Bootstrap 5](https://getbootstrap.com/) e [Bootstrap
    Icons](https://icons.getbootstrap.com/) via CDN.
-   Sem dependências adicionais ou build.

------------------------------------------------------------------------

## Customizações rápidas

-   Cores/Tema: edite variáveis em `styles.css` (`--brand`,
    `--brand-2`, etc.).
-   Catálogo de produtos: definido em `script.js` (`CATALOGO`).
-   Lista de cidades/estados: `<option>` dentro do `index.html`.
-   Ícone/branding: troque o `<i class="bi ...">` da *brand-circle*
    em `index.html`.
-   Mensagens: busque por `flash("success", "...")` em `script.js`.

------------------------------------------------------------------------
