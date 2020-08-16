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
			notes.push({
				title,
				content,
				tags,
				createdAt: new Date().toJSON(),
			});
		}
	});
}
