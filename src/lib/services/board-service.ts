import { boardRepo } from '../repository';
import { type Board } from '../schema/board';
import { deleteAllColumnsOfBoard } from './helpers';

export const boardService = {
  async getBoards(): Promise<Board[]> {
    return boardRepo.getAll();
  },

  async getBoardById(boardId: string): Promise<Board | undefined> {
    return boardRepo.getById(boardId);
  },

  async createBoard(board: Board): Promise<void> {
    await boardRepo.create(board);
  },

  async updateBoard(board: Board): Promise<void> {
    await boardRepo.update(board.id, board);
  },

  async deleteBoard(boardId: string): Promise<void> {
    await deleteAllColumnsOfBoard(boardId);
    await boardRepo.delete(boardId);
  },
};
