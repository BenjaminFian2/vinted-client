import "./Pagination.css";

const Pagination = ({ SelectEntries, numPages, pagination, setPagination }) => {
  return (
    <div className="Pagination">
      <div className="Pagination-select-page">
        <p>articles par page : </p>
        <select
          value={pagination[0]}
          onChange={(event) => {
            const tab = [...pagination];
            tab[0] = Number(event.target.value);
            tab[1] = 1;
            setPagination(tab);
          }}
        >
          {SelectEntries().map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      <div className="Pagination-pages">
        <button
          className="Pagination-previous-button"
          onClick={() => {
            if (pagination[1] > 1) {
              const tab = [...pagination];
              tab[1]--;
              setPagination(tab);
            }
          }}
        >
          Précédent
        </button>
        {[...Array(numPages)].map((elem, index) => {
          return (
            <button
              key={index}
              value={index + 1}
              onClick={(event) => {
                const tab = [...pagination];
                tab[1] = Number(event.target.value);
                setPagination(tab);
              }}
              className={
                pagination[1] === Number(index + 1)
                  ? "Pagination-btn-active-page"
                  : "Pagination-btn-page"
              }
            >
              {index + 1}
            </button>
          );
        })}
        <button
          className="Pagination-next-button"
          onClick={() => {
            if (pagination[1] < numPages) {
              const tab = [...pagination];
              tab[1]++;
              setPagination(tab);
            }
          }}
        >
          suivant
        </button>
      </div>
    </div>
  );
};

export default Pagination;
