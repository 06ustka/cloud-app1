using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();

        Task<TaskItem?> GetTaskByIdAsync(int id);

        Task<TaskItem> CreateTaskAsync(TaskDto taskDto);

        Task<bool> UpdateTaskAsync(int id, TaskDto taskDto);

        Task<bool> DeleteTaskAsync(int id);
    }
}