document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const positionInput = document.getElementById("positionInput");
    const taskInput = document.getElementById("taskInput");
    const urgencyInput = document.getElementById("urgencyInput");
    const addBtn = document.getElementById("addBtn");
    const deleteAllBtn = document.getElementById("deleteAllBtn");
    const taskTableBody = document.querySelector("#taskTable tbody");
    const dateInfo = document.getElementById("dateInfo");

    // Fungsi untuk menampilkan hari & tanggal
    function showDate() {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        const now = new Date();
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();

        dateInfo.textContent = `${dayName}, ${date} ${monthName} ${year}`;
    }

    showDate();

    // Event tombol tambah
    addBtn.addEventListener("click", addTask);

    function addTask() {
        const name = nameInput.value.trim();
        const position = positionInput.value.trim();
        const taskText = taskInput.value.trim();
        const urgency = urgencyInput.value;

        if (name === "" || position === "" || taskText === "" || urgency === "") {
            alert("Nama, Jabatan, Tugas, dan Urgensi wajib diisi!");
            return;
        }

        const row = document.createElement("tr");

        // Kolom checkbox
        const checkCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // Kolom nama
        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        // Kolom jabatan
        const positionCell = document.createElement("td");
        positionCell.textContent = position;

        // Kolom tugas
        const taskCell = document.createElement("td");
        taskCell.textContent = taskText;

        // Kolom urgensi
        const urgencyCell = document.createElement("td");
        urgencyCell.textContent = urgency;
        urgencyCell.classList.add(
            urgency === "Low" ? "urgency-low" :
            urgency === "Medium" ? "urgency-medium" : "urgency-high"
        );

        // Kolom status
        const statusCell = document.createElement("td");
        statusCell.textContent = "Sedang dikerjakan";
        statusCell.classList.add("status-progress");

        // Event checkbox untuk ubah status
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                row.classList.add("completed");
                statusCell.textContent = "Done";
                statusCell.classList.remove("status-progress");
                statusCell.classList.add("status-done");
            } else {
                row.classList.remove("completed");
                statusCell.textContent = "Sedang dikerjakan";
                statusCell.classList.remove("status-done");
                statusCell.classList.add("status-progress");
            }
        });
        checkCell.appendChild(checkbox);

        // Kolom tombol delete
        const actionCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            row.remove();
        });
        actionCell.appendChild(deleteBtn);

        // Susun baris
        row.appendChild(checkCell);
        row.appendChild(nameCell);
        row.appendChild(positionCell);
        row.appendChild(taskCell);
        row.appendChild(urgencyCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        taskTableBody.appendChild(row);

        // Reset input
        nameInput.value = "";
        positionInput.value = "";
        taskInput.value = "";
        urgencyInput.value = "";
    }

    // Event tombol Delete All
    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Yakin ingin menghapus semua data?")) {
            taskTableBody.innerHTML = "";
        }
    });
});