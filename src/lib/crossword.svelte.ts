import type { Cell, Cells, DbCells, DbDefinitions, Definitions } from '$lib/types/crossword';

const defaultCell: Cell = { number: null, letter: null, black: false };

export class Crossword {
	id: number;
	horizontal: number;
	vertical: number;
	cells: Cells = $state([[defaultCell]]);
	definitions: Definitions = $state({ horizontal: [], vertical: [] });
	workInProgress: boolean = $derived(!Object.is(this.cells, [[defaultCell]]));

	constructor(
		horizontal: number,
		vertical: number,
		id: number = -1,
		cells: DbCells = [],
		definitions: DbDefinitions = []
	) {
		this.id = id;
		this.horizontal = horizontal;
		this.vertical = vertical;
		this.cells = this.createGrid(horizontal, vertical, cells);
		if (!cells.length) this.computeGridNumbers();
		if (definitions.length) this.createDefinitions(definitions);
	}

	createGrid(horizontal: number, vertical: number, cells: DbCells | []): Cells {
		const formattedCells: DbCells =
			cells.length === horizontal * vertical
				? cells
				: Array(horizontal * vertical).fill(defaultCell);

		return Array(vertical)
			.fill(null)
			.map((_: null, rowIndex) =>
				Array(horizontal)
					.fill(null)
					.map((_: null, colIndex) => formattedCells[rowIndex * horizontal + colIndex])
			);
	}

	createDefinitions(definitions: DbDefinitions) {
		definitions.forEach((definition) => {
			definition.direction === 'horizontal'
				? this.definitions.horizontal.push(definition)
				: this.definitions.vertical.push(definition);
		});
	}

	computeGridNumbers = (): void => {
		let sequenceNumber = 1;

		this.cells.forEach((row) => row.forEach((cell) => (cell.number = null)));
		this.definitions = { horizontal: [], vertical: [] };

		for (let row = 0; row < this.vertical; row++) {
			for (let col = 0; col < this.horizontal; col++) {
				if (this.cells[row][col].black) continue;
				if (this.isWordStart(row, col, sequenceNumber)) {
					this.cells[row][col].number = sequenceNumber;
					sequenceNumber++;
				}
			}
		}
		// TODO MOVE AWAY
		this.persistToLocalStorage();
	};

	private isWordStart(row: number, col: number, sequenceNumber: number): boolean {
		const isHorizontalStart: boolean = this._isHorizontalWordStart(row, col);
		const isVerticalStart: boolean = this._isVerticalWordStart(row, col);
		if (isHorizontalStart) this.addHorizontalDefinition(sequenceNumber);
		if (isVerticalStart) this.addVerticalDefinition(sequenceNumber);
		return isHorizontalStart || isVerticalStart;
	}

	private addHorizontalDefinition(number: number): void {
		this.definitions.horizontal.push({ number: number, text: null, direction: 'horizontal' });
	}

	private addVerticalDefinition(number: number): void {
		this.definitions.vertical.push({ number: number, text: null, direction: 'vertical' });
	}

	private _isHorizontalWordStart(row: number, col: number): boolean {
		const isLeftEdge: boolean = col === 0;
		const isRightEdge: boolean = col === this.horizontal - 1;
		const previousCellIsBlack: boolean = col > 0 ? this.cells[row][col - 1].black : false;
		const nextCellIsBlack: boolean =
			col < this.horizontal - 1 ? this.cells[row][col + 1].black : false;
		return (isLeftEdge || previousCellIsBlack) && !isRightEdge && !nextCellIsBlack;
	}

	private _isVerticalWordStart(row: number, col: number): boolean {
		const isTopEdge: boolean = row === 0;
		const isBottomEdge: boolean = row === this.vertical - 1;
		const previousCellIsBlack: boolean = row > 0 ? this.cells[row - 1][col].black : false;
		const nextCellIsBlack: boolean =
			row < this.vertical - 1 ? this.cells[row + 1][col].black : false;
		return (isTopEdge || previousCellIsBlack) && !isBottomEdge && !nextCellIsBlack;
	}

	private persistToLocalStorage() {
		localStorage.setItem('id', JSON.stringify(this.id));
		localStorage.setItem('horizontal', JSON.stringify(this.horizontal));
		localStorage.setItem('vertical', JSON.stringify(this.vertical));
		localStorage.setItem('cells', JSON.stringify(this.cells));
		localStorage.setItem('definitions', JSON.stringify(this.definitions));
	}

	saveToDb = async () => {
		const finalCrossword = {
			horizontal: this.horizontal,
			vertical: this.vertical,
			cells: this.cells,
			definitions: this.definitions
		};
		const response = await fetch('/api/create', {
			method: 'POST',
			body: JSON.stringify(finalCrossword),
			headers: {
				'content-type': 'application/json'
			}
		});
		return await response.json();
	};
}
