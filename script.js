const MONTHS = [
    { name: "january", synonym: "Январь", season: "winter" },
    { name: "february", synonym: "Февраль", season: "winter" },
    { name: "march", synonym: "Март", season: "spring" },
    { name: "april", synonym: "Апрель", season: "spring" },
    { name: "may", synonym: "Май", season: "spring" },
    { name: "june", synonym: "Июнь", season: "summer" },
    { name: "july", synonym: "Июль", season: "summer" },
    { name: "august", synonym: "Август", season: "summer" },
    { name: "september", synonym: "Сентябрь", season: "autumn" },
    { name: "october", synonym: "Октябрь", season: "autumn" },
    { name: "november", synonym: "Ноябрь", season: "autumn" },
    { name: "december", synonym: "Декабрь", season: "winter" }
];

let tableBody;

document.addEventListener("DOMContentLoaded", () => {
    tableBody = document.getElementById("table-body");
    const completeTaskButton = document.getElementById("complete-task");
    completeTaskButton.addEventListener("click", checkAnswers);

    initialize();
});

function initialize() {
    tableBody.innerHTML = "";
    const rowCount = getRandomInt(3, 5);
    const selectedMonths = getRandomMonths(rowCount);

    selectedMonths.forEach(month => {
        const row = createTableRow(month);
        tableBody.insertAdjacentElement("beforeend", row);
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomMonths(count) {
    const shuffledMonths = [...MONTHS].sort(() => 0.5 - Math.random());
    return shuffledMonths.slice(0, count);
}

function createTableRow(month) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${month.synonym}</td>
        <td><input type="radio" name="${month.name}" value="winter"></td>
        <td><input type="radio" name="${month.name}" value="spring"></td>
        <td><input type="radio" name="${month.name}" value="summer"></td>
        <td><input type="radio" name="${month.name}" value="autumn"></td>
    `;
    return row;
}

function checkAnswers() {
    let correctCount = 0;
    const rows = document.querySelectorAll("#table-body tr");

    rows.forEach(row => {
        const monthSynonym = row.cells[0].textContent;
        const monthName = MONTHS.find((month) => month.synonym === monthSynonym).name;
        const correctAnswer = MONTHS.find((month) => month.synonym === monthSynonym).season;

        const selectedOption = row.querySelector(`input[name="${monthName}"]:checked`);

        if (selectedOption && selectedOption.value === correctAnswer) {
            correctCount++;
        }
    });

    alert(`${correctCount} из ${rows.length}`);
    if (confirm("Перезагрузить задание?")) {
        initialize();
    }
}
