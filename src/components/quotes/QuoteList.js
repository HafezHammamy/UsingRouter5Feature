import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes = [], ascending) => {
  return quotes.sort((a, b) => {
    if (ascending) return a.id > b.id ? 1 : -1;
    return a.id < b.id ? 1 : -1;
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  let isAscinding = url.get("sort") === "asc";
  const sorted = sortQuotes(props.quotes, isAscinding);

  const sortHandlers = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isAscinding ? "dec" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandlers}>
          Sort {isAscinding ? "Decsinding" : "Ascinding"}
        </button>
      </div>
      <ul className={classes.list}>
        {sorted.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
