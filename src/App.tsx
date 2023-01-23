import { useState } from 'react';
import './App.css';

function App() {
	const [count, setCount] = useState(0);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [history, setHistory] = useState<{ title: string; content: string }[]>(
		[]
	);
	const [future, setFuture] = useState<{ title: string; content: string }[]>(
		[]
	);
	const [notes, setNotes] = useState<
		{
			title: string;
			content: string;
		}[]
	>([]);
	const [selectedNote, setSelectedNote] = useState(null);

	console.log('title', title);
	console.log('content', content);

	console.log('count outside timeout', count);
	const handleClick = () => {
		setCount(count + 1);
		setTimeout(() => {
			console.log('count inside timeout', count);
			setCount(count + 1);
		}, 3000);
	};

	return (
		<>
			<div>
				<h1>Count: {count}</h1>
				<button onClick={handleClick}>increment</button>
			</div>
			<br />
			<hr />

			<div>
				<h1>Note Editor</h1>
				<label htmlFor="title">Title</label>
			</div>
			<div>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
						setHistory((prevHistory) => [{ title, content }, ...prevHistory]);
					}}
				/>
			</div>
			<br />
			<label htmlFor="content">Content</label>
			<div>
				<textarea
					name="content"
					id="content"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
						setHistory((prevHistory) => [{ title, content }, ...prevHistory]);
					}}
				></textarea>
			</div>
			<br />
			<div>
				<button
					disabled={!history.length}
					onClick={() => {
						const prevNote = history[0];
						if (prevNote) {
							setTitle(prevNote.title);
							setContent(prevNote.content);
							setHistory((prevHistory) => prevHistory.slice(1));
							setFuture((prevFuture) => [prevNote, ...prevFuture]);
						}
					}}
				>
					Undo
				</button>
				<button
					disabled={!future.length}
					onClick={() => {
						const prevNote = future[0];
						if (prevNote) {
							setTitle(prevNote.title);
							setContent(prevNote.content);
							setFuture((prevFuture) => prevFuture.slice(1));
							setHistory((prevHistory) => [prevNote, ...prevHistory]);
						}
					}}
				>
					Redo
				</button>
				<button
					disabled={!title}
					onClick={() => {
						setTitle('');
						setContent('');
						setFuture([]);
						setHistory([]);
						if (selectedNote) {
							setNotes((prevNotes) =>
								prevNotes.map((item) => {
									if (item.id === selectedNote.id) {
										return { ...item, title, content };
									}
									return item;
								})
							);
							setSelectedNote(null);
						} else {
							setNotes((prevNotes) => [
								{ id: Date.now(), title, content },
								...prevNotes,
							]);
						}
					}}
				>
					Save
				</button>
			</div>
			<br />
			<hr />
			<div>
				<h1>Note List</h1>
				{notes.map((note, index) => (
					<div key={index}>
						<h2>{note.title}</h2>
						<p>{(note.content || '').slice(0, 40)}</p>
						<button
							onClick={() => {
								setSelectedNote(note);
								setTitle(note.title);
								setContent(note.content);
							}}
						>
							Edit
						</button>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
