// Dado un arreglo de n elementos de parejas de números separados por puntos.
// Donde cada pareja de números representa una matriz de de números 1,
// de las dimensiones representadas por cada pareja.
// Calcular el número de repeticiones de el número más alto obtenido
// al sumar todas las matrices representadas por el arreglo.

// Los números deberán ser pasados como un arreglo de cadenas,
// pues si se mandan números, JS truncaría valores como 10.10 a 10.1

function problem(matrixes) {
    // 1. Encontrar el máximo de filas (M) y columnas (N)
    let maxRow = 0;
    let maxColumn = 0;
    // Arrego con las dimensiones en arreglos (x.y será [x, y])
    // Será más útil el valor numérico
    const matrixesDimensions = [];
    for (const matrix of matrixes) {
        // Separar fila (m) y columna (n)
        const [m, n] = matrix.split('.');
        const row = parseInt(m);
        const column = parseInt(n);
        matrixesDimensions.push([row, column]);
        // Comparar con máximos actuales y reasignar
        // en caso de ser mayor
        if (row > maxRow) {
            maxRow = row;
        }
        if (column > maxColumn) {
            maxColumn = column;
        }
    }

    // 2. Rellenar matrices. Puesto que la suma usual de matrices
    // está definida solo cuando estas tienen la misma dimensión,
    // todas las matrices serán de M x N (maxRow filas por maxColumn columnas)
    // pero únicamente se colocarán 1's en la submatriz original
    // e.g. si la matriz original es [1,1],[1,1] pero M = N = 3, entonces
    // la matriz será [1,1,0], [1,1,0], [0,0,0]
    // (La submatriz se posicionará en la esquina superior izquierda)
    const filledMatrixes = matrixesDimensions.map((matrixDimensions) => {
        // Generar matriz constante de ceros de M x N
        const matrix = constantMatrix(maxRow, maxColumn);
        // Sustituir por 1's los elementos en la submatriz de m x n
        // (matrixDimensions tiene las medidas)
        for (let i = 0; i < matrixDimensions[0]; i++) {
            for (let j = 0; j < matrixDimensions[1]; j++) {
                matrix[i][j] = 1;
            }
        }

        return matrix;
    });
    
    // 3. Sumar todas las matrices. Ahora que todas son de M x N
    // la suma está definida de manera trivial
    const matrixSum = filledMatrixes.reduce((accumulator, currentMatrix) => {
        const matrix = [];
        for (let i = 0; i < accumulator.length; i++) {
            // Filas
            const row = [];
            for (let j = 0; j < accumulator[0].length; j++) {
                // Columnas
                row.push(accumulator[i][j] + currentMatrix[i][j]);
            }
            matrix.push(row);
        }
        return matrix;
    });
    
    // 4. Encontrar el elemento mayor en la matriz sumada
    // y su frecuencia. Debido a que todas las matrices
    // se "colocan" en la esquina superior izquierda,
    // el primer elemento de la primera fila será el mayor
    let maxElement = matrixSum[0][0];
    let frequency = 0;
    // Contar cuántas veces aparece maxElement
    for (let i = 0; i < matrixSum.length; i++) {
        for (let j = 0; j < matrixSum[0].length; j++) {
            if (matrixSum[i][j] === maxElement) {
                frequency++;
            }
        }
    }
    return { maxElement, frequency };
}

// Genera matrices constantes de n x m con value en cada elemento
function constantMatrix(m, n, value = 0) {
    const matrix = [];
    for (let i = 0; i < m; i++) {
        // Filas
        const row = [];
        for (let j = 0; j < n; j++) {
            // Columnas
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}

let matrixDimensions = ['1.2', '2.1', '2.2'];
let sum = problem(matrixDimensions)
console.log(`El máximo elemento en la suma de las matrices ${JSON.stringify(matrixDimensions)} es ${sum.maxElement}, y se repite ${sum.frequency} vez (veces)`);
matrixDimensions = ['3.5', '4.2', '1.3'];
sum = problem(matrixDimensions)
console.log(`El máximo elemento en la suma de las matrices ${JSON.stringify(matrixDimensions)} es ${sum.maxElement}, y se repite ${sum.frequency} vez (veces)`);
matrixDimensions = ['2.1', '1.2'];
sum = problem(matrixDimensions)
console.log(`El máximo elemento en la suma de las matrices ${JSON.stringify(matrixDimensions)} es ${sum.maxElement}, y se repite ${sum.frequency} vez (veces)`);
matrixDimensions = ['3.4', '1.1', '6.7', '3.2'];
sum = problem(matrixDimensions)
console.log(`El máximo elemento en la suma de las matrices ${JSON.stringify(matrixDimensions)} es ${sum.maxElement}, y se repite ${sum.frequency} vez (veces)`);
matrixDimensions = ['1.1', '2.2', '3.3', '4.4'];
sum = problem(matrixDimensions)
console.log(`El máximo elemento en la suma de las matrices ${JSON.stringify(matrixDimensions)} es ${sum.maxElement}, y se repite ${sum.frequency} vez (veces)`);