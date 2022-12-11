import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import Detail from "./components/Detail";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
function App() {
const [state, setState] = useState({
	s: "sherlock",
	results: [],
	selected: {},
});

const apiurl = "https://www.omdbapi.com/?apikey=a2526df0";

const searchInput = (e) => {
	let s = e.target.value;

	setState((prevState) => {
	return { ...prevState, s: s };
	});
};

const search = (e) => {
	if (e.key === "Enter") {
	axios(apiurl + "&s=" + state.s).then(({ data }) => {
		let results = data.Search;

		console.log(results);

		setState((prevState) => {
		return { ...prevState, results: results };
		});
	});
	}
};

const openDetail = (id) => {
	axios(apiurl + "&i=" + id).then(({ data }) => {
	let result = data;

	setState((prevState) => {
		return { ...prevState, selected: result };
	});
	});
};

const closeDetail = () => {
	setState((prevState) => {
	return { ...prevState, selected: {} };
	});
};
<BrowserRouter>
        <Routes>
          <Route path="/">
          <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            
            <Route path="taxi">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Taxi" />}
              />
            </Route>
	</BrowserRouter>
return (
	<div className="App">
	<header className="App-header">
		<h1>Movie Mania</h1>
	</header>
	
	<main>
		<Search searchInput={searchInput} search={search} />

		<Results results={state.results} openDetail={openDetail} />

		{typeof state.selected.Title != "undefined" ? (
		<Detail selected={state.selected} closeDetail={closeDetail} />
		) : (
		false
		)}
	</main>
	</div>
);
}

export default App;

