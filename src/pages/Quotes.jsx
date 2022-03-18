import React, { Fragment, useEffect } from "react";
import { getAllQuotes } from "../lib/api";
import QuoteList from "./../components/quotes/QuoteList";
import useHttp from "./../hooks/use-http";
import LoadingSpinner from "./../components/UI/LoadingSpinner";
import NoQuotesFound from "./../components/quotes/NoQuotesFound";

const Quotes = (props) => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "error") {
    return <div className="centered focused">{error}</div>;
  }
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return (
    <Fragment>
      <QuoteList quotes={loadedQuotes} />
    </Fragment>
  );
};

export default Quotes;