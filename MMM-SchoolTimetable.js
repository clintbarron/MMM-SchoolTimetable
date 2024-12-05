Module.register("MMM-SchoolTimetable", {
  defaults: {
    weekA: {
      Monday: ["Tutor", "Maths", "English", "Science", "History", "PE"],
      Tuesday: ["Tutor", "English", "Maths", "Art", "IT", "PE"],
      Wednesday: ["Tutor", "Science", "Maths", "History", "English", "Music"],
      Thursday: ["Tutor", "Geography", "Maths", "English", "IT", "Art"],
      Friday: ["Tutor", "PE", "History", "Maths", "English", "Science"],
    },
    weekB: {
      Monday: ["Tutor", "Geography", "Science", "Maths", "History", "Art"],
      Tuesday: ["Tutor", "Art", "English", "Science", "Maths", "PE"],
      Wednesday: ["Tutor", "History", "Music", "Maths", "English", "Geography"],
      Thursday: ["Tutor", "IT", "Science", "Maths", "English", "PE"],
      Friday: ["Tutor", "Maths", "English", "Art", "History", "Science"],
    },
    startDate: "2024-12-02", // Week A start date
  },

  getStyles: function () {
    return ["MMM-SchoolTimetable.css"];
  },

  getDom: function () {
    const wrapper = document.createElement("div");

    // Determine current week
    const currentDate = new Date();
    const startDate = new Date(this.config.startDate);
    const diffInDays = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const isWeekA = Math.floor(diffInDays / 7) % 2 === 0;

    // Determine today's lessons
    const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });
    const weekLessons = isWeekA ? this.config.weekA : this.config.weekB;
    const todayLessons = weekLessons[today];

    if (!todayLessons || today === "Saturday" || today === "Sunday") {
      wrapper.innerHTML = "No lessons today!";
      return wrapper;
    }

    // Build timetable for today
    const table = document.createElement("table");
    todayLessons.forEach((lesson, index) => {
      const row = document.createElement("tr");
      const lessonNumber = document.createElement("td");
      lessonNumber.innerHTML = `Lesson ${index + 1}`;
      const lessonName = document.createElement("td");
      lessonName.innerHTML = lesson;
      row.appendChild(lessonNumber);
      row.appendChild(lessonName);
      table.appendChild(row);
    });

    // Add a header for clarity
    const header = document.createElement("h2");
    header.innerHTML = `${today} - ${isWeekA ? "Week A" : "Week B"}`;
    wrapper.appendChild(header);

    wrapper.appendChild(table);
    return wrapper;
  },
});
