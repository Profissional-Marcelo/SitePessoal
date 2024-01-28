$(document).ready(function () {
    let radios = [
        $('#radio1')[0],
        $('#radio2')[0],
        $('#radio3')[0],
        $('#radio4')[0]
    ];

    let labels = [
        $('#label1'),
        $('#label2'),
        $('#label3'),
        $('#label4')
    ];

    let slides = [
        $('#um'),
        $('#dois'),
        $('#tres'),
        $('#quatro')
    ];

    let currentIndex = 0;
    let intervalId;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.css('display', index === currentIndex ? 'block' : 'none');
        });
    }

    function changeRadio(index) {
        currentIndex = index;
        radios[currentIndex].checked = true;
        updateSlides();
    }

    function changeRadioAfterInterval() {
        intervalId = setInterval(function () {
            currentIndex = (currentIndex + 1) % radios.length;
            radios[currentIndex].checked = true;
            updateSlides();
            verificaRadio(); // Chama a função para verificar os rádios
        }, 3000);
    }

    // Adiciona os eventos de mudança aos botões de rádio usando jQuery
    radios.forEach((radio, index) => {
        $(radio).on('change', function () {
            clearInterval(intervalId);
            changeRadio(index);
        });
    });

    // Inicializa os slides com base nos botões de rádio iniciais
    updateSlides();

    // Exemplo de como mudar o rádio marcado em intervalos regulares (3 segundos no exemplo)
    changeRadioAfterInterval();

    // Função verifica radio
    function verificaRadio() {
        labels.forEach((label, index) => {
            if (radios[index].checked) {
                label.css('background-color', '#8C52FF');
                radios.forEach((radio, i) => {
                    if (i !== index) {
                        radio.checked = false;
                    }
                });
            } else {
                label.css('background-color', 'black');
            }
        });
    }

    // Chamando a função para verificar a seleção ao clicar em um botão usando jQuery
    $(document).on("change", verificaRadio);

  // Chamando a função para verificar a seleção ao clicar em um botão
  document.addEventListener("change", verificaRadio);  





  

});


  


$('#submitButton').click(function(e){
    e.preventDefault();
    let email = $('#iemail').val();
    let comentario = $('#iccoment').val();

    
    $.ajax({
        type: 'Post',
        url: '../../App/Controller/contatoEmail.php',
        data: $('#faleComigo').serialize(),
        success: function(){
          if(email.length !== 0 && comentario.length !== 0 ){
              Swal.fire({
                  icon: 'success',
                  iconColor: '',
                  title: 'Tudo Certo!',
                  text: 'Seu e-mail foi enviado com sucesso!'
                })
          }else if (email.length == 0 || comentario.length == 0 ) {
              Swal.fire({
                  icon: 'warning',
                  iconColor: '#F40000',
                  title: 'Oops...',
                  text: 'Algum dos campos não está preenchido, Por favor preencha para proseguir!'
                })
          }
            
        },
        error: function(){
          Swal.fire({
              icon: 'error',
              iconColor: '#F40000',
              title: 'Oops...',
              text: 'Não foi possivel enviar seu e-mail, tente novamente mais tarde!'
            })
           
      }
    })
  });