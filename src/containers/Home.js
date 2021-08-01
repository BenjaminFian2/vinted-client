import "./Home.css";

//components
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import Pagination from "../components/Pagination";

const Home = ({
  data,
  isLoading,
  count,
  setCount,
  numItems,
  setNumItems,
  page,
  setPage,
  selectEntries,
  numPages,
}) => {
  return isLoading ? (
    <div className="roller-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <div className="Home">
      <Hero />
      <Pagination
        selectEntries={selectEntries}
        numPages={numPages}
        count={count}
        numItems={numItems}
        setNumItems={setNumItems}
        page={page}
        setPage={setPage}
      />
      <HomeCards data={data} />
    </div>
  );
};

export default Home;
