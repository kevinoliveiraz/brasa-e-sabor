const cabecalho = document.querySelector("header"); // Seleciona o cabeçalho
const botaoMenu = document.getElementById("botao-menu"); // Seleciona o botão do menu
const menu = document.getElementById("menu-principal"); // Seleciona a navegação
const formulario = cabecalho.querySelector("form"); // Seleciona a pesquisa
const linkPedido = document.getElementById("meu-pedido"); // Seleciona o pedido
const espacoPedido = document.getElementById("pedido-menu"); // Seleciona o espaço no menu
const telaCelular = window.matchMedia("(max-width: 640px)"); // Identifica a tela pequena

function definirMenu(aberto) { // Abre ou fecha o menu
    const expandido = telaCelular.matches && aberto; // Abre somente no celular
    botaoMenu.setAttribute("aria-expanded", String(expandido)); // Informa o estado do menu
    botaoMenu.setAttribute("aria-label", expandido ? "Fechar menu" : "Abrir menu"); // Atualiza o nome do botão
    menu.hidden = telaCelular.matches && !expandido; // Mostra ou esconde os links
} // Fim do controle do menu

function ajustarTela() { // Ajusta a navegação à tela
    const devolverFoco = telaCelular.matches && menu.contains(document.activeElement); // Verifica o foco no menu
    if (telaCelular.matches) { // Organização do celular
        espacoPedido.hidden = false; // Libera o espaço do pedido
        espacoPedido.append(linkPedido); // Coloca o pedido dentro do menu
        cabecalho.append(menu); // Coloca o menu após a pesquisa
    } else { // Organização das telas grandes
        cabecalho.insertBefore(menu, formulario); // Coloca o menu antes da pesquisa
        cabecalho.append(linkPedido); // Devolve o pedido ao cabeçalho
        espacoPedido.hidden = true; // Esconde o espaço vazio
    } // Fim da organização
    botaoMenu.hidden = !telaCelular.matches; // Mostra o botão somente no celular
    definirMenu(false); // Começa com o menu fechado
    if (devolverFoco) { // Foco em um item que foi escondido
        botaoMenu.focus({ preventScroll: true }); // Devolve o foco ao botão
    } // Fim do ajuste do foco
} // Fim do ajuste da tela

botaoMenu.addEventListener("click", () => { // Toque no botão do menu
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true"; // Consulta o estado atual
    definirMenu(!aberto); // Alterna entre aberto e fechado
}); // Fim do toque no botão

menu.addEventListener("click", (evento) => { // Clique dentro do menu
    if (telaCelular.matches && evento.target.closest("a")) { // Escolha de um link no celular
        definirMenu(false); // Fecha o menu após a escolha
        botaoMenu.focus({ preventScroll: true }); // Mantém o foco no botão
    } // Fim da escolha de um link
}); // Fim do clique no menu

document.addEventListener("keydown", (evento) => { // Uso do teclado
    if (evento.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") { // Tecla Esc com o menu aberto
        evento.preventDefault(); // Evita apagar a pesquisa
        definirMenu(false); // Fecha o menu
        botaoMenu.focus({ preventScroll: true }); // Devolve o foco ao botão
    } // Fim da tecla Esc
}); // Fim do teclado

document.addEventListener("click", (evento) => { // Clique na página
    if (telaCelular.matches && !cabecalho.contains(evento.target)) { // Clique fora do cabeçalho
        definirMenu(false); // Fecha o menu ao tocar fora
    } // Fim do clique externo
}); // Fim do clique na página

cabecalho.classList.add("menu-pronto"); // Ativa o botão do menu
telaCelular.addEventListener("change", ajustarTela); // Acompanha as mudanças de largura
ajustarTela(); // Organiza o cabeçalho ao carregar
