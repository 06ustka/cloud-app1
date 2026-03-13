using Backend.DTOs;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            var tasks = await _repository.GetAllAsync();
            return tasks.Select(t => new TaskDto { Id = t.Id, Title = t.Title, IsCompleted = t.IsCompleted });
        }

        public async Task<TaskDto?> GetTaskByIdAsync(int id)
        {
            var task = await _repository.GetByIdAsync(id);
            if (task == null) return null;
            return new TaskDto { Id = task.Id, Title = task.Title, IsCompleted = task.IsCompleted };
        }

        public async Task<TaskDto> CreateTaskAsync(TaskDto taskDto)
        {
            var task = new TaskItem { Title = taskDto.Title, IsCompleted = taskDto.IsCompleted };
            var createdTask = await _repository.AddAsync(task);
            taskDto.Id = createdTask.Id;
            return taskDto;
        }

        public async Task<bool> UpdateTaskAsync(int id, TaskDto taskDto)
        {
            var existingTask = await _repository.GetByIdAsync(id);
            if (existingTask == null) return false;

            existingTask.Title = taskDto.Title;
            existingTask.IsCompleted = taskDto.IsCompleted;

            await _repository.UpdateAsync(existingTask);
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var existingTask = await _repository.GetByIdAsync(id);
            if (existingTask == null) return false;

            await _repository.DeleteAsync(existingTask);
            return true;
        }
    }
}