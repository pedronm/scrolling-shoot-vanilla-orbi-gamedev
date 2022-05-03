var divInicial = document.getElementById('inicio'),
    fundoGame  = document.getElementById('fundoGame')
    jogador    = document.createElement('div'),
    inimigoA   = document.createElement('div'),
    inimigoB   = document.createElement('div'),
    amigo      = document.createElement('div'),    
    disparo    = document.createElement('div'),
    placar     = docuemnt.createElement('div'),
    energia    = document.createElement('div'),
    energiaAtual = 3
  tempoDisparo = window.setInterval (executaDisparo, 30),
    velocidade = 5,
    posicaoY   = parseInt(Math.random() * 334),
    jogo       = {},
    tecla      = { W: 87, S: 83, D: 63 },
    podeAtirar = true,
    fimDeJogo  = false,
    pontos     = 0,
    salvos     = 0,
    perdidos   = 0,
    somDisparo=document.getElementById("somDisparo"),
    somExplosao=document.getElementById("somExplosao"),
    musica=document.getElementById("musica"),
    somGameover=document.getElementById("somGameover"),
    somPerdido=document.getElementById("somPerdido"),
    somResgate=document.getElementById("somResgate"),

function iniciar(){
    
    divInicial.style.visibility = 'hidden'

    jogador.id = 'jogador'
    jogador.classList.add('ani-helicoptero')
    inimigoA.id = 'inimigoA'
    inimigoA.classList.add('ani-inimigo')
    inimigoB.id = 'inimigoB'
    inimigoB.classList.add('ani-inimigo')
    amigo.id = 'amigo'
    amigo.classList.add('ani-amigo')
    placar.id = placar
    energia.id = 'energia'

    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    fundoGame.appendChild(energia)
    fundoGame.appendChild(jogador)
    fundoGame.appendChild(inimigoA)
    fundoGame.appendChild(inimigoB)
    fundoGame.appendChild(amigo)
    fundoGame.appendChild(placar)   

    jogo.pressionou = []

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });


    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });
    

	jogo.timer = setInterval(loop,30);
	    
}

function loop() {
	
    movefundo();
    movejogador();
    moveInimigoA();
    moveinimigoB()
    moveAmigo()
    colisao()
    ativarPlacar()
    contadorEnergia()
} 

function moveFundo(){
    esquerda = parseInt(fundoGame.style.background-position);
	fundoGame.style.backgroundPosition = esquerda-1;	
}

function movejogador() {
	
    if (jogo.pressionou[TECLA.W]) {
        var topo = parseInt(jogador.style.top);
        jogador.style.top = topo-10;

        if (topo<=0) {		
            jogador.style.top = topo+10;
        }

    }
    if (jogo.pressionou[TECLA.S]) {	
   
		var topo = parseInt(jogador.style.top);
        jogador.style.top = topo+10;	
                      
        if (topo>=434) {	
            jogador.style.top = topo-10;
                
        }

	}
	
	if (jogo.pressionou[TECLA.D]) {
		
		//Chama função Disparo	
	}

}

function moveInimigoA() {
    
	posicaoX = parseInt(inimigoA.style.left);
	inimigoA.style.left = posicaoX-velocidade;
	inimigoA.style.top  = posicaoY
    
    if (posicaoX <=0 ) {
        posicaoY = parseInt(Math.random() * 334);
        inimigoA.style.left = 694;
        inimigoA.style.top  = posicaoY;            
    }
}

function moveInimigoB() {
    posicaoX = parseInt(inimigoB.style.left);
    inimigoB.style.left = posicaoX-3;
            
    if (posicaoX <= 0) {
        
        inimigoB.style.left = 775;
                
    }
}

function moveAmigo() {
	
	posicaoX = amigo.style.left;
	amigo.style.left = posicaoX+1;
				
	if (posicaoX > 906) {
			
	    amigo.style.left = 0;
					
    }

} 

