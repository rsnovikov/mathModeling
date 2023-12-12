const readlineSync = require("readline-sync");

// TODO: сделать ввод размерности и матрицы из консоли
// TODO: сделать вывод каждого шага и результата
// TODO: подробно разобраться в коде и написать комменты
// TODO: написать теорию в отчет
// TODO: сделать блок-схему для отчета
// TODO: вставить код в отчет

/**
 * Проверяет систему на совместность
 */
const isSystemConsistent = (matrix: number[][], size: number): boolean => {
	for (let i = 0; i < size; i++) {
		let isEveryZero: boolean = true;

		for (let j = 0; j < size; j++) {
			if (matrix[i][j] !== 0) {
				isEveryZero = false;
				break;
			}
		}
		if (isEveryZero && matrix[i][size] !== 0) {
			return false;
		}
	}

	return true;
};

const gauss = (matrix: number[][], size: number) => {
	// Прямой ход Гаусса
	for (let i = 0; i < size; i++) {
		// Приведение матрицы к треугольному виду
		for (let j = i + 1; j < size; j++) {
			const divider = matrix[j][i] / matrix[i][i];

			for (let k = i; k < size + 1; k++) {
				matrix[j][k] -= divider * matrix[i][k];
			}
		}
	}

	console.log("Прямой ход Гаусса:", matrix);

	if (!isSystemConsistent(matrix, size)) {
		throw new Error("Система не совместна");
	}

	// Обратный ход Гаусса
	for (let i = size - 1; i >= 0; i--) {
		// Делим строки на главный элемент
		matrix[i][size] /= matrix[i][i];
		matrix[i][i] = 1;

		// Вычитание уравнения с найденной переменной из предыдущих уравнений
		for (let j = i - 1; j >= 0; j--) {
			matrix[j][size] -= matrix[j][i] * matrix[i][size];
			matrix[j][i] = 0;
		}
	}
};

const main = (): void => {
	let size: number;
	const matrix: number[][] = [];

	size = Number(readlineSync.question("Размерность: "));
	console.log(size);

	for (let i = 0; i < size; i++) {
		matrix[i] = readlineSync
			.question(`Введите ${i + 1} строку уравнения (${size + 1} числа через пробел): `)
			.split(", ")
			.map(Number);
	}

	const MATRIX: number[][] = [
		[3, 2, -5, -1],
		[2, -1, 3, 13],
		[1, 2, -1, 9],
	];

	const SIZE = 3;
	// const matrix = [];

	gauss(MATRIX, SIZE);
	MATRIX.forEach((item, index) => console.log(`x${index + 1} =`, item[SIZE]));
};

main();
