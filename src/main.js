const addNoteForm = document.querySelector("#add-note-form");
if (addNoteForm) {
	// To store all notes
	let notes = [];

	// On add a note form submit
	addNoteForm.addEventListener("submit", (e) => {
		e.preventDefault();

		// Form data
		const title = addNoteForm.querySelector("#title").value;
		const content = addNoteForm.querySelector("#content").value;
		const tags = addNoteForm.querySelector("#tags").value;

		if (!title) {
			alert("title can not be empty");
		} else {
			const date = new Date();
			const newNote = {
				title,
				content,
				tags,
				createdAt: `${String(date.getDate()).padStart(2, "0")}.${String(
					date.getMonth() + 1
				).padStart(
					2,
					"0"
				)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
			};
			document.dispatchEvent(
				new CustomEvent("noteAdded", { detail: { newNote, prevNotes: notes } })
			);
			notes.push(newNote);

			// Empty the form fields
			addNoteForm.querySelector("#title").value = "";
			addNoteForm.querySelector("#content").value = "";
			addNoteForm.querySelector("#tags").value = "";
		}
	});

	// When notes is added
	document.addEventListener("noteAdded", (e) => {
		const list = document.querySelector("#notes-list");
		// Add notes to sidebar
		if (e.detail.newNote) {
			const li = document.createElement("li");
			const title = document.createElement("div");
			const date = document.createElement("div");
			title.classList.add("title");
			date.classList.add("date");
			title.textContent = e.detail.newNote.title;
			date.textContent = e.detail.newNote.createdAt;
			li.append(title);
			li.append(date);
			list.append(li);
			li.classList.add("note-item", "magictime", "boingInUp");
		}
	});
}
