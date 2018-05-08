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

function tree(simbol, matriz) {

    let child;
    let temp = clone(matriz);
    let node = {
        value: clone(matriz),
        simb: simbol,
        childs: []
    };

    if (score(matriz) == "E") {

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
    
                if (temp[x][y] == "") {
    
                    child = clone(node.value);
                    child[x][y] = simbol;
                    temp[x][y] = "w";
                    
                    node.childs.push(tree(simbol == "X" ? "0" : "X", child));
                }
            }
        }
    }

    return node;
}

function next(simbol,board) {

    let node;

    if (last == null) {

        let queue = Queue();
        let stack = Stack();
        
        node = tree(simbol, board);
        queue.push(node);
        stack.push(node);
    
        while (!queue.isEmpty()) {
    
            node = queue.pop();
    
            for (var i = node.childs.length - 1; i >= 0; i--) {
    
                queue.push(node.childs[i]);
                stack.push(node.childs[i]);
    
            }
        }
    
        while (!stack.isEmpty()) {  
    
            node = stack.pop();
    
            if (node.childs.length == 0)
                node["score"] = score(node.value);
    
            else {
    
                for (let i = 0; i < node.childs.length; i++) {
    
                    if (node.simb == node.childs[i].score) {
                        node["score"] = node.simb;
                        break;
                    }
                }
    
                if (!node.score)
                    node["score"] = node.simb == "X" ? "0" : "X";
            }
        }
    
    } else {
        
        for (let i = 0; i < last.childs.length; i++) {
            if (equals(last.childs[i].value,board)) {
                node = last.childs[i];
                break;
            }
        }
    }

    for (let i = 0; i < node.childs.length; i++){
        if (node.childs[i].score == simbol ){
            node = node.childs[i];
            break;
        }
    }

    last = node;
    return node.value;
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


function score(m) {

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