import { taskRepo } from '../repository';
import { type Task } from '../schema/task';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    return taskRepo.getAll();
  },

  async getTaskById(taskId: string): Promise<Task | undefined> {
    return taskRepo.getById(taskId);
  },

  async createTask(task: Task): Promise<void> {
    await taskRepo.create(task);
  },

  async updateTask(task: Task): Promise<void> {
    await taskRepo.update(task.id, task);
  },

  async deleteTask(taskId: string): Promise<void> {
    await taskRepo.delete(taskId);
  },
};
