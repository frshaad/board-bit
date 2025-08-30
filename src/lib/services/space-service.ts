import { spaceRepo } from '../repository';
import { type Space } from '../schema/space';
import { deleteAllBoardsOfSpace } from './helpers';

export const spaceService = {
  async getSpaces(): Promise<Space[]> {
    return spaceRepo.getAll();
  },

  async getSpaceById(spaceId: string): Promise<Space | undefined> {
    return spaceRepo.getById(spaceId);
  },

  async createSpace(space: Space): Promise<void> {
    await spaceRepo.create(space);
  },

  async updateSpace(space: Space): Promise<void> {
    await spaceRepo.update(space.id, space);
  },

  async deleteSpace(spaceId: string): Promise<void> {
    await deleteAllBoardsOfSpace(spaceId);
    await spaceRepo.delete(spaceId);
  },
};
