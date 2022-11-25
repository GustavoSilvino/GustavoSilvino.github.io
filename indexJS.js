

fetch('https://api.rawg.io/api/games?key=22cb4c5f820042ff92ab1af943f3a40a').then(res => res.json()).then(jogos => {colocaJogos(jogos)})

fetch('https://api.rawg.io/api/platforms?key=22cb4c5f820042ff92ab1af943f3a40a').then(res => res.json()).then(plataformaAPI => {colocaPlataformas(plataformaAPI)})

fetch('https://api.rawg.io/api/publishers?key=22cb4c5f820042ff92ab1af943f3a40a').then(res => res.json()).then(async publisher => {colocaPublicadoras(publisher)})


function colocaJogos(jogos) {
    let str = ''
        for (let i = 0; i < jogos.results.length; i++) {
            let jogo = jogos.results[i]
            let plataformas = '';


            for(let j = 0; j < jogo.platforms.length; j++) {
                plataformas += `${jogo.platforms[j].platform.name}, `;
            }

            str += `
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3 corpo-card">
                        <div class="card">
                        <img src="${jogo.background_image}" class="card-img-top" style="height: 150px;">
                            <div class="card-body">
                              <h5 class="card-title">${jogo.name}</h5>
                              <p class="card-text">
                                <strong>Lançamento:</strong> ${jogo.released}<br>
                                <strong>Avaliação:</strong> ${jogo.metacritic}<br>
                                <strong>Plataformas:<br></strong> ${plataformas}
                              </p>
                              <a href="detalhes.html?id=${jogo.id}" class="btn btn-primary">Visitar</a>
                            </div>
                        </div>
                        </div>`
        }
        document.getElementById('card-lancamentos').innerHTML = str
}

function colocaPlataformas(plataformaAPI) {
    let str = ''
        for (let i = 0; i < plataformaAPI.results.length; i++) {
            let plat = plataformaAPI.results[i]
            let PrinJogos = '';


            for(let j = 0; j < plat.games.length; j++) {
                PrinJogos += `${plat.games[j].name}<br>`;
            }

            str += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 corpo-card">
            <div class="card">
            <img src="${plat.image_background}" class="card-img-top" style="height: 150px;">
                <div class="card-body">
                  <h5 class="card-title">${plat.name}</h5>
                  <p class="card-text">
                    <strong>Principais Jogos:</strong><br> ${PrinJogos}<br>
                  </p>
                </div>
            </div>
            </div>`
        }
        document.getElementById('card-plataformas').innerHTML = str
}

function colocaPublicadoras(publicadora) {
    let str = ''
        for (let i = 0; i < publicadora.results.length; i++) {
            let publisher = publicadora.results[i]
            let PrinJogos = '';


            for(let j = 0; j < publisher.games.length; j++) {
                PrinJogos += `${publisher.games[j].name}<br>`;
            }

            str += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 corpo-card">
            <div class="card">
            <img src="${publisher.image_background}" class="card-img-top" style="height: 150px;">
                <div class="card-body">
                  <h5 class="card-title">${publisher.name}</h5>
                  <p class="card-text">
                    <strong>Principais Jogos:</strong><br> ${PrinJogos}<br>
                  </p>
                </div>
            </div>
            </div>`
        }
        document.getElementById('card-Publishers').innerHTML = str
}

function mudaDePagina() {
  let search = document.getElementById('inputPesquisa').value
  if(search != '' && search != ' ') {
      location.href=`pesquisa.html?search=${search}`
  }
}