function disparar(){

    if (podeAtirar) {
		
        podeAtirar=false;
        
        somDisparo.play();

        topo     = jogador.style.top
        posicaoX = jogador.style.left
        tiroX    = posicaoX + 190;
        topoTiro = topo+37;        
        disparo.id = 'disparo'
        fundoGame.appendChild(disparo);
        disparo.top  = topoTiro;
        disparo.left = tiroX;       
        
    } 
        
}

function executaDisparo() {
    posicaoX = disparo.style.left;
    disparo.style.left = posicaoX+15; 

    if (posicaoX>900) {
                    
        window.clearInterval(tempoDisparo);
        tempoDisparo=null;
        fundoGame.removeChild(disparo);
        podeAtirar=true;
                
    }
}

function ativarPlacar() {
	
    var pontos = docuemnt.createElement('h2')

    pontos.innerHTML = `Pontos ${pontos} Salvos ${salvos} Perdidos: ${perdidos}`

    placar.appendChild()
	$("#placar").html(
        "<h2> Pontos: " +
         pontos + 
        " Salvos: " + 
         salvos + 
        " Perdidos: " + 
         perdidos + 
        "</h2>");
	
}

function colisao() {
    var colisaoPlayaerInimigoA = verificaColisao(jogador, inimigoA),
        colisaoDisparoInimigoA = verificaColisao(disparo, inimigoA),
        colisaoDisparoInimigoB = verificaColisao(disparo, inimigoB),
        colisaoPlayaerAmigo = verificaColisao(jogador, amigo), 
        colisaoPlayaerInimigoB = verificaColisao(jogador, inimigoB),
        colisaoAmigoInimigoB = verificaColisao(amigo, inimigoB)

    if(colisaoPlayaerInimigoA) gerarColisaoNoJogador(jogador)
    if(colisaoPlayaerInimigoB) gerarColisaoNoJogadorB(jogador)
    if(colisaoDisparoInimigoA) gerarColisaoDisparoA(inimigoA)
    if(colisaoDisparoInimigoB) gerarColisaoDisparoB(inimigoB)
    if(colisaoPlayaerAmigo) gerarColisaoAmigo(amigo)
    if(colisaoAmigoInimigoB) gerarColisaoAmigoComInimigo(amigo)
}

function gerarColisaoAmigoComInimigo(){
    perdidos++;
    somPerdido.play();
    amigoX = parseInt(amigo.style.left);
    amigoY = parseInt(amigo.style.top);
    explosao3(amigoX,amigoY);
    document.removeChild(amigo)
    reposicionaAmigo()
}

function gerarColisaoDisparoA(){

    velocidade=velocidade+0.3;
    pontos=pontos+100;

    somExplosao.play();
    inimigo1X = parseInt(inimigoA.style.left);
    inimigo1Y = parseInt(inimigoA.style.top);
        
    explosao1(inimigo1X,inimigo1Y);
    disparo.style.left = 950;
        
    posicaoY = parseInt(Math.random() * 334);
    inimigoA.style.left = 694;
    inimigoA.style.top = posicaoY
        
    
}

function gerarColisaoDisparoB(){

    pontos=pontos+50;

    somExplosao.play(); 
    inimigo2X = parseInt(inimigoB.style.left);
    inimigo2Y = parseInt(inimigoB.style.top);

    document.removeChild(inimigoB)
    
    explosaoB(inimigo2X,inimigo2Y);
    disparo.style.left = 950;
    
    reposicionaInimigo2();
}

function gerarColisaoAmigo(){
    salvos++;
    somResgate.play();
    reposicionaAmigo();
    document.removeChild(amigo)
}

function gerarColisaoNoJogadorB(elem){
    	
    energiaAtual--

	inimigo2X = inimigoB.style.left;
	inimigo2Y = inimigoB.style.top;
	explosaoB(inimigo2X,inimigo2Y);
	
    document.removeChild(inimigoB)
		
	reposicionaInimigo2();
		
}

