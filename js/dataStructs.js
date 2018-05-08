/*
* Author:  Igor Joaquim dos Santos Lima
* GitHub: https://github.com/igor036
* E-mail: igorjoaquim.pg@gmail.com
*/

function Stack() {

    let vetor = [];

    return {

        push: value => vetor.push(value),

        pop: () => {

            let value = null;

            if (vetor.length > 0) {

                value = vetor[vetor.length - 1];
                vetor = vetor.slice(0, -1);
            }

            return value;
        },

        isEmpty: () => vetor.length == 0,
        size: () => vetor.length,
        clean: () => vetor = []
    }
}

function Queue() {

    let length = 0;
    let first, last;

    getNode = val => {
        return {
            value: val,
            next: NaN
        }
    }

    return {

        push: value => {

            let node = getNode(value);

            if (length == 0) {

                first = node;
                last = node;

            } else {

                last.next = node;
                last = node;
            }

            length++;
        },
        pop: () => {

            let value = null;

            if (length > 0) {

                value = first.value;
                first = first.next;
                length--;
            }

            return value;
        },
        clean: () => {
            length = 0;
            root = NaN;
        },
        isEmpty: () => length == 0,
        size: () => length
    }
}
