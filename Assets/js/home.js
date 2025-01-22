$(document).ready(function () {
    let currentSlide = 1; // Índice do slide atual
    const totalSlides = $(".slides").length; // Total de slides
    let autoSlideInterval;
    let autoSlideDelay = 2000; // Tempo padrão de troca automática (2 segundos)
    let manualPauseDelay = 5000; // Atraso adicional ao trocar manualmente (5 segundos)

    // Função para exibir o slide atual
    function showSlide(index) {
        $(".slides").removeClass("slide-active").hide(); // Esconde todos os slides
        $(`.slides:nth-of-type(${index})`).addClass("slide-active").fadeIn(); // Mostra o slide atual

        // Atualiza os bullets
        $(".bullet").removeClass("bullet-active");
        $(`.bullet:nth-of-type(${index})`).addClass("bullet-active");
    }

    // Função para alternar para o próximo slide
    function nextSlide() {
        currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1; // Vai para o próximo slide ou volta ao primeiro
        showSlide(currentSlide);
    }

    // Inicia o intervalo automático de troca de slides
    function startAutoSlide(delay = autoSlideDelay) {
        stopAutoSlide(); // Garante que não haja múltiplos intervalos
        autoSlideInterval = setTimeout(function () {
            autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
        }, delay); // Adiciona o atraso personalizado antes de reiniciar
    }

    // Para o intervalo automático de troca de slides
    function stopAutoSlide() {
        clearTimeout(autoSlideInterval);
        clearInterval(autoSlideInterval);
    }

    // Evento de clique nos bullets para trocar o slide
    $(".bullet").on("click", function () {
        stopAutoSlide(); // Para o automático ao trocar manualmente
        currentSlide = $(this).index() + 1; // Define o slide selecionado
        showSlide(currentSlide);
        startAutoSlide(manualPauseDelay); // Reinicia o automático com atraso de 5 segundos
    });

    // Adiciona evento para avançar manualmente ao próximo slide
    $(".slides").on("click", function () {
        stopAutoSlide(); // Para o automático ao trocar manualmente
        nextSlide(); // Troca para o próximo slide
        startAutoSlide(manualPauseDelay); // Reinicia o automático com atraso de 5 segundos
    });

    // Mostra o primeiro slide ao carregar
    showSlide(currentSlide);

    // Inicia a troca automática de slides
    startAutoSlide();
});
