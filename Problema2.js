// Dado un conjunto de intervalos cerrados, encuentre el conjunto
// más pequeño de números que cubra todos los intervalos. Si hay varios
// conjuntos más pequeños, devuelva cualquiera de ellos

function minimumSet(intervals) {
    // Este conjunto contendrá varios intervalos
    // empezando por el primer elemento de intervals
    let intervalFamily = [intervals[0]];
    // Comparar todos los intervalos a partir del segundo
    // (índice = 1)
    for (let i = 1; i < intervals.length; i++) {
        // Verificar si el conjunto es disjunto a toda la familia
        // de intervalos
        let isDisjoint = true;
        let k = 0;
        while (isDisjoint && k < intervalFamily.length) {
            if (!checkIfDisjoint(intervalFamily[k], intervals[i])) {
                isDisjoint = false;
            }
            k++;
        }

        // XYZ
        if (isDisjoint) {
            // Agregar a la familia de intervalos
            intervalFamily.push(intervals[i]);
        } else {
            // Si no es disjunto, sustituir los intervalos
            // que se encuentran en intervalFamily con los cuales
            // tienen elementos en común por su respectiva intersección
            for (let n = 0; n < intervalFamily.length; n++) {
                if (!checkIfDisjoint(intervalFamily[n], intervals[i])) {
                    // Computar la intersección de los intervalos
                    const intersection = intervalIntersection(intervalFamily[n], intervals[i]);
                    // Sustituir el intervalo actual por la intersección
                    intervalFamily[n] = intersection;
                }
            }
        }
    }

    return intervalFamily;
}

// Verifica si dos conjuntos son o no disjuntos
// True en caso de ser disjuntos, false en caso contrario
function checkIfDisjoint(X, Y) {
    return !(X[0] >= Y[0] && X[0] <= Y[1] ||
        Y[0] >= X[0] && Y[0] <= X[1])
}

// Devuelve la intersección entre dos intervalos
function intervalIntersection(X, Y) {
    if (checkIfDisjoint(X, Y)) {
        // Si los conjuntos son disjuntos, la intersección es []
        return [];
    } else {
        // Los conjuntos no son disjuntos, la intersección es
        // necesariamente no vacía
        if (X[0] < Y[0]) {
            if (X[1] < Y[1]) {
                return [Y[0], X[1]];
            } else {
                return Y;
            }
        } else {
            if (X[1] < Y[1]) {
                return X;
            } else {
                return [X[0], Y[1]];
            }
        }
    }
}

let intervals = [[0, 3], [2, 6], [3, 4], [6, 9]];
let set = minimumSet(intervals);
console.log(`El "conjunto mínimo" de los intervalos ${JSON.stringify(intervals)} es ${JSON.stringify(set)}, cuya cardinalidad es ${set.length}`);
intervals = [[1, 5], [2, 4], [4, 8], [9, 9]];
set = minimumSet(intervals);
console.log(`El "conjunto mínimo" de los intervalos ${JSON.stringify(intervals)} es ${JSON.stringify(set)}, cuya cardinalidad es ${set.length}`);
intervals = [[6, 9], [1, 9]];
set = minimumSet(intervals);
console.log(`El "conjunto mínimo" de los intervalos ${JSON.stringify(intervals)} es ${JSON.stringify(set)}, cuya cardinalidad es ${set.length}`);