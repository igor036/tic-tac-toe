/*
* Author:  Igor Joaquim dos Santos Lima
* GitHub: https://github.com/igor036
* E-mail: igorjoaquim.pg@gmail.com
*/

/* Pendentes
 * 1-placar.
 * 2-usuário escolher o simbolo.
 * 3-alerta de perca ou empate.
 * 4-usar um gif de load enquanto a ia
 * estiver cálculando a próxima jogada.
 */

var userSimbol = "0";
var iaSimbol = "X";
var id;
var inGame = true;
var board = { 
    0: ["","",""],
    1: ["","",""], 
    2: ["","",""] 
};

var gameScore = {
    ia:0,
    draw:0
};

$(function(){
    $(".game-section").click(function() {
        if ($(this).children(0).html() == "-" && inGame) {
            $(this).html("<h1>"+userSimbol+"</h1>");
            id = $(this).attr("id").split("-");
            board[id[0]][id[1]] = userSimbol;
            setTimeout(function() {
                merge(board,next(iaSimbol,board));
            }, 100);
        } else
            alert("Ação inválida!");
    });
});

function merge(a,b) {
    
    let count = 0;

    for (let x = 0; x  < 3; x++) {
        for (let y = 0; y  < 3; y++) {
            
            if (b[x][y] != "")
                count++;

            if (a[x][y] == "" && b[x][y] != "") {
                $("#row-"+x+" div")[y].children[0].innerHTML = iaSimbol;
                board[x][y] = iaSimbol;
                break;
            }
        }   
    }

    //verifica resultado do jogo!
    setTimeout(function() {
        if (score(board) == iaSimbol) {
            alert("Você perdeu");
            inGame = false;
            $("#ia-score").html(++gameScore.ia);

        } else if (count == 9){
            alert("Empate!");
            inGame = false;
            $("#draw-score").html(++gameScore.draw);

        }
    }, 100);
}


function reset() {

    for (let i = 0; i < 3; i++) {
        list =  $("#row-"+i+" div");
        for (let j = 0; j < list.length; j++) 
            list[j].children[0].innerHTML = "-";
        
     }

     board = { 
        0: ["","",""],
        1: ["","",""], 
        2: ["","",""] 
    };

    last = null;
    inGame = true;
}