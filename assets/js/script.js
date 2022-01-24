$(document).ready(function () {
  $('#resultado').hide();
  $('form').submit(function (event) {
    event.preventDefault();
    let valueInput = $('#inputHero').val();
    let error = `Debe ingresar solo numeros y dentro el rango`;

    // VALIDACION INPUT BUSCAR
    if (
      isNaN(valueInput) ||
      valueInput === '' ||
      1 > valueInput ||
      valueInput > 732
    ) {
      $('#mensaje-error').text(error);
    } else {
      $('#mensaje-error').text('');
      // VALIDACION INPUT ---FIN

      $.ajax({
        type: 'GET',
        url: `https://superheroapi.com/api.php/2957908681175150/${valueInput}`,
        data: 'data',
        dataType: 'json',
        success: function (datos) {
          let nombre = datos.name;
          let conex = datos.connections['group-affiliation'];
          let publicado = datos.biography.publisher;
          let ocupacion = datos.work.occupation;
          let primerApar = datos.biography['first-appearance'];
          let altura = datos.appearance.height;
          let peso = datos.appearance.weight;
          let alianza = datos.biography.aliases;
          let imagen = datos.image.url;
          let intelligence = parseInt(datos.powerstats.intelligence);
          let strength = parseInt(datos.powerstats.strength);
          let speed = parseInt(datos.powerstats.speed);
          let durability = parseInt(datos.powerstats.durability);
          let power = parseInt(datos.powerstats.power);
          let combat = parseInt(datos.powerstats.combat);

          $('#resultado').show();
          $('#cardImagen').attr('src', imagen);
          $('#card-nombre').text(nombre);
          $('#card-conexiones').text(conex);
          $('#card-publicado').text(publicado);
          $('#card-ocupacion').text(ocupacion);
          $('#card-aparicion').text(primerApar);
          $('#card-altura').text(altura);
          $('#card-peso').text(peso);
          $('#card-alianza').text(alianza);

          var chart = new CanvasJS.Chart('chartContainer', {
            theme: 'light2',
            animationEnabled: true,
            title: {
              text: `Estadisticas de Poder para ${nombre} `,
            },
            data: [
              {
                type: 'pie',
                startAngle: 25,
                toolTipContent: '<b>{label}</b>: {y}%',
                showInLegend: 'true',
                legendText: '{label}',
                indexLabelFontSize: 16,
                indexLabel: '{label} - {y}%',
                dataPoints: [
                  { y: intelligence, label: 'intelligence' },
                  { y: strength, label: 'strength' },
                  { y: speed, label: 'speed' },
                  { y: durability, label: 'durability' },
                  { y: power, label: 'power' },
                  { y: combat, label: 'combat' },
                ],
              },
            ],
          });
          chart.render();

          // ------- fin pie ----
        },
      });
    }
    scrollTo;
  });
});
