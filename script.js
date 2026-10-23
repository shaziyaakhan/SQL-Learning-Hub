/* =====================================
   SQL CHALLENGES
===================================== */

const challenges = [

    {
        title: "1. Hello Database",
        difficulty: "BEGINNER",
        mission:
            "Write a SQL query that displays all columns from the students table.",
        hint:
            "Use SELECT followed by * and then FROM students.",
        answer: "select * from students",
        xp: 100
    },

    {
        title: "2. Find Students",
        difficulty: "BEGINNER",
        mission:
            "Find all students who are studying BCS. Display all their columns.",
        hint:
            "Use WHERE course = 'BCS'.",
        answer: "select * from students where course = 'bcs'",
        xp: 150
    },

    {
        title: "3. Sort It Out",
        difficulty: "BEGINNER",
        mission:
            "Display all students ordered by their marks from highest to lowest.",
        hint:
            "Use ORDER BY marks DESC.",
        answer: "select * from students order by marks desc",
        xp: 150
    },

    {
        title: "4. Count Them!",
        difficulty: "INTERMEDIATE",
        mission:
            "Find the total number of students in the students table.",
        hint:
            "Use COUNT(*) with SELECT.",
        answer: "select count(*) from students",
        xp: 200
    },

    {
        title: "5. Group Power",
        difficulty: "INTERMEDIATE",
        mission:
            "Find how many students are enrolled in each course.",
        hint:
            "Use COUNT(*) and GROUP BY course.",
        answer: "select course, count(*) from students group by course",
        xp: 250
    },

    {
        title: "6. SQL Master",
        difficulty: "ADVANCED",
        mission:
            "Join students with the courses table using course_id and display the student's name and course name.",
        hint:
            "Use INNER JOIN courses ON students.course_id = courses.id.",
        answer:
            "select students.name, courses.course_name from students inner join courses on students.course_id = courses.id",
        xp: 300
    }

];


/* =====================================
   GAME VARIABLES
===================================== */

let currentChallenge = 0;
let xp = 0;
let completed = [];


/* =====================================
   LOAD CHALLENGE
===================================== */

function loadChallenge(index) {

    currentChallenge = index;

    const challenge = challenges[index];

    document.getElementById("challengeTitle").innerText =
        challenge.title;

    document.getElementById("difficulty").innerText =
        challenge.difficulty;

    document.getElementById("mission").innerHTML =
        challenge.mission;

    document.getElementById("hint").style.display = "none";

    document.getElementById("output").style.display = "none";

    document.getElementById("nextBtn").style.display = "none";

    document.getElementById("sqlInput").value = "";

    document.querySelectorAll(".challenge").forEach((item, i) => {

        item.classList.remove("active");

        if (i === index) {
            item.classList.add("active");
        }

    });

}


/* =====================================
   SELECT CHALLENGE
===================================== */

function selectChallenge(index) {

    if (index > currentChallenge && !completed.includes(index)) {

        showError(
            "🔒 Challenge Locked",
            "Complete the previous challenge first.",
            "Finish Challenge " + currentChallenge + " before moving ahead."
        );

        return;
    }

    loadChallenge(index);
}


/* =====================================
   RUN QUERY
===================================== */

