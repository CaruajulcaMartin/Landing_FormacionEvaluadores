$(document).ready(function () {

    $(document).on('submit', '#formulario1', function (event) {

                        var peso = $('#banner')[0].files[0];
                    
                        if (peso.size > 10000000) { // 2 0000 000 bytes = 2 MB = 5120 Kb
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Aviso',
                                            text: 'El archivo supera el límite de peso permitido de hasta 10 MB.',
                                            confirmButtonText: "Listo",
                                        })
                            $('#banner').val('');
                            //$('#user_form2')[0].reset();
                            return false;
                        }		
		
        event.preventDefault();

                        Swal.fire({
                        title: 'Cargando...!',
                        html: 'Espere mientras carga su perfil.',
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false
                        });		
		
        $.ajax({
            url: 'php/registro.php', // La URL del controlador
                    method: 'POST',
                    data: new FormData(this),
                    contentType: false,
                    processData: false,
			
            success: function (data) {
                const myString = data;
                const myNewString = myString.trim();
//alert(myNewString);


                if (myNewString === "existe") {
                    Swal.fire({
                        title: 'Correo duplicado',
                        text: 'Volver a cargar sus datos',
                        icon: 'warning',
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false // Esto evitará que se cierre al hacer clic fuera
                    })
                } else {//if (myNewString === "registrado") {
                    Swal.fire({
                        title: 'Registrado',
                        text: 'Gracias por postular al Programa de Formación de Evaluadores ICACIT 2024. Recibirá un correo eléctronico desde la cuenta evaluadores@icacit.org.pe con el resultado de su evaluación a partir del 02 de setiembre.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        allowOutsideClick: false // Esto evitará que se cierre al hacer clic fuera
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#formulario1').trigger('reset');
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });



});