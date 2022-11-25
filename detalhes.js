async function retornaJogoDetalhado(id) { 
    const res = await fetch(`https://api.rawg.io/api/games/${id}?key=22cb4c5f820042ff92ab1af943f3a40a`)
    const jogo = await res.json()
    const res2 = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=22cb4c5f820042ff92ab1af943f3a40a`)
    const imagens = await res2.json()
    colocaDetalhes(jogo, imagens)
}


async function colocaDetalhes(jogo, imagens){
    let jogoDetalhado = jogo
    let scJogo = imagens
    console.log(jogoDetalhado)
    console.log(scJogo);
    let str = ''
    let platJogo = ''
    let lojasJogo = ''
    let generoJogo = ''
    let desenvolvedoras = ''
    let publicadoras = ''
    let imagem = ''
    document.getElementById("AreaDetalhes").innerHTML = "<h3>MONTANDO...</h3>"

    for(let j = 0; j < jogoDetalhado.platforms.length; j++) {
        platJogo += `${jogoDetalhado.platforms[j].platform.name}, `
    }
    for(let k = 0; k < jogoDetalhado.genres.length; k++) {
        generoJogo += `${jogoDetalhado.genres[k].name}, `
    }
    for(let l = 0; l < jogoDetalhado.stores.length; l++) {
        lojasJogo += `${jogoDetalhado.stores[l].store.name}, `
    }
    for(let d = 0; d < jogoDetalhado.developers.length; d++) {
        desenvolvedoras += `${jogoDetalhado.developers[d].name}, `
    }
    for(let p = 0; p < jogoDetalhado.publishers.length; p++) {
        publicadoras += `${jogoDetalhado.publishers[p].name}, `
    }
    for(let i = 0; i < scJogo.results.length; i++) {
        imagem += `<img src="${scJogo.results[i].image}" alt="imagem do jogo" class="col-12 col-lg-4">`
    }

    str += 
    `
    <div class="col-12" id="jogoDetalhe">
    <h1>${jogoDetalhado.name}</h1>
    <div class="col-12" id="imagem">
        <img src="${jogoDetalhado.background_image}" alt="imagem do jogo">
    </div>
    <div class="col-12 info">
        ${jogoDetalhado.description}
        <h3 class="col-12"><b>Genero:</b> ${generoJogo}</h3>
        <h3 class="col-12"><b>Avaliação: </b>${jogoDetalhado.metacritic}</h3>
        <h3 class="col-12"><b>Data de lançamento: </b>${jogoDetalhado.released}</h3>
        <h3 class="col-12"><b>Tempo de Jogo:</b> ${jogoDetalhado.playtime} horas</h3>
        <h3 class="col-12"><b>Plataformas:</b> ${platJogo}</h3>
        <h3 class="col-12"><b>Densenvolvido por:</b> ${desenvolvedoras}</h3>
        <h3 class="col-12"><b>Publicado por:</b> ${publicadoras}</h3>
        <h3 class="col-12"><b>Lojas:</b> ${lojasJogo}</h3>
        <h3 class="col-12"><b>Screenshots:</b></h3>
        <div class="col-12" id="screenshot">
            ${imagem}
        </div>
    </div>
    </div>
    `
    document.getElementById('AreaDetalhes').innerHTML = str
}

function mudaDePagina() {
    let search = document.getElementById('inputPesquisa').value
    if(search != '' && search != ' ') {
        location.href=`pesquisa.html?search=${search}`
    }
  }
