using Backend.DTOs;
using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // --- 5.1. Ukaktualniona metoda GetAll ---
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskReadDto>>> GetAll()
        {
            var tasks = await _taskService.GetAllTasksAsync();

            var taskDtos = tasks.Select(t => new TaskReadDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted
            });

            return Ok(taskDtos);
        }

        // --- 5.1. Ukaktualniona metoda GetById ---
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskReadDto>> GetById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            var taskDto = new TaskReadDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted
            };

            return Ok(taskDto);
        }

        [HttpPost]
        public async Task<ActionResult<TaskReadDto>> Create([FromBody] TaskDto newTask)
        {
            // Serwis tworzy zadanie i zwraca obiekt, który MA już nadane ID z bazy
            var createdTask = await _taskService.CreateTaskAsync(newTask);

            // Mapujemy wynik na ReadDto, aby zachować spójność API
            var taskReadDto = new TaskReadDto
            {
                Id = createdTask.Id, // Tutaj ID pochodzi z bazy/serwisu, nie z wejściowego DTO
                Title = createdTask.Title,
                Description = createdTask.Description,
                IsCompleted = createdTask.IsCompleted
            };

            return CreatedAtAction(nameof(GetById), new { id = taskReadDto.Id }, taskReadDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskDto updatedTask)
        {
            var success = await _taskService.UpdateTaskAsync(id, updatedTask);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _taskService.DeleteTaskAsync(id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}