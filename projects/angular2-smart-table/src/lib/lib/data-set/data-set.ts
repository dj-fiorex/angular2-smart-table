import {Row} from './row';
import {Column} from './column';

export class DataSet {

  newRow!: Row;

  protected data: Array<Row> = [];
  protected columns: Array<Column> = [];
  protected rows: Array<Row> = [];
  protected selectedRow?: Row;
  protected expandedRow?: Row;
  protected willSelect: string = '';

  constructor(data: Array<any> = [], protected columnSettings: Object) {
    this.createColumns(columnSettings);
    this.setData(data);

    this.createNewRow();
  }

  setData(data: Array<any>, selectedRows: Array<any> = []) {
    this.data = data.map((el, index) => {
      const row = new Row(index, el, this);
      row.isSelected = selectedRows.indexOf(el) > -1;
      return row;
    });
    this.createRows();
  }

  getColumns(): Array<Column> {
    return this.columns;
  }

  getExpandedRow(): Row {
    if (!this.expandedRow) {
      console.warn('Expanded row not found');
      throw new Error('Expanded row not found');
    }
    return this.expandedRow;
  }

  getSelectedRow(): Row {
    if (!this.selectedRow) {
      console.warn('Selected row not found');
      throw new Error('Selected row not found');
    }
    return this.selectedRow;
  }

  getRows(): Array<Row> {
    return this.rows ?? [];
  }

  getFirstRow(): Row {
    return this.rows[0];
  }

  getLastRow(): Row {
    return this.rows[this.rows.length - 1];
  }

  findRowByData(data: any): Row {
    const row = this.rows.find((row: Row) => row.getData() === data);
    if (!row) {
      console.warn('Data row not found', data);
      throw new Error('Row not found');
    }
    return row;
  }

  deselectAll() {
    this.rows.forEach((row) => {
      row.isSelected = false;
    });
    // we need to clear selectedRow field because no one row selected
    this.selectedRow = undefined;
  }

  clearExpandAll() {
    this.rows.forEach((row) => {
      row.isExpanded = false;
    });
    // we need to clear selectedRow field because no one row selected
    this.expandedRow = undefined;
  }

  selectRow(row: Row): void {
    const previousIsSelected = row.isSelected;
    this.deselectAll();

    row.isSelected = !previousIsSelected;
    this.selectedRow = row;
  }

  multipleSelectRow(row: Row): void {
    row.isSelected = !row.isSelected;
    this.selectedRow = row;
  }

  expandRow(row: Row): Row {
    const previousIsExpanded = row.isExpanded;
    this.clearExpandAll();
    if (row.index !== this.expandedRow?.index) {
      this.expandedRow = undefined;
    }
    row.isExpanded = !previousIsExpanded;
    this.expandedRow = row;
    return this.expandedRow;
  }

  selectPreviousRow(): Row {
    if (this.rows.length > 0) {
      let index = this.selectedRow ? this.selectedRow.index : 0;
      if (index > this.rows.length - 1) {
        index = this.rows.length - 1;
      }
      this.selectRow(this.rows[index]);
      return this.getSelectedRow();
    }
    throw new Error('There are no rows inside the data table');
  }

  selectFirstRow(): Row {
    if (this.rows.length > 0) {
      this.selectRow(this.rows[0]);
      return this.getSelectedRow();
    }
    throw new Error('There are no rows inside the data table');
  }

  selectLastRow(): Row {
    if (this.rows.length > 0) {
      this.selectRow(this.rows[this.rows.length - 1]);
      return this.getSelectedRow();
    }
    throw new Error('There are no rows inside the data table');
  }

  selectRowByIndex(index?: number): void {
    const rowsLength: number = this.rows.length;
    if (rowsLength === 0) {
      throw new Error('There are no rows inside the data table');
    }
    if (!index) {
      this.selectFirstRow();
    } else if (index > 0 && index < rowsLength) {
      this.selectRow(this.rows[index]);
    } else
      // we need to deselect all rows if we got an incorrect index
      this.deselectAll();
  }

  willSelectFirstRow() {
    this.willSelect = 'first';
  }

  willSelectLastRow() {
    this.willSelect = 'last';
  }

  select(selectedRowIndex?: number): Row | null {
    if (this.getRows().length === 0) {
      throw new Error('There are no rows inside the data table');
    }
    if (this.willSelect) {
      if (this.willSelect === 'first') {
        this.selectFirstRow();
      }
      if (this.willSelect === 'last') {
        this.selectLastRow();
      }
      this.willSelect = '';
    } else {
      this.selectRowByIndex(selectedRowIndex);
    }

    return this.selectedRow ?? null;
  }

  createNewRow() {
    this.newRow = new Row(-1, {}, this);
    this.newRow.isInEditing = true;
  }

  /**
   * Create columns by mapping from the settings
   * @param settings
   * @private
   */
  createColumns(settings: any) {
    for (const id in settings) {
      if (settings.hasOwnProperty(id)) {
        this.columns.push(new Column(id, settings[id], this));
      }
    }
  }

  /**
   * Create rows based on current data prepared in data source
   * @private
   */
  createRows() {
    this.rows = [];
    this.data.forEach((el) => {
      this.rows.push(el);
    });
  }
}
