const addNoteForm = document.querySelector("#add-note-form");
// To store all notes
let notes = [];
if (addNoteForm) {
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
				id: Date.now(),
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

			const head = document.createElement("header");
			const foot = document.createElement("footer");
			const article = document.createElement("article");

			const title = document.createElement("div");
			const date = document.createElement("div");
			const content = document.createElement("div");
			const btnEdit = document.createElement("button");

			title.classList.add("title");
			date.classList.add("date");
			content.classList.add("content");
			btnEdit.classList.add("editNote");
			btnEdit.setAttribute("data-note", e.detail.newNote.id);

			title.textContent = e.detail.newNote.title;
			date.textContent = e.detail.newNote.createdAt;
			content.textContent = e.detail.newNote.content;
			btnEdit.textContent = "Edit";

			foot.append(date);
			head.append(title);
			head.append(btnEdit);
			article.append(content);

			li.append(head);
			li.append(article);
			li.append(foot);

			list.append(li);

			li.id = e.detail.newNote.id;
			li.classList.add("note-item", "magictime", "boingInUp");
			document.dispatchEvent(
				new CustomEvent("noteListItemAdded", { detail: { li, notes } })
			);
		}
	});
}

document.addEventListener("noteListItemAdded", (event) => {
	document.querySelectorAll(".editNote").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			const note = notes.filter(
				(note) => note.id === parseInt(btn.parentNode.parentNode.id)
			);
			if (note) {
				addNoteForm.querySelector("#title").value = note[0].title;
				addNoteForm.querySelector("#content").value = note[0].content;
			}
		});
	});
});
