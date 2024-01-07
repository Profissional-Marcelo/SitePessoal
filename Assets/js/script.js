document.addEventListener('DOMContentLoaded', function () {
  let radios = [
      document.getElementById('radio1'),
      document.getElementById('radio2'),
      document.getElementById('radio3'),
      document.getElementById('radio4')
  ];

  let slides = [
      document.getElementById('um'),
      document.getElementById('dois'),
      document.getElementById('tres'),
      document.getElementById('quatro')
  ];

  let currentIndex = 0;
  let intervalId;

  function updateSlides() {
      for (let i = 0; i < radios.length; i++) {
          slides[i].style.display = i === currentIndex ? 'block' : 'none';
      }
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
      }, 3000); // 3000 milliseconds (3 seconds) - você pode ajustar o tempo conforme necessário
  }

  // Adiciona os eventos de mudança aos botões de rádio
  for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', function () {
          clearInterval(intervalId); // Limpa o intervalo ao marcar manualmente um rádio
          changeRadio(i);
      });
  }

  // Inicializa os slides com base nos botões de rádio iniciais
  updateSlides();

  // Exemplo de como mudar o rádio marcado em intervalos regulares (3 segundos no exemplo)
  changeRadioAfterInterval();
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