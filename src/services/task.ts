import ITask from '../types/task';
import axios from 'axios';

class TaskService {
  getTasks() {
    return axios.get<ITask[]>('/api/tasks');
  }

  getTask(id: string) {
    return axios.get(`/api/tasks/${id}`);
  }

  createTask(data: ITask) {
    return axios.post('/api/tasks', data);
  }

  updateTask(data: ITask, id: any) {
    return axios.put(`/api/tasks/${id}`, data);
  }

  deleteTask(id: any) {
    return axios.delete(`/api/tasks/${id}`);
  }
}

export default new TaskService();