function runQuery() {

    let query =
        document.getElementById("sqlInput").value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/;$/, "");

    const expected = challenges[currentChallenge].answer;

    if (!query) {

        showError(
            "Empty Query",
            "You haven't entered any SQL code.",
            "Type a SQL query in the editor and click Run Query."
        );

        return;
    }


    /* COMMON SQL ERRORS */

    if (!query.startsWith("select")) {

        showError(
            "Syntax Error",
            "Your query must start with SELECT.",
            "Start your query with SELECT. Example: SELECT * FROM students;"
        );

        return;
    }


    if (query.includes("form students")) {

        showError(
            "Syntax Error: FORM",
            "SQL uses FROM, not FORM.",
            "Replace FORM with FROM."
        );

        return;
    }


    if (query.includes("student")) {

        if (!query.includes("students")) {

            showError(
                "Table Not Found",
                "The table name appears to be incorrect.",
                "The correct table name is students."
            );

            return;
        }
    }


    /* CHALLENGE 1 */

    if (currentChallenge === 0) {

        if (
            query === expected ||
            query === "select * from students;"
        ) {

            success();

        } else if (!query.includes("*")) {

            showError(
                "Incomplete SELECT",
                "Your query does not select all columns.",
                "Use SELECT * FROM students;"
            );

        } else {

            showError(
                "Incorrect Query",
                "The query doesn't match this mission.",
                "Try: SELECT * FROM students;"
            );
        }

        return;
    }


    /* CHALLENGE 2 */

    if (currentChallenge === 1) {

        if (
            query.includes("where") &&
            query.includes("course") &&
            query.includes("bcs")
        ) {

            success();

        } else if (!query.includes("where")) {

            showError(
                "Missing WHERE Clause",
                "You selected the students table but didn't filter it.",
                "Use WHERE to select only BCS students."
            );

        } else {

            showError(
                "Wrong Filter",
                "The WHERE condition doesn't select BCS students.",
                "Try: WHERE course = 'BCS'"
            );
        }

        return;
    }


    /* CHALLENGE 3 */

    if (currentChallenge === 2) {

        if (
            query.includes("order by") &&
            query.includes("marks") &&
            query.includes("desc")
        ) {

            success();

        } else if (!query.includes("order by")) {

            showError(
                "Missing ORDER BY",
                "The results need to be sorted.",
                "Add ORDER BY marks DESC."
            );

        } else if (!query.includes("desc")) {

            showError(
                "Wrong Sort Direction",
                "DESC is needed for highest-to-lowest marks.",
                "Use ORDER BY marks DESC."
            );

        } else {

            showError(
                "Incorrect Sorting",
                "You need to sort using the marks column.",
                "Use ORDER BY marks DESC."
            );
        }

        return;
    }


    /* CHALLENGE 4 */

    if (currentChallenge === 3) {

        if (
            query.includes("count") &&
            query.includes("students")
        ) {

            success();

        } else if (!query.includes("count")) {

            showError(
                "Missing COUNT",
                "You need to count the students.",
                "Use SELECT COUNT(*) FROM students;"
            );

        } else {

            showError(
                "Incorrect Query",
                "The COUNT function isn't being used correctly.",
                "Try: SELECT COUNT(*) FROM students;"
            );
        }

        return;
    }


    /* CHALLENGE 5 */

    if (currentChallenge === 4) {

        if (
            query.includes("count") &&
            query.includes("group by") &&
            query.includes("course")
        ) {

            success();

        } else if (!query.includes("group by")) {

            showError(
                "Missing GROUP BY",
                "You need to create a group for each course.",
                "Add GROUP BY course."
            );

        } else if (!query.includes("count")) {

            showError(
                "Missing COUNT",
                "You need to count students in every course.",
                "Use COUNT(*) along with GROUP BY."
            );

        } else {

            showError(
                "Incorrect Query",
                "Check your COUNT and GROUP BY clauses.",
                "Try: SELECT course, COUNT(*) FROM students GROUP BY course;"
            );
        }

        return;
    }


    /* CHALLENGE 6 */

    if (currentChallenge === 5) {

        if (
            query.includes("join") &&
            query.includes("courses") &&
            query.includes("course_id")
        ) {

            success();

        } else if (!query.includes("join")) {

            showError(
                "Missing JOIN",
                "This challenge requires combining two tables.",
                "Use INNER JOIN courses."
            );

        } else {

            showError(
                "JOIN Condition Error",
                "The tables aren't being connected correctly.",
                "Use ON students.course_id = courses.id."
            );
        }

        return;
    }

}


/* =====================================
   SUCCESS
===================================== */

function success() {

    const output = document.getElementById("output");

    output.className = "output success";

    output.innerHTML = `
        <strong>🎉 Correct!</strong><br><br>
        Great job! You solved this SQL challenge.
        <br><br>
        ⭐ +${challenges[currentChallenge].xp} XP
    `;

    output.style.display = "block";

    if (!completed.includes(currentChallenge)) {

        completed.push(currentChallenge);

        xp += challenges[currentChallenge].xp;

        document.getElementById("xp").innerText = xp;

        document.getElementById("completedCount").innerText =
            completed.length;

        document.getElementById("progressText").innerText =
            completed.length + " / " + challenges.length;

        document.getElementById("progressFill").style.width =
            (completed.length / challenges.length * 100) + "%";

        document
            .getElementById("challenge-" + currentChallenge)
            .classList.add("completed");

    }


    document.getElementById("nextBtn").style.display = "inline-block";


    /* UNLOCK NEXT CHALLENGE */

    if (currentChallenge + 1 < challenges.length) {

        document
            .getElementById("challenge-" + (currentChallenge + 1))
            .classList.remove("locked");

    } else {

        setTimeout(showCompletion, 800);

    }

}


/* =====================================
   ERROR SYSTEM
===================================== */

function showError(title, message, solution) {

    const output = document.getElementById("output");

    output.className = "output error";

    output.innerHTML = `
        <div class="error-title">❌ ${title}</div>

        <div>${message}</div>

        <div class="solution">
            <strong>💡 How to fix it:</strong><br>
            ${solution}
        </div>
    `;

    output.style.display = "block";

    document.getElementById("nextBtn").style.display = "none";
}


/* =====================================
   HINT
===================================== */

function showHint() {

    const hint = document.getElementById("hint");

    hint.innerHTML =
        "💡 <strong>Hint:</strong> " +
        challenges[currentChallenge].hint;

    hint.style.display = "block";
}


/* =====================================
   NEXT CHALLENGE
===================================== */

function nextChallenge() {

    if (currentChallenge + 1 < challenges.length) {

        loadChallenge(currentChallenge + 1);

    } else {

        showCompletion();

    }

}


/* =====================================
   COMPLETION
===================================== */

function showCompletion() {

    document.getElementById("completion").style.display =
        "block";

    document.getElementById("finalXP").innerText =
        xp;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


/* =====================================
   RESTART
===================================== */

function restartGame() {

    currentChallenge = 0;
    xp = 0;
    completed = [];

    document.getElementById("xp").innerText = "0";
    document.getElementById("completedCount").innerText = "0";

    document.getElementById("progressText").innerText =
        "0 / " + challenges.length;

    document.getElementById("progressFill").style.width = "0%";

    document.getElementById("completion").style.display =
        "none";


    document.querySelectorAll(".challenge").forEach((item, i) => {

        item.classList.remove("completed");

        if (i > 0) {
            item.classList.add("locked");
        }

    });

    loadChallenge(0);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}