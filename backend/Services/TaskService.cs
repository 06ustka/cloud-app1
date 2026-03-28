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

        // Metoda zwraca listę modeli TaskItem, które kontroler zmapuje na TaskReadDto
        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _repository.GetAllAsync();
        }

        // Metoda zwraca pojedynczy model TaskItem
        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        // Metoda przyjmuje TaskDto (dane wejściowe) i zwraca TaskItem (z nadanym przez bazę Id)
        public async Task<TaskItem> CreateTaskAsync(TaskDto taskDto)
        {
            var task = new TaskItem
            {
                Title = taskDto.Title,
                Description = taskDto.Description, // Pamiętaj o Description!
                IsCompleted = taskDto.IsCompleted
            };

            return await _repository.AddAsync(task);
        }

        public async Task<bool> UpdateTaskAsync(int id, TaskDto taskDto)
        {
            var existingTask = await _repository.GetByIdAsync(id);
            if (existingTask == null) return false;

            existingTask.Title = taskDto.Title;
            existingTask.Description = taskDto.Description;
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