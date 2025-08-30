import { boardRepo, columnRepo, taskRepo } from '../repository';

export async function deleteAllTasksOfColumn(columnId: string): Promise<void> {
  const tasks = await taskRepo.getAll();
  const relatedTasks = tasks.filter((task) => task.columnId === columnId);
  for (const task of relatedTasks) {
    await taskRepo.delete(task.id);
  }
}

export async function deleteAllColumnsOfBoard(boardId: string) {
  const columns = await columnRepo.getAll();
  const relatedColumns = columns.filter((column) => column.boardId === boardId);

  for (const column of relatedColumns) {
    await deleteAllTasksOfColumn(column.id);
    await columnRepo.delete(column.id);
  }
}

export async function deleteAllBoardsOfSpace(spaceId: string) {
  const boards = await boardRepo.getAll();
  const relatedBoards = boards.filter((board) => board.spaceId === spaceId);

  for (const board of relatedBoards) {
    await deleteAllColumnsOfBoard(board.id);
    await boardRepo.delete(board.id);
  }
}
