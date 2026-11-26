(function () {
    "use strict";

    let palavraSecreta = ["djavan", "jorge ben jor", "jorge versilio", "seu jorge", "racionais", "sepultura", "angra", "massacration", "matanza", "matanza ritual", "tim maia", "crypta", "venere vai venus", "cabeca de morcego decapitada", "amado batista", "tiao carreiro", "mirosmar", "sarcofago", "soulfly", "trio parada dura", "chico rey e parana", "dexter", "sabotage", "negra li", "sorriso maroto", "calcinha preta"];
    let palavraOculta = [];
    let palavraAleatoria = Math.floor(Math.random() * palavraSecreta.length);
    let palavraSorteada = palavraSecreta[palavraAleatoria];
    let tentativasRestantes = 7;
    let partes = ["perna-direita", "perna-esquerda", "braco-direito", "braco-esquerdo", "tronco", "cabeca"]; // Auxilio da I.A 

    for (let i = 0; i < palavraSorteada.length; i++) {
        if (palavraSorteada[i] == " ") {
            palavraOculta.push(" "); // Espaço já aparece ( Auxilio da I.A )
        } else {
            palavraOculta.push("*");
        }
    }

    // Mostrar os ASTERISCOS ( * )

    let palavra = document.getElementById('digito');   // document.querySelector tmb pode ser usado
    palavra.innerHTML = palavraOculta.join(" ");  // .join - Junta os itens do array em uma unica STRING, deixando-os entre parenteses

    // Manipulação dos elementos do DOM
    let txtTentativas = document.getElementById('tentativas');
    let txtInvalidas = document.getElementById('invalidas');
    let txtDigitos = document.getElementById('palavra');
    let btnConfirmar = document.getElementById('btn-confirmar');
    let btnReinicio = document.getElementById('btn-reinicio');
    let statusMsg = document.getElementById('status');


    // Evento do clique para o btn
    btnConfirmar.addEventListener("click", testarCodigo);
    btnReinicio.addEventListener("click", reniciarJogo);

    function testarCodigo() {
        let digito = txtDigitos.value; // Captura o texto que o usuario digita
        txtDigitos.value = ""; // Limpa a caixa de entrada ápos pegar o valor
        txtDigitos.focus(); // Mantém o cursor piscando na caixa

        if (digito == "") {
            return; // Se o usuario clicar com o campo vazio, a função é interrompida
        }

        let encontrou = false;

        // Fazer uma varredura no código de de acesso, para encontrar a senha
        for (let i = 0; i < palavraOculta.length; i++) {
            if (palavraSorteada[i] == digito) {
                palavraOculta[i] = digito;
                encontrou = true;
            }
        }

        // Se encontrou, atualiza a interface
        if (encontrou) {

            palavra.innerHTML = palavraOculta.join(" ")
        } else {
            tentativasRestantes--;
            let parte = partes[5 - tentativasRestantes];
            document.getElementById(parte).style.visibility = "hidden";
            txtTentativas.innerHTML = tentativasRestantes;
            txtInvalidas.innerHTML += `${digito}`;
        }

        // Verificar a condição de vitória e derrota
        if (tentativasRestantes == 0) {
            statusMsg.innerHTML = `<p style="color: red;"><strong>PALAVRA INCORRETA!</strong></p><p style="color: black;"> A palavra era ${palavraSorteada}</p>`;
            btnConfirmar.disabled = true;
            txtDigitos.disabled = true;
        } else if (!palavraOculta.includes("*")) {
            statusMsg.innerHTML = `<p style="color: green";><strong>PARABÉNS!</strong> Você acertou a palavra</p>`;
            btnConfirmar.disabled = true;
            txtDigitos.disabled = true;
        }
    }

    function reniciarJogo() {
        location.reload
    }
})();