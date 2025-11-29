import type { Cell as CellType, Definitions } from '$lib/types/crossword';

export class Crossword {
	hor: number;
	ver: number;
	cells: CellType[][] = [[]];
	definitions: Definitions = { horizontal: [], vertical: [] };

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
		this.definitions = { horizontal: [], vertical: [] };

		for (let row = 0; row < this.ver; row++) {
			for (let col = 0; col < this.hor; col++) {
				if (this.cells[row][col].black) continue;
				if (this.isWordStart(row, col, sequenceNumber)) {
					this.cells[row][col].number = sequenceNumber;
					sequenceNumber++;
				}
			}
		}
	};

	private isWordStart(row: number, col: number, sequenceNumber: number): boolean {
		const isHorizontalStart: boolean = this._isHorizontalWordStart(row, col);
		const isVerticalStart: boolean = this._isVerticalWordStart(row, col);
		if (isHorizontalStart) this.addHorizontalDefinition(sequenceNumber);
		if (isVerticalStart) this.addVerticalDefinition(sequenceNumber);
		return isHorizontalStart || isVerticalStart;
	}

	private addHorizontalDefinition(sequenceNumber: number): void {
		this.definitions.horizontal.push({ gridNumber: sequenceNumber, text: null });
	}

	private addVerticalDefinition(sequenceNumber: number): void {
		this.definitions.vertical.push({ gridNumber: sequenceNumber, text: null });
	}

	private _isHorizontalWordStart(row: number, col: number): boolean {
		const isLeftEdge: boolean = col === 0;
		const isRightEdge: boolean = col === this.hor - 1;
		const previousCellIsBlack: boolean = col > 0 ? this.cells[row][col - 1].black : false;
		const nextCellIsBlack: boolean = col < this.hor - 1 ? this.cells[row][col + 1].black : false;
		return (isLeftEdge || previousCellIsBlack) && !isRightEdge && !nextCellIsBlack;
	}

	private _isVerticalWordStart(row: number, col: number): boolean {
		const isTopEdge: boolean = row === 0;
		const isBottomEdge: boolean = row === this.ver - 1;
		const previousCellIsBlack: boolean = row > 0 ? this.cells[row - 1][col].black : false;
		const nextCellIsBlack: boolean = row < this.ver - 1 ? this.cells[row + 1][col].black : false;
		return (isTopEdge || previousCellIsBlack) && !isBottomEdge && !nextCellIsBlack;
	}
}
