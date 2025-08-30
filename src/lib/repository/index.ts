import { type Board, boardSchema } from '../schema/board';
import { type Column, columnSchema } from '../schema/column';
import { type Space, spaceSchema } from '../schema/space';
import { type Task, taskSchema } from '../schema/task';
import { localStorageDriver } from '../storage/local-storage-driver';
import { Repository } from './class';

export const spaceRepo = new Repository<Space, typeof spaceSchema>(
  spaceSchema,
  localStorageDriver<Space>('kanban:spaces'),
);

export const boardRepo = new Repository<Board, typeof boardSchema>(
  boardSchema,
  localStorageDriver<Board>('kanban:boards'),
);

export const columnRepo = new Repository<Column, typeof columnSchema>(
  columnSchema,
  localStorageDriver<Column>('kanban:columns'),
);

export const taskRepo = new Repository<Task, typeof taskSchema>(
  taskSchema,
  localStorageDriver<Task>('kanban:tasks'),
);
