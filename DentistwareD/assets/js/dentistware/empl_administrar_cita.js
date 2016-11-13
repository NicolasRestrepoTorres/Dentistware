$(function() {    
	$('.asignar-btn').click(function(e) {
		e.preventDefault();
        var cita = $(this).attr('cita');
        var odonto = $(this).attr('odonto');
    	swal({
    		title: 'Asignar',        
            text: '¿Desea agendar esta cita con ' + odonto + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, agendar',
            cancelButtonText: 'No, cancelar',
            showLoaderOnConfirm: true,
        },
        function(isConfirm) {
              if (isConfirm) {
                  $.ajax({
                	type: 'GET',
                    url: js_site_url + 'agendar_cita/' + cita,
                    success: function(msg){
                        if(msg){
                            swal({   
                                title: "Cita agendada",
                                text: "La cita con " + odonto + " ha sido agendada.",
                                type: "success",
                            }, 
                            function(){   
                                location.reload(); 
                            });
                        } else {
                            swal("Error", "La cita con " + odonto + " no puede ser agendada, vuelva a intentarlo.", "error");
                        }
                    }
                });
            }
        });               
    });
    
	$('.borrar-btn').click(function(e) {
		e.preventDefault();
        var cita = $(this).attr('data-id');
        swal({
            title: 'Borrar',
            text: '¿Desea borrar esta cita?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, Borrar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
        },
        function(isConfirm) {
            if (isConfirm) {
            	$.ajax({
                    type: 'GET',
                    url: js_site_url + 'borrar_cita/' + cita,
                    success: function(msg){
                        if(msg){                            
                            swal({   
                                title: "Cita Borrada",
                                text: "La cita ha sido borrada.",
                                type: "success",
                            }, 
                            function(){   
                                location.reload(); 
                            });
                        } else {
                            swal("Error", "La cita no ha podido ser borrada.", "error");
                        }
                    }
                });
            }
        });           
    });
    
	$.fn.datepicker.defaults.format = "yyyy/mm/dd";
  	$.fn.datepicker.dates["es"] = {
  		days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
  		daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  		today: "Hoy"
  	};
      
	$(".date-select").datepicker({
          language: "es",
          autoclose: true,
          startDate: "0d",
          daysOfWeekDisabled: [0],
          todayHighlight: true,
          daysOfWeekHighlighted: "0",
	});
      
	$(".timepicker").timepicker({
          showInputs: false,
          minuteStep: 30,
          defaultTime: false              
    });
          
    $(".tabla-citas").DataTable({
  	    "language":{
  		    "info": "Mostrando un total de _TOTAL_ registros",
  		    "infoThousands": ",",
  		},
  		"paging": false,
  		"info": true,
  		"searching": false,
          "ordering": true,
          "autoWidth": false,
    });
      
});