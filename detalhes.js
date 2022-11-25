async function retornaObjetoApi(pagina) { 
    const res = await fetch(`https://api.rawg.io/api/games?key=22cb4c5f820042ff92ab1af943f3a40a&page=${pagina}`)
    const jogos = await res.json()
    return (jogos.results)
    
}


async function colocaDetalhes(id){
    let id_jogo = id
    console.log('id pegado ' + id)
    let encontrouAlgo = false
    let pagina = 1
    let str = ''
    let platJogo = ''
    let lojasJogo = ''
    let generoJogo = ''
    let imagens = ''
        while (encontrouAlgo == false) {
            document.getElementById("AreaDetalhes").innerHTML = "<h3>MONTANDO...</h3>"
            let jogos = await retornaObjetoApi(pagina);
            for (let i = 0; i < jogos.length; i++) {
                console.log("procurando se id " + jogos[i].id + " é igual a " + id_jogo)
                if(id_jogo == jogos[i].id) {
                    encontrouAlgo = true
                    console.log(jogos[i])
                    for(let j = 0; j < jogos[i].platforms.length; j++) {
                        platJogo += `${jogos[i].platforms[j].platform.name}, `
                    }
                    for(let k = 0; k < jogos[i].genres.length; k++) {
                        generoJogo += `${jogos[i].genres[k].name}, `
                    }

                    for(let l = 0; l < jogos[i].stores.length; l++) {
                        lojasJogo += `${jogos[i].stores[l].store.name}, `
                    }
                    for(let imagem = 0; imagem < jogos[i].short_screenshots.length; imagem++) {
                        imagens += `<img src="${jogos[i].short_screenshots[imagem].image}" class="col-12 col-md-6 col-lg-4 screenshot"></img>`
                    }
                    str += 
                    `
                    <div class="col-12" id="jogoDetalhe">
                    <h1>${jogos[i].name}</h1>
                    <div class="col-12" id="imagem">
                        <img src="${jogos[i].background_image}" alt="imagem do jogo">
                    </div>
                    <div class="col-12 info">
                        <h3 class="col-12"><b>Avaliação: </b>${jogos[i].metacritic}</h3>
                        <h3 class="col-12"><b>Data de lançamento: </b>${jogos[i].released}</h3>
                        <h3 class="col-12"><b>Tempo de Jogo:</b> ${jogos[i].playtime} horas</h3>
                        <h3 class="col-12"><b>Plataformas:</b> ${platJogo}</h3>
                        <h3 class="col-12"><b>Genero:</b> ${generoJogo}</h3>
                        <h3 class="col-12"><b>Lojas:</b> ${lojasJogo}</h3>
                            <h3 class="col-12"><b>Screenshots:</b></h3>
                            ${imagens}
                    </div>
                    </div>
                    `
                    break
                }
            }
            pagina++
        }
    document.getElementById('AreaDetalhes').innerHTML = str
}

function mudaDePagina() {
    let search = document.getElementById('inputPesquisa').value
    if(search != '' && search != ' ') {
        location.href=`pesquisa.html?search=${search}`
    }
  }