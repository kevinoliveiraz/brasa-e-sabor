(() => { // Controla o cardápio e o carrinho
    const produtos = [ // Produtos disponíveis
        { // Dados de um produto
            id: "hamburguer", // Código do produto
            nome: "Hambúrguer", // Nome do produto
            categoria: "hamburgueres", // Categoria do produto
            descricao: "O clássico da casa para matar a fome e aproveitar o momento.", // Descrição do produto
            preco: 2999, // Preço em centavos
            imagem: "assets/favoritos/img/hamburguer.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "pizza", // Código do produto
            nome: "Pizza", // Nome do produto
            categoria: "pizzas", // Categoria do produto
            descricao: "Uma escolha para reunir as pessoas e compartilhar o sabor.", // Descrição do produto
            preco: 4990, // Preço em centavos
            imagem: "assets/favoritos/img/pizza.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "mega-combo", // Código do produto
            nome: "Mega Combo", // Nome do produto
            categoria: "combos", // Categoria do produto
            descricao: "Hambúrguer, batata e bebida em uma combinação especial.", // Descrição do produto
            preco: 2590, // Preço em centavos
            imagem: "assets/cardapio/mega-combo.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "acai", // Código do produto
            nome: "Açaí com morangos", // Nome do produto
            categoria: "acais", // Categoria do produto
            descricao: "Açaí com morangos para deixar o seu pedido mais refrescante.", // Descrição do produto
            preco: 1800, // Preço em centavos
            imagem: "assets/favoritos/img/Açaí com morangos na mesa de madeira.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "bolo-de-chocolate", // Código do produto
            nome: "Bolo de chocolate e morango", // Nome do produto
            categoria: "sobremesas", // Categoria do produto
            descricao: "Chocolate e morango para encerrar o pedido com um doce.", // Descrição do produto
            preco: 1500, // Preço em centavos
            imagem: "assets/favoritos/img/bolo de chocolate.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "sprite", // Código do produto
            nome: "Sprite", // Nome do produto
            categoria: "bebidas", // Categoria do produto
            descricao: "Uma bebida para acompanhar seu lanche ou sua pizza.", // Descrição do produto
            preco: 600, // Preço em centavos
            imagem: "assets/favoritos/SPRITE.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "pizza-pepperoni", // Código do produto
            nome: "Pizza de pepperoni", // Nome do produto
            categoria: "pizzas", // Categoria do produto
            descricao: "Uma pizza de pepperoni para variar a escolha do seu pedido.", // Descrição do produto
            preco: 3995, // Preço em centavos
            imagem: "assets/cardapio/pizza-pepperoni.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "hamburguer-especial", // Código do produto
            nome: "Hambúrguer Especial", // Nome do produto
            categoria: "combos", // Categoria do produto
            descricao: "Uma das opções especiais que já fazem parte do nosso menu.", // Descrição do produto
            preco: 600, // Preço em centavos
            imagem: "assets/favoritos/img/hamburguer espcial.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "bateu-a-fome", // Código do produto
            nome: "Bateu a Fome", // Nome do produto
            categoria: "combos", // Categoria do produto
            descricao: "Uma opção do menu para quando a fome pede mais.", // Descrição do produto
            preco: 1800, // Preço em centavos
            imagem: "assets/favoritos/img/bateu a fome.png", // Arquivo da imagem
        }, // Fim dos dados do produto
        { // Dados de um produto
            id: "para-voce", // Código do produto
            nome: "Para Você", // Nome do produto
            categoria: "combos", // Categoria do produto
            descricao: "Escolha esse favorito e combine com os outros sabores do cardápio.", // Descrição do produto
            preco: 1500, // Preço em centavos
            imagem: "assets/favoritos/img/para voce.png", // Arquivo da imagem
        }, // Fim dos dados do produto
    ]; // Fim dos produtos
    const categorias = { // Nomes das categorias
        hamburgueres: "Hambúrgueres", // Nome exibido no filtro
        pizzas: "Pizzas", // Nome exibido no filtro
        combos: "Combos", // Nome exibido no filtro
        acais: "Açaís", // Nome exibido no filtro
        sobremesas: "Sobremesas", // Nome exibido no filtro
        bebidas: "Bebidas", // Nome exibido no filtro
    }; // Fim das categorias
    const chavePedido = "brasa-sabor-pedido-v1"; // Nome do pedido salvo
    const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }); // Formata os preços
    const grade = document.getElementById("lista-produtos"); // Lista do cardápio
    const listaPedido = document.getElementById("itens-pedido"); // Itens do carrinho
    const formularioBusca = document.querySelector("header form"); // Pesquisa do cabeçalho
    const campoBusca = formularioBusca.querySelector("input"); // Campo de pesquisa
    const filtros = document.querySelectorAll("[data-categoria]"); // Botões das categorias
    const dialogo = document.getElementById("detalhes-produto"); // Janela dos detalhes
    const parametros = new URLSearchParams(location.search); // Opções do endereço
    let categoriaAtual = parametros.get("categoria") || "todos"; // Categoria inicial
    let temporizadorAviso; // Tempo do aviso

    function encontrarProduto(id) { // Procura o produto pelo código
        return produtos.find((produto) => produto.id === id); // Retorna o produto encontrado
    } // Fim da procura

    function criarElemento(tag, classe, texto) { // Cria uma parte da interface
        const elemento = document.createElement(tag); // Cria a tag
        if (classe) elemento.className = classe; // Define a classe visual
        if (texto !== undefined) elemento.textContent = texto; // Preenche o texto com segurança
        return elemento; // Entrega o elemento criado
    } // Fim da criação

    function lerPedido() { // Lê o pedido salvo
        try { // Tenta acessar o navegador
            const salvo = JSON.parse(localStorage.getItem(chavePedido) || "[]"); // Lê os itens
            if (!Array.isArray(salvo)) return []; // Ignora um formato inválido
            const agrupados = new Map(); // Agrupa itens repetidos
            salvo.forEach((item) => { // Confere cada item
                if (!item || !encontrarProduto(item.id) || !Number.isInteger(item.quantidade) || item.quantidade < 1) return; // Ignora itens inválidos
                agrupados.set(item.id, Math.min(99, (agrupados.get(item.id) || 0) + item.quantidade)); // Limita a quantidade
            }); // Fim da conferência
            return Array.from(agrupados, ([id, quantidade]) => ({ id, quantidade })); // Retorna os itens válidos
        } catch { // Pedido ausente ou inválido
            return []; // Começa com o carrinho vazio
        } // Fim da leitura
    } // Fim do pedido salvo

    let pedido = lerPedido(); // Carrega o carrinho

    function avisar(mensagem) { // Mostra uma mensagem curta
        document.querySelectorAll("[data-status-pedido]").forEach((aviso) => { // Atualiza os avisos
            aviso.textContent = mensagem; // Exibe a mensagem
            aviso.hidden = false; // Mostra o aviso
        }); // Fim dos avisos
        clearTimeout(temporizadorAviso); // Cancela o tempo anterior
        temporizadorAviso = setTimeout(() => { // Inicia o tempo do aviso
            document.querySelectorAll(".aviso-pedido").forEach((aviso) => { aviso.hidden = true; }); // Esconde o aviso flutuante
        }, 4500); // Mantém a mensagem por alguns segundos
    } // Fim da mensagem

    function salvarPedido() { // Grava as mudanças
        try { // Tenta salvar no navegador
            localStorage.setItem(chavePedido, JSON.stringify(pedido)); // Guarda os itens e quantidades
            return true; // Confirma que salvou
        } catch { // Armazenamento indisponível
            avisar("O navegador não permitiu salvar seu pedido. Mantenha esta página aberta."); // Informa a limitação
            return false; // Informa que não salvou
        } // Fim da gravação
    } // Fim do salvamento

    function calcularResumo() { // Calcula quantidade e total
        return pedido.reduce((resumo, item) => { // Soma cada item
            resumo.quantidade += item.quantidade; // Soma as unidades
            resumo.total += encontrarProduto(item.id).preco * item.quantidade; // Soma o valor em centavos
            return resumo; // Continua a soma
        }, { quantidade: 0, total: 0 }); // Começa com os valores zerados
    } // Fim do cálculo

    function atualizarResumo() { // Atualiza os valores da página
        const resumo = calcularResumo(); // Consulta os totais
        document.querySelectorAll("[data-total-itens]").forEach((elemento) => { elemento.textContent = resumo.quantidade; }); // Mostra a quantidade
        document.querySelectorAll("[data-total-pedido]").forEach((elemento) => { elemento.textContent = moeda.format(resumo.total / 100); }); // Mostra o total
        document.getElementById("meu-pedido").setAttribute("aria-label", "Meu pedido, " + resumo.quantidade + " itens"); // Identifica o carrinho
        const barra = document.getElementById("barra-pedido"); // Resumo fixo do celular
        if (barra) barra.hidden = resumo.quantidade === 0; // Mostra quando há itens
        document.body.classList.toggle("pedido-com-itens", resumo.quantidade > 0); // Reserva espaço para o resumo
    } // Fim dos valores

    function imagemProduto(produto, classe) { // Cria a foto do produto
        const imagem = criarElemento("img", classe); // Cria a imagem
        imagem.src = produto.imagem; // Usa o arquivo do projeto
        imagem.alt = produto.nome; // Descreve a imagem
        imagem.loading = "lazy"; // Carrega perto da área visível
        imagem.decoding = "async"; // Libera a leitura da página
        return imagem; // Retorna a foto
    } // Fim da imagem

    function renderizarProdutos() { // Mostra os produtos filtrados
        if (!grade) return; // Executa somente no cardápio
        const normalizar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); // Aceita buscas sem acento
        const busca = normalizar(campoBusca.value.trim()); // Prepara a pesquisa
        const visiveis = produtos.filter((produto) => { // Filtra os produtos
            return (categoriaAtual === "todos" || produto.categoria === categoriaAtual) && normalizar(produto.nome + " " + produto.descricao).includes(busca); // Combina categoria e pesquisa
        }); // Fim do filtro
        grade.replaceChildren(); // Limpa a lista anterior
        visiveis.forEach((produto) => { // Monta cada card
            const card = criarElemento("article", "produto-card"); // Cria o card
            const foto = imagemProduto(produto, "produto-imagem"); // Prepara a foto
            const corpo = criarElemento("div", "produto-corpo"); // Agrupa os textos
            const categoria = criarElemento("p", "produto-categoria", categorias[produto.categoria]); // Mostra a categoria
            const titulo = criarElemento("h3", "produto-nome", produto.nome); // Mostra o nome
            const descricao = criarElemento("p", "produto-descricao", produto.descricao); // Mostra a descrição
            const detalhes = criarElemento("button", "produto-detalhes", "Ver detalhes"); // Cria o acesso aos detalhes
            detalhes.type = "button"; // Evita enviar formulários
            detalhes.dataset.detalhes = produto.id; // Identifica o produto
            detalhes.setAttribute("aria-label", "Ver detalhes de " + produto.nome); // Explica o botão
            const rodape = criarElemento("div", "produto-rodape"); // Agrupa preço e ação
            const preco = criarElemento("strong", "produto-preco", moeda.format(produto.preco / 100)); // Mostra o preço
            const adicionar = criarElemento("button", "botao-loja botao-adicionar", "+ Adicionar"); // Cria o botão de adicionar
            adicionar.type = "button"; // Evita enviar formulários
            adicionar.dataset.adicionar = produto.id; // Liga ao carrinho
            adicionar.setAttribute("aria-label", "Adicionar " + produto.nome + " ao pedido"); // Identifica a ação
            rodape.append(preco, adicionar); // Coloca preço e botão na linha
            corpo.append(categoria, titulo, descricao, detalhes, rodape); // Monta os textos
            card.append(foto, corpo); // Monta o card completo
            grade.append(card); // Coloca o card no cardápio
        }); // Fim dos cards
        document.getElementById("resultado-produtos").textContent = visiveis.length + (visiveis.length === 1 ? " opção encontrada" : " opções encontradas"); // Informa o resultado
        document.getElementById("busca-vazia").hidden = visiveis.length !== 0; // Mostra a busca sem resultado
        filtros.forEach((botao) => { botao.setAttribute("aria-pressed", String(botao.dataset.categoria === categoriaAtual)); }); // Destaca a categoria escolhida
    } // Fim do cardápio

    function atualizarEndereco() { // Mantém a pesquisa no endereço
        const endereco = new URL(location.href); // Lê o endereço atual
        const busca = campoBusca.value.trim(); // Lê a pesquisa
        busca ? endereco.searchParams.set("busca", busca) : endereco.searchParams.delete("busca"); // Atualiza o termo
        categoriaAtual !== "todos" ? endereco.searchParams.set("categoria", categoriaAtual) : endereco.searchParams.delete("categoria"); // Atualiza a categoria
        history.replaceState(null, "", endereco); // Atualiza sem recarregar
    } // Fim do endereço

    function renderizarPedido() { // Monta o carrinho
        if (!listaPedido) return; // Executa somente na página do pedido
        listaPedido.replaceChildren(); // Limpa a lista anterior
        document.getElementById("pedido-vazio").hidden = pedido.length !== 0; // Controla o estado vazio
        document.getElementById("area-pedido").hidden = pedido.length === 0; // Controla a lista e o resumo
        pedido.forEach((item) => { // Monta cada item
            const produto = encontrarProduto(item.id); // Consulta os dados do produto
            const linha = criarElemento("article", "item-pedido"); // Cria a linha do carrinho
            const foto = imagemProduto(produto, "item-pedido-imagem"); // Cria a foto pequena
            const informacoes = criarElemento("div", "item-pedido-informacoes"); // Agrupa os dados
            const nome = criarElemento("h2", "item-pedido-nome", produto.nome); // Mostra o nome
            const unitario = criarElemento("p", "item-pedido-unitario", moeda.format(produto.preco / 100) + " por unidade"); // Mostra o valor unitário
            const subtotal = criarElemento("strong", "item-pedido-subtotal", moeda.format(produto.preco * item.quantidade / 100)); // Mostra o subtotal
            const remover = criarElemento("button", "remover-item", "Remover"); // Cria a remoção
            remover.type = "button"; // Evita enviar formulários
            remover.dataset.remover = produto.id; // Identifica o item
            remover.setAttribute("aria-label", "Remover " + produto.nome); // Explica a remoção
            informacoes.append(nome, unitario, subtotal, remover); // Monta os dados do item
            const quantidade = criarElemento("div", "controle-quantidade"); // Agrupa os controles
            quantidade.setAttribute("role", "group"); // Agrupa para leitores de tela
            quantidade.setAttribute("aria-label", "Quantidade de " + produto.nome); // Identifica o controle
            const menos = criarElemento("button", "", "−"); // Cria o botão de diminuir
            const mais = criarElemento("button", "", "+"); // Cria o botão de aumentar
            [menos, mais].forEach((botao, indice) => { // Prepara os dois botões
                botao.type = "button"; // Evita enviar formulários
                botao.dataset.ajustar = produto.id; // Liga ao item
                botao.dataset.passo = indice === 0 ? "-1" : "1"; // Define a mudança
                botao.setAttribute("aria-label", (indice === 0 ? "Diminuir" : "Aumentar") + " quantidade de " + produto.nome); // Explica a ação
            }); // Fim dos controles
            mais.disabled = item.quantidade === 99; // Respeita o limite por item
            quantidade.append(menos, criarElemento("span", "quantidade-atual", item.quantidade), mais); // Mostra a quantidade atual
            linha.append(foto, informacoes, quantidade); // Monta a linha completa
            listaPedido.append(linha); // Coloca o item no carrinho
        }); // Fim dos itens
    } // Fim do carrinho

    function guardarMudancas() { // Atualiza o pedido inteiro
        const salvo = salvarPedido(); // Persiste os dados
        atualizarResumo(); // Atualiza os totais
        renderizarPedido(); // Atualiza o carrinho
        return salvo; // Informa o resultado da gravação
    } // Fim das mudanças

    function adicionarProduto(id) { // Inclui um produto
        const produto = encontrarProduto(id); // Procura o produto
        if (!produto) return; // Ignora um código desconhecido
        const item = pedido.find((item) => item.id === id); // Procura no pedido
        if (item && item.quantidade === 99) { avisar("O limite é de 99 unidades por item."); return; } // Respeita o limite
        item ? item.quantidade++ : pedido.push({ id, quantidade: 1 }); // Aumenta ou inclui
        if (guardarMudancas()) avisar(produto.nome + " adicionado ao pedido."); // Confirma a inclusão
    } // Fim da inclusão

    function devolverFoco(id, passo) { // Mantém o teclado no carrinho
        const proximo = document.querySelector('[data-ajustar="' + id + '"][data-passo="' + passo + '"]:not(:disabled)') || document.querySelector(".item-pedido button") || document.querySelector("#pedido-vazio a"); // Procura um controle visível
        if (proximo) proximo.focus({ preventScroll: true }); // Devolve o foco
    } // Fim do foco

    document.addEventListener("click", (evento) => { // Ações dos produtos e do pedido
        const adicionar = evento.target.closest("[data-adicionar]"); // Procura uma inclusão
        const remover = evento.target.closest("[data-remover]"); // Procura uma remoção
        const ajustar = evento.target.closest("[data-ajustar]"); // Procura a mudança de quantidade
        const detalhes = evento.target.closest("[data-detalhes]"); // Procura os detalhes
        if (adicionar) adicionarProduto(adicionar.dataset.adicionar); // Adiciona o produto escolhido
        if (remover) { // Remoção de um item
            pedido = pedido.filter((item) => item.id !== remover.dataset.remover); // Retira o item
            guardarMudancas(); // Atualiza os valores
            devolverFoco(remover.dataset.remover, 1); // Mantém o acesso pelo teclado
        } // Fim da remoção
        if (ajustar) { // Mudança de quantidade
            const item = pedido.find((item) => item.id === ajustar.dataset.ajustar); // Consulta o item
            if (item) item.quantidade = Math.max(0, Math.min(99, item.quantidade + Number(ajustar.dataset.passo))); // Ajusta a quantidade
            pedido = pedido.filter((item) => item.quantidade > 0); // Remove os itens zerados
            guardarMudancas(); // Atualiza o pedido
            devolverFoco(ajustar.dataset.ajustar, ajustar.dataset.passo); // Mantém o foco no controle
        } // Fim da quantidade
        if (detalhes && dialogo) { // Abertura dos detalhes
            const produto = encontrarProduto(detalhes.dataset.detalhes); // Consulta o produto
            document.getElementById("detalhe-imagem").src = produto.imagem; // Mostra a imagem
            document.getElementById("detalhe-imagem").alt = produto.nome; // Descreve a imagem
            document.getElementById("detalhe-nome").textContent = produto.nome; // Mostra o nome
            document.getElementById("detalhe-descricao").textContent = produto.descricao; // Mostra a descrição
            document.getElementById("detalhe-preco").textContent = moeda.format(produto.preco / 100); // Mostra o preço
            document.getElementById("detalhe-adicionar").dataset.adicionar = produto.id; // Prepara o botão de adicionar
            document.getElementById("detalhe-status").textContent = ""; // Limpa a mensagem anterior
            dialogo.showModal(); // Abre a janela
        } // Fim dos detalhes
    }); // Fim das ações

    if (grade) { // Recursos da página do cardápio
        if (!Object.hasOwn(categorias, categoriaAtual) && categoriaAtual !== "todos") categoriaAtual = "todos"; // Corrige uma categoria desconhecida
        campoBusca.value = parametros.get("busca") || ""; // Recupera o termo pesquisado
        filtros.forEach((botao) => { // Prepara as categorias
            botao.addEventListener("click", () => { // Escolha de uma categoria
                categoriaAtual = botao.dataset.categoria; // Atualiza a categoria
                renderizarProdutos(); // Atualiza os cards
                atualizarEndereco(); // Guarda o filtro no endereço
            }); // Fim da escolha
        }); // Fim das categorias
        formularioBusca.addEventListener("submit", (evento) => { evento.preventDefault(); renderizarProdutos(); atualizarEndereco(); }); // Pesquisa sem recarregar
        campoBusca.addEventListener("input", () => { renderizarProdutos(); atualizarEndereco(); }); // Pesquisa ao digitar
        document.getElementById("limpar-filtros").addEventListener("click", () => { // Limpeza dos filtros
            campoBusca.value = ""; // Apaga a pesquisa
            categoriaAtual = "todos"; // Mostra todas as categorias
            renderizarProdutos(); // Atualiza os cards
            atualizarEndereco(); // Limpa os parâmetros
            campoBusca.focus(); // Permite pesquisar novamente
        }); // Fim da limpeza
        document.getElementById("fechar-detalhes").addEventListener("click", () => dialogo.close()); // Fecha os detalhes pelo botão
        dialogo.addEventListener("click", (evento) => { if (evento.target === dialogo) dialogo.close(); }); // Fecha ao tocar fora
        renderizarProdutos(); // Exibe o cardápio inicial
    } // Fim dos recursos do cardápio

    ["fazer-pedido", "explorar-cardapio"].forEach((id) => { // Botões da página inicial
        const botao = document.getElementById(id); // Consulta o botão
        if (botao) botao.addEventListener("click", () => { location.href = "cardapio.html"; }); // Abre o cardápio
    }); // Fim dos botões iniciais

    window.addEventListener("storage", (evento) => { // Mudanças em outra aba
        if (evento.key !== chavePedido) return; // Ignora outros dados
        pedido = lerPedido(); // Recupera os itens atualizados
        atualizarResumo(); // Atualiza o contador
        renderizarPedido(); // Atualiza a lista
    }); // Fim da atualização entre abas

    window.addEventListener("pageshow", (evento) => { // Retorno pelo histórico
        if (!evento.persisted) return; // Confere a página restaurada
        pedido = lerPedido(); // Recupera o pedido mais recente
        atualizarResumo(); // Atualiza o contador e o total
        renderizarPedido(); // Atualiza os itens do carrinho
    }); // Fim do retorno pelo histórico

    atualizarResumo(); // Exibe o contador inicial
    renderizarPedido(); // Exibe os itens salvos
})(); // Fim do cardápio e do carrinho
