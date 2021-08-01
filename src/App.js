import "./App.css";

import axios from "axios";

//import components
import Header from "./components/Header";
// import Signup from "./containers/Signup";
// import Login from "./containers/Login";
import ModalRegister from "./components/ModalRegister";
import ModalLogin from "./components/ModalLogin";

//import from react-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";

import { useState, useEffect } from "react";

import Coockies from "js-cookie";

// import and add font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Coockies.get("token") || null);
  const [queries, setQueries] = useState(["", "price-asc"]);
  const [prices, setPrices] = useState([10, 100]);
  const [numItems, setNumItems] = useState(5);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL_API}/offers?limit=${numItems}&page=${page}&title=${queries[0]}&sort=${queries[1]}&priceMin=${prices[0]}&priceMax=${prices[1]}`
        );
        setData(response.data);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [
    queries,
    setQueries,
    numItems,
    setNumItems,
    page,
    setPage,
    prices,
    setPrices,
  ]);

  const setUser = (token) => {
    if (token) {
      Coockies.set("token", token, { expires: 1 });
      setToken(token);
    } else {
      Coockies.remove("token");
      setToken(null);
    }
  };

  const selectEntries = () => {
    const tab = [];
    for (let i = 5; i <= count; i++) {
      tab.push(i);
    }
    return tab;
  };

  let numPages;

  if (!isLoading) {
    numPages = Math.ceil(count / numItems);
  }

  console.log(
    "title : " +
      queries[0] +
      " page : " +
      page +
      " numItems : " +
      numItems +
      " count : " +
      count +
      " sort : " +
      queries[1] +
      " priceMin : " +
      prices[0] +
      " priceMax : " +
      prices[1]
  );

  return (
    <div className="App">
      <Router>
        <Header
          token={token}
          setUser={setUser}
          setNumItems={setNumItems}
          queries={queries}
          setQueries={setQueries}
          setPage={setPage}
          prices={prices}
          setPrices={setPrices}
          setModalLogin={setModalLogin}
          setModalRegister={setModalRegister}
        />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          {/* <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route> */}
          <Route path="/">
            <Home
              data={data}
              isLoading={isLoading}
              count={count}
              setCount={setCount}
              numItems={numItems}
              setNumItems={setNumItems}
              page={page}
              setPage={setPage}
              selectEntries={selectEntries}
              numPages={numPages}
            />
          </Route>
        </Switch>
      </Router>
      {modalRegister && (
        <ModalRegister
          setModalRegister={setModalRegister}
          setModalLogin={setModalLogin}
          setUser={setUser}
        />
      )}
      {modalLogin && (
        <ModalLogin
          setModalLogin={setModalLogin}
          setModalRegister={setModalRegister}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default App;
