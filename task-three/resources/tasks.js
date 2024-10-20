// Initial Tasks
const defaultTaskList = [
    { "text": "Get an haircut", "completed": false }, 
    { "text": "Buy Groceries", "completed": true }, 
    { "text": "Book tickets for movie", "completed": false }
]

// Function to load the todo items from localStorage
function loadTodoItems() {
    const todoList = document.getElementById("tasks-list");
    const savedTodos = JSON.parse(localStorage.getItem("tasks")) || defaultTaskList;

    savedTodos.forEach(todo => {
        const newTodoItem = createTodoItem(todo.text, todo.completed);
        todoList.appendChild(newTodoItem);
    });
}

// Function to create a new todo item
function createTodoItem(taskText, isCompleted = false) {
    const newTodoItem = document.createElement("li");
    newTodoItem.classList.add("todo-item");
    if (isCompleted) {
        newTodoItem.classList.add("completed");
    }

    // Task description
    const taskDescription = document.createElement("p");
    taskDescription.textContent = taskText;

    // Complete Task Button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => {
        newTodoItem.classList.toggle("completed");
        saveTodoItems(); // Update localStorage
    });

    // Delete Task Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        newTodoItem.remove();
        saveTodoItems(); // Update localStorage
    });

    const buttonSection = document.createElement("div");
    buttonSection.classList.add("todo-actions")
    buttonSection.appendChild(completeBtn);
    buttonSection.appendChild(deleteBtn);

    // Append task text, complete button, and delete button to the new todo item
    newTodoItem.appendChild(taskDescription);
    newTodoItem.appendChild(buttonSection);

    return newTodoItem;
}

// Function to save the todo items to localStorage
function saveTodoItems() {
    const todoItems = document.querySelectorAll(".todo-item");
    const tasks = [];

    todoItems.forEach(item => {
        const taskText = item.querySelector("p").textContent;
        const completed = item.classList.contains("completed");
        tasks.push({ text: taskText, completed: completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new todo item
function addTodoItem() {
    const todoInput = document.getElementById("tasks-input");
    const todoList = document.getElementById("tasks-list");

    if (todoInput.value.trim() !== "") {
        const newTodoItem = createTodoItem(todoInput.value);
        todoList.appendChild(newTodoItem);
        saveTodoItems(); // Save new task to localStorage
        todoInput.value = ""; // Clear input field
    }
}

// Add event listener to "Add Task" button
document.getElementById("add-todo-btn").addEventListener("click", addTodoItem);

// Load todo items when the page is loaded
window.addEventListener("load", loadTodoItems);
