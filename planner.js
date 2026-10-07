// ===== 1. Get the elements from the HTML =====
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const charCounter = document.getElementById("charCounter");
const taskCount = document.getElementById("taskCount");

// ===== 2. Helper function: update the task count =====
function updateCount() {
    taskCount.textContent = "Tasks: " + taskList.children.length;
}

// ===== 3. Character counter =====
taskInput.addEventListener("input", function () {
    charCounter.textContent = taskInput.value.length + " / 50";
});

// ===== 4. Add Task button =====
addBtn.addEventListener("click", function () {

    // 4a. Read the inputs
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    // 4b. Validation
    if (taskText === "") {
        alert("Please write a task first!");
        return;
    }

    // 4c. Create the card
    const card = document.createElement("div");
    card.classList.add("task-card");
    card.classList.add("priority-" + priority);

    // 4d. The task text
    const textElement = document.createElement("span");
    textElement.classList.add("task-text");
    textElement.textContent = taskText;
    card.appendChild(textElement);

    // 4e. The footer (time + delete button)
    const footer = document.createElement("div");
    footer.classList.add("task-footer");

    const time = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
    const timeElement = document.createElement("span");
    timeElement.classList.add("task-time");
    timeElement.textContent = "Added at " + time;
    footer.appendChild(timeElement);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "✕";
    footer.appendChild(deleteBtn);

    card.appendChild(footer);

    // 4f. Delete the task when ✕ is clicked
    deleteBtn.addEventListener("click", function () {
        card.remove();
        updateCount();
    });

    // 4g. Mark as done / not done on double-click
    card.addEventListener("dblclick", function () {
        card.classList.toggle("done");
    });

    // 4h. Put the card on the list
    taskList.appendChild(card);
    updateCount();

    // 4i. Reset the input and the counter
    taskInput.value = "";
    charCounter.textContent = "0 / 50";
});