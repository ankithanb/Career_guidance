window.onload = function () {
  fetch("get_goals.php")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("goalsContainer");
      if (data.length === 0) {
        container.innerHTML = "<p>No goals found.</p>";
        return;
      }

      data.forEach(goal => {
        const card = document.createElement("div");
        card.className = "goal-card";

        const completedBadge = goal.is_complete == 1
          ? '<span class="completed-label">Completed</span>'
          : '';

        card.innerHTML = `
          <h3>${goal.goal_title} ${completedBadge}</h3>
          <p>${goal.goal}</p>
          <p>Deadline: ${goal.deadline}</p>
          <p>Progress: ${goal.progress}%</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${goal.progress}%"></div>
          </div>
          <div class="goal-actions">
            <button class="update" onclick="updateProgress(${goal.id})">Update</button>
            <button class="complete" onclick="markComplete(${goal.id})">Complete</button>
            <button class="delete" onclick="deleteGoal(${goal.id})">Delete</button>
          </div>
        `;
        container.appendChild(card);
      });
    });
};

// You can define these functions or keep them empty for now
function updateProgress(id) {
  let progress = prompt("Enter new progress (0-100):");
  if (progress !== null) {
    fetch(`update_progress.php?id=${id}&progress=${progress}`).then(() => location.reload());
  }
}

function markComplete(id) {
  if (confirm("Mark this goal as complete?")) {
    fetch(`complete_goal.php?id=${id}`).then(() => location.reload());
  }
}

function deleteGoal(id) {
  if (confirm("Are you sure you want to delete this goal?")) {
    fetch(`delete_goal.php?id=${id}`).then(() => location.reload());
  }
}