function gerarColisaoNoJogador(elem){
         
    energiaAtual--
    inimigo1X = parseInt(inimigoA.style.left);
    inimigo1Y = parseInt(inimigoA.style.top);
    explodir(inimigo1X,inimigo1Y);

    posicaoY = parseInt(Math.random() * 334);
    inimigoA.style.left = "694";
    inimigoA.style.top = posicaoY;
    
}

function explodir(inimigo1X,inimigo1Y) {
    var explosao = document.createElement('div')
    explosao.id = 'explosao1'
    fundoGame.appendChild(explosao)    
    explosao.style.backgroundImage("url(imgs/explosao.png)")
	explosao.style.top = inimigo1Y;
    explosao.style.left = inimigo1X
	explosao.animate({width:200, opacity:0}, "slow");
	
	var tempoExplosao=window.setInterval(removeExplosao(explosao), 1000);

        
    function removeExplosao() {
                
        explosao.remove();
        window.clearInterval(tempoExplosao);
        tempoExplosao=null;
        
    }
} 

function explosao2(inimigo2X,inimigo2Y) {
        
    $("#fundoGame").append("<div id='explosao2'></div");
    $("#explosao2").css("background-image", "url(imgs/explosao.png)");
    var div2=$("#explosao2");
    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({width:200, opacity:0}, "slow");

    var tempoExplosao2=window.setInterval(removeExplosao2, 1000);

    function removeExplosao2() {
        
        div2.remove();
        window.clearInterval(tempoExplosao2);
        tempoExplosao2=null;
        
    }
    
    
}

function explosao3(amigoX,amigoY) {
    $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top",amigoY);
    $("#explosao3").css("left",amigoX);
   
    var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
   
    function resetaExplosao3() {
        $("#explosao3").remove();
        window.clearInterval(tempoExplosao3);
        tempoExplosao3=null;
            
    }
    
} 

function reposicionaInimigo2() {

    var tempoColisao4=window.setInterval(reposiciona4, 5000);
        
    function reposiciona4() {
        window.clearInterval(tempoColisao4);
        tempoColisao4=null;
        
        if (fimdejogo==false) {
            var explosao = document.createElement('div')
            explosao.id = 'inimigo2'
            fundoGame.appendChild(explosao)        
        }
        
    }	
}	

function reposicionaAmigo() {

    var tempoAmigo=window.setInterval(reposiciona6, 6000);
    
    function reposiciona6() {
        window.clearInterval(tempoAmigo);
        tempoAmigo=null;
        
        if (fimdejogo==false) {
        
            var explosao = document.createElement('div')
            explosao.id = 'amigo'
            explosao.classList.add('anima3')
            fundoGame.appendChild(explosao)
        }
    }
        
}

function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
}

function gameOver() {
	fimdejogo=true;
	musica.pause();
	somGameover.play();
	
	window.clearInterval(jogo.timer);
	jogo.timer=null;
	
	$("#jogador").remove();
	$("#inimigo1").remove();
	$("#inimigo2").remove();
	$("#amigo").remove();
	
	$("#fundoGame").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
}

function contadorEnergia() {
	
    if (energiaAtual==3) {
        
        $("#energia").css("background-image", "url(imgs/energia3.png)");
    }

    if (energiaAtual==2) {
        
        $("#energia").css("background-image", "url(imgs/energia2.png)");
    }

    if (energiaAtual==1) {
        
        $("#energia").css("background-image", "url(imgs/energia1.png)");
    }

    if (energiaAtual==0) {
        
        $("#energia").css("background-image", "url(imgs/energia0.png)");
        
        gameOver();
    }

}

function verificaColisao(objA, objB){
    var coordA = { x: objA.style.offset.left , y: objA.style.offset.top, w: objA.style.outerHeight , h:objA.style.outerWidth },
        coordB = { x: objB.style.offset.left , y: objB.style.offset.top, w: objB.style.outerHeight , h:objB.style.outerWidth }
    
    if (coordA.x < coordB.x + coordB.w &&
        coordA.x + coordA.w > coordB.x &&
        coordA.y < coordB.y + coordB.h &&
        coordA.h + coordB.y > coordB.y) {
        return true
    } else {
        return false
    }
}