function App() {
	fetch("http://localhost:4001/get-deck")
		.then((res) => res.json())
		.then((data) => console.log(data));

	return (
		<div className="App">
			<p>Hello world!</p>
		</div>
	);
}

export default App;
