import type { Cell as CellType } from '$lib/types/crossword';

export class Crossword {
	hor: number;
	ver: number;
	cells: CellType[][] = $state([[]]);

	constructor(hor: number, ver: number) {
		this.hor = hor;
		this.ver = ver;
		this.cells = Array(ver)
			.fill(null)
			.map(() =>
				Array(hor)
					.fill(null)
					.map(() => ({ number: null, letter: null, black: false }))
			);
		this.computeGridNumbers();
	}

	computeGridNumbers = (): void => {
		let sequenceNumber = 1;

		this.cells.forEach((row) => row.forEach((cell) => (cell.number = null)));

		for (let row = 0; row < this.ver; row++) {
			for (let col = 0; col < this.hor; col++) {
				if (this.isWordStart(row, col)) {
					this.cells[row][col].number = sequenceNumber++;
				}
			}
		}
	};

	private isWordStart(row: number, col: number) {
		const cellIsBlack: boolean = this.cells[row][col].black;
		return (
			!cellIsBlack && (this._isHorizontalWordStart(row, col) || this._isVerticalWordStart(row, col))
		);
	}

	private _isHorizontalWordStart(row: number, col: number) {
		const isLeftEdge: boolean = col === 0;
		const isRightEdge: boolean = col === this.hor - 1;
		const previousCellIsBlack: boolean = col > 0 ? this.cells[row][col - 1].black : false;
		const nextCellIsBlack: boolean = col < this.hor - 1 ? this.cells[row][col + 1].black : false;
		return (isLeftEdge || previousCellIsBlack) && !isRightEdge && !nextCellIsBlack;
	}

	private _isVerticalWordStart(row: number, col: number) {
		const isTopEdge: boolean = row === 0;
		const isBottomEdge: boolean = row === this.ver - 1;
		const previousCellIsBlack: boolean = row > 0 ? this.cells[row - 1][col].black : false;
		const nextCellIsBlack: boolean = row < this.ver - 1 ? this.cells[row + 1][col].black : false;
		return (isTopEdge || previousCellIsBlack) && !isBottomEdge && !nextCellIsBlack;
	}
}
