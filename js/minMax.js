/*
* Author:  Igor Joaquim dos Santos Lima
* GitHub: https://github.com/igor036
* E-mail: igorjoaquim.pg@gmail.com
*/

var last = null;

function clone(matriz) {
    
    let clone = { 0: [], 1: [], 2: [] };

    for (let y = 0; y < 3; y++)
        for (let x = 0; x < 3; x++)
            (clone[y])[x] = matriz[y][x];

    return clone;
}

function equals(a,b){

    for (let x = 0; x < 3; x++)
        for (let y = 0; y < 3; y++)
            if (a[x][y] != b[x][y])
                return false;
    return true;
}

function ready(m) {

    let count = 0;

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {

            if (count == 6)
                break;

            if (m[x][y] != "")
                count ++;
            
        }
    }
    
    return count == 6;
}

function podaAlfaBeta(simbol, matriz) {

    let child;
    let temp = clone(matriz);
    let node = {
        value: clone(matriz),
        simb: simbol,
        childs: [],
        score: winner(matriz),
        next: null
    };

    if (node.score == "E") {

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                  
                if (temp[x][y] == "") {
    
                    child = clone(node.value);
                    child[x][y] = simbol;

                    temp[x][y] = "w";
                    child = podaAlfaBeta(simbol == "X" ? "0" : "X", child);
                    
                    node.childs.push(child);

                    if (child.score == simbol) {

                        node.score = simbol;
                        node.next = child;

                        if (winner(child.value) == "X")
                            x = y = 3;
                        
                    } else
                        if(node.score == "E")
                            node.score = simbol == "X" ? "0" : "X";
                }
            }
        }
    }

    return node;
}

function next(simbol,board) {

    if (last == null)
        last = podaAlfaBeta(simbol, board).next;
    else {
        
        for (let i = 0; i < last.childs.length; i++) {
            if (equals(last.childs[i].value,board)) {
                last = last.childs[i].next;
                break;
            }
        }
    }
            
    return last.value;
}


function vertical(m, index) {

    if (m[index][0] == m[index][1] && m[index][0] == m[index][2])
        return m[index][0];

    return "E";
}

function horizontal(m, index) {

    if (m[0][index] == m[1][index] && m[0][index] == m[2][index])
        return m[0][index];
    return "E";
}

function diagonal(m) {

    if ((m[0][0] == m[1][1] && m[0][0] == m[2][2]) ||
        (m[0][2] == m[1][1] && m[0][2] == m[2][0]))
        return m[1][1];

    return "E";
}


function winner(m) {

    if (!ready(m)) {
        
        return "E";
    }

    let r;

    for (let i = 0; i < 3; i++) {

        r = vertical(m, i);
        if (r != "E")
            break;

        r = horizontal(m, i);
        if (r != "E")
            break;
    }

    return r != "E" ? r : diagonal(m);
}