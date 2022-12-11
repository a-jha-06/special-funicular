import React, { useState } from "react";
import axios from "axios";
import AdminLogin from "./components/Admin/AdminLogin";
import UserLogin from "./components/User/UserLogin";
import Home from "./components/home/Home";
import Search from "./components/Search";
import Results from "./components/Results";
import Detail from "./components/Detail";
import "./App.css";
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

<Router>
        <Header searchFunction={searchFunction} />
        <Routes>
          {account.email && account.userType === "Admin" ? (
            <Route path="/admin/login" element={<AdminLogin />} exact />
          ) : (
            <Route path="/" element={<Home />} exact />
          )}

          {account.email && account.userType === "User" ? (
            <Route path="/user/login" element={<UserLogin />} exact />
          ) : (
            <Route path="/" element={<Home />} exact />
          )}
        </Routes>
      </Router>

	</div>
);
}

export default App;

