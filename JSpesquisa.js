async function retornaObjetoApi(pagina) { 
    const res = await fetch(`https://api.rawg.io/api/games?key=22cb4c5f820042ff92ab1af943f3a40a&page=${pagina}`)
    const jogos = await res.json()
    return (jogos.results)
    
}

onload = () => {
        const urlParams = new URLSearchParams(location.search)
        let pesquisado = urlParams.get('search')
        console.log(pesquisado)
        pesquisaJogo(pesquisado)
}

function pesquisaNovo() {
    let search = document.getElementById('inputPesquisa').value
    if(search != '' && search != ' ') {
        location.href=`pesquisa.html?search=${search}`
    }
  }

async function pesquisaJogo(pesquisado){
    pesquisado = pesquisado.toLowerCase();
    console.log(pesquisado)
    let encontrouAlgo = false
    let pagina = 1
    let jogosEncontrados = 0
    let str = ''
        while (encontrouAlgo == false) {
            document.getElementById("AreaPesquisa").innerHTML = "<h3>PRORURANDO...</h3>"
            if(jogosEncontrados == 4) {
                encontrouAlgo = true
            }
            let jogos = await retornaObjetoApi(pagina);
            for (let i = 0; i < jogos.length; i++) {
                console.log(jogos[i])
                console.log(jogosEncontrados)
                let nome = jogos[i].name.toLowerCase()
                if(nome.includes(pesquisado)) {
                    jogosEncontrados++

                    str += 
                    `
                    <div class="col-12 jogoPesquisado">
                        <div class="col-12 col-md-6 col-lg-6 col-xl-6 corpo-card">
                            <div class="card">
                                <img src="${jogos[i].background_image}" class="card-img-top">
                                <div class="card-body">
                                    <h1 class="card-title">${jogos[i].name}</h1>
                                    <a href="detalhes.html?id=${jogos[i].id}" class="btn btn-primary" onclick=colocaDetalhes(${jogos[i]})>Visitar</a>
                                </div>
                            </div>
                        </div>  
                    </div>
                    `
                }
            }
            pagina++
        }
        document.getElementById("AreaPesquisa").innerHTML = str
    
}
