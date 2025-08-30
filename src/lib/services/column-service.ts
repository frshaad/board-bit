import { columnRepo } from '../repository';
import { type Column } from '../schema/column';
import { deleteAllTasksOfColumn } from './helpers';

export const columnService = {
  async getColumns(): Promise<Column[]> {
    return columnRepo.getAll();
  },

  async getColumnById(columnId: string): Promise<Column | undefined> {
    return columnRepo.getById(columnId);
  },

  async getColumnsForBoard(boardId: string): Promise<Column[]> {
    const allColumns = await this.getColumns();
    return allColumns.filter((col) => col.boardId === boardId);
  },

  async createColumn(column: Column): Promise<void> {
    await columnRepo.create(column);
  },

  async updateColumn(column: Column): Promise<void> {
    await columnRepo.update(column.id, column);
  },

  async deleteColumn(columnId: string): Promise<void> {
    await deleteAllTasksOfColumn(columnId);
    await columnRepo.delete(columnId);
  },
};
