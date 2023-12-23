w

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