$(function(){  
    $('button').bind('click', function(){
        var cidade = $('#cidade').val();
        // var now = new Date();
        var tempURL = 'https://api.hgbrasil.com/weather?format=json-cors&key=846261a6&city_name='+cidade

        $.ajax({
            url: encodeURI(tempURL),
            dataType:'json',
            type:'GET',
            beforeSend:function(){
                $('#load').html("<img style='width: 20px' src='loading2.gif'>")
            },
            success:function(res){
                var localidade = res.results.city
                var temperatura = res.results.temp                
                var clima = res.results.description
                var condicao = res.results.condition_code
                var condicao_resumo = res.results.condition_slug
                var data = res.results.date
                var umidade = res.results.humidity

                var forec = res.results['forecast']

                var dayZero = forec[0]
                var dayOne = forec[1]
                var dayTwo = forec[2]
                var dayTree = forec[3]
                var dayFor = forec[4]
                var dayFive = forec[5]
                var daySix = forec[6]
                var daySeven = forec[7]

                console.log(dayOne.description)

                if (condicao_resumo === 'storm'){
                    var icon = '<img id="icon_weather" src="icons/storm.png" alt="">'
                }else if(condicao_resumo === 'snow'){
                    var icon = '<img id="icon_weather" src="icons/snow.png" alt="">'
                }else if(condicao_resumo === 'hail'){
                    var icon = '<img id="icon_weather" src="icons/hail.png" alt="">'
                }else if(condicao_resumo === 'rain'){
                    var icon = '<img id="icon_weather" src="icons/rain.png" alt="">'
                }else if(condicao_resumo === 'fog'){
                    var icon = '<img id="icon_weather" src="icons/fog.png" alt="">'
                }else if(condicao_resumo === 'clear_day'){
                    var icon = '<img id="icon_weather" src="icons/clear_day.png" alt="">'
                }else if(condicao_resumo === 'clear_night'){
                    var icon = '<img id="icon_weather" src="icons/clear_night.png" alt="">'
                }else if(condicao_resumo === 'cloud'){
                    var icon = '<img id="icon_weather" src="icons/cloud.png" alt="">'
                }else if(condicao_resumo === 'cloudly_day'){
                    var icon = '<img id="icon_weather" src="icons/cloudly_day.png" alt="">'
                }else if(condicao_resumo === 'cloudly_night'){
                    var icon = '<img id="icon_weather" src="icons/cloudly_night.png" alt="">'
                }else if(condicao_resumo === 'none_day'){
                    var icon = '<img id="icon_weather" src="icons/cloudly_day.png" alt="">'
                }else if(condicao_resumo === 'none_night'){
                    var icon = '<img id="icon_weather" src="icons/cloudly_night.png" alt="">'
                }


                $('#city').html(`<i class="fas fa-city"></i> ${localidade}`)
                $('#temp').html(`${temperatura}°C`)
                $('#temp-min-max').html(`Mín: <i style="color: blue" class="fas fa-arrow-down"></i> ${dayZero.min} °C | Máx: <i style="color: red" class="fas fa-arrow-up"></i> ${dayZero.max} °C`)
                $('#clim').html(`<i class="fas fa-info-circle"></i> ${clima}`)
                $('#cond').html(condicao)
                $('#icon_tempo').html(icon)
                $('#hoje').html(data)
                $('#umid').html(`<i class="fas fa-tint"></i> ${umidade} %`)

                var options = {
                    series: [
                    {
                      name: "Máxima",
                      data: [`${forec[1].max}`, `${forec[2].max}`, `${forec[3].max}`, `${forec[4].max}`, `${forec[5].max}`, `${forec[6].max}`, `${forec[7].max}`]
                    },
                    {
                      name: "Mínima",
                      data: [`${forec[1].min}`, `${forec[2].min}`, `${forec[3].min}`, `${forec[4].min}`, `${forec[5].min}`, `${forec[6].min}`, `${forec[7].min}`]
                    }
                  ],
                    chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                      enabled: true,
                      color: '#000',
                      top: 18,
                      left: 7,
                      blur: 10,
                      opacity: 0.2
                    },
                    toolbar: {
                      show: false
                    }
                  },
                  colors: ['#F06730', '#77B6EA'],
                  dataLabels: {
                    enabled: true,
                  },
                  stroke: {
                    curve: 'smooth'
                  },
                  title: {
                    text: 'Temperaturas Mínimas e Máximas',
                    align: 'left',
                    margin: 30
                  },
                  grid: {
                    borderColor: '#e7e7e7',
                    row: {
                      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                      opacity: 0.5
                    },
                  },
                  markers: {
                    size: 1
                  },
                  xaxis: {
                    categories: [`${forec[1].weekday}`, `${forec[2].weekday}`, `${forec[3].weekday}`, `${forec[4].weekday}`, `${forec[5].weekday}`, `${forec[6].weekday}`, `${forec[7].weekday}`],
                    title: {
                      text: 'Dia da Semana'
                    }
                  },
                  yaxis: {
                    title: {
                      text: 'Temperatura °C'
                    },
                    min: 0,
                    max: 45
                  },
                  legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                  }
                  };
          
                  var chart = new ApexCharts(document.querySelector("#chart"), options);
                  chart.render();
                  $('#tab').html(`<table class="table table-sm">
                                        <thead class="thead-dark">
                                          <tr>                                            
                                            <th class="text-center" scope="col">${dayOne.date}</th>
                                            <th class="text-center" scope="col">${dayTwo.date}</th>
                                            <th class="text-center" scope="col">${dayTree.date}</th>
                                            <th class="text-center" scope="col">${dayFor.date}</th>
                                            <th class="text-center" scope="col">${dayFive.date}</th>
                                            <th class="text-center" scope="col">${daySix.date}</th>
                                            <th class="text-center" scope="col">${daySeven.date}</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>                                            
                                            <td class="text-center">${dayOne.description}</td>
                                            <td class="text-center">${dayTwo.description}</td>
                                            <td class="text-center">${dayTree.description}</td>
                                            <td class="text-center">${dayFor.description}</td>
                                            <td class="text-center">${dayFive.description}</td>
                                            <td class="text-center">${daySix.description}</td>
                                            <td class="text-center">${daySeven.description}</td>
                                          </tr>
                                          <tr>                                            
                                            <th class=" table-info text-center" scope="col">${dayOne.weekday}</th>
                                            <th class=" table-info text-center" scope="col">${dayTwo.weekday}</th>
                                            <th class=" table-info text-center" scope="col">${dayTree.weekday}</th>
                                            <th class=" table-info text-center" scope="col">${dayFor.weekday}</th>
                                            <th class=" table-info text-center" scope="col">${dayFive.weekday}</th>
                                            <th class=" table-info text-center" scope="col">${daySix.weekday}</th>
                                            <th class=" table-info text-center" scope="col">${daySeven.weekday}</th>
                                          </tr>
                                        </tbody>
                                      </table>`)                
                  $('#load').html("<img style='width: 60px' src=''>")

                
            }
        })
    })
})