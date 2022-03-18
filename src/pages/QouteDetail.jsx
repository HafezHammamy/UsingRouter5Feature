import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "./../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "./../components/UI/LoadingSpinner";

const QuoteDetail = (props) => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    data: loadedData,
    error,
    status,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "error") {
    return <div className="centered">{error}</div>;
  }
  if (!loadedData.text) {
    return <p>No quote Found !</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedData.text} author={loadedData.author} />

      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments comments={[]} addComment={() => {}} />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
