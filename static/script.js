/* ABRE E FECHA MENU EM MODO PARA CELULAR */

const menuMobile = document.querySelector('.menu-mobile')
const body = document.querySelector('body')

menuMobile.addEventListener('click', () => {
    menuMobile.classList.contains("bi-list")
        ? menuMobile.classList.replace("bi-list", "bi-x")
        : menuMobile.classList.replace("bi-x", "bi-list")
        body.classList.toggle("menu-nav-active")
})

//ANIMAÇÕES

const item = document.querySelectorAll("[data-anime]");

const animeScroll = () => {
    const windowTop = window.pageYOffset + window.innerHeight * 0.85 ;
    item.forEach((element) => {
        if (windowTop > element.offsetTop) {
            element.classList.add("animate");
        } else {
            element.classList.remove("animate");
        }
    })
}

animeScroll()

window.addEventListener("scroll", ()=>{
    animeScroll()
});

    // Seleciona todos os links da barra lateral
    const sidebarLinks = document.querySelectorAll('#navbar a');

    // Função para adicionar 'active' no link correto
    function updateActiveLink() {
        let fromTop = window.pageYOffset + window.innerHeight * 0.5 ;

        sidebarLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute('href'));
            
            // Verifica se a seção está no viewport
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                sidebarLinks.forEach(item => item.classList.remove('active')); // Remove active de todos
                link.classList.add('active'); // Adiciona active ao link atual
            }
        });
    }

    // Atualiza a barra lateral conforme o scroll
    window.addEventListener('scroll', updateActiveLink);


const btnEnviar = document.getElementById("btn-enviar-no-loader")
const btnEnviarLoader = document.getElementById("btn-enviar-loader")

btnEnviar.addEventListener("click", () => {
    btnEnviar.classList.add("d-none")
    btnEnviarLoader.classList.remove("d-none")

    setTimeout(() => {
        btnEnviar.classList.remove("d-none"); // Mostra o botão de enviar
        btnEnviarLoader.classList.add("d-none"); // Oculta o loader
    }, 5000); // 3000 milissegundos = 3 segundos
})

setTimeout(() => {
    document.getElementById("sucesso").style.display = 'none'
}, 12000)