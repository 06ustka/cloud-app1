using Xunit;
using Backend.Models; // Używamy Twojego folderu z modelami

namespace TaskManager.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void NewTask_ShouldNotBeCompleted()
        {
            var task = new TaskItem { Title = "Przetestować bezpiecznik" };

            Assert.False(task.IsCompleted);
        }
    }
}