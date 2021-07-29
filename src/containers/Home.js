import "./Home.css";

import axios from "axios";

import { useEffect, useState } from "react";

//components
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import Pagination from "../components/Pagination";

const Home = () => {
  //useStates
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState([5, 1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL_API}/offers?limit=${pagination[0]}&page=${pagination[1]}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [pagination, setPagination]);

  const SelectEntries = () => {
    const tab = [];
    for (let i = 5; i <= data.count; i++) {
      tab.push(i);
    }
    return tab;
  };

  let numPages;

  if (!isLoading) {
    numPages = Math.ceil(data.count / pagination[0]);
  }

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="Home">
      <Hero />
      <Pagination
        SelectEntries={SelectEntries}
        numPages={numPages}
        pagination={pagination}
        setPagination={setPagination}
      />
      <HomeCards data={data} />
    </div>
  );
};

export default Home;
