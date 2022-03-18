import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Quotes from "./pages/Quotes";
import { useState } from "react";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QouteDetail";
import NotFound from "./pages/NotFound";
function App() {
  const [comments, setComments] = useState([]);

  const addCommentHandler = (text) => {
    let currentComments = [...comments];
    currentComments.push({ text });
    setComments(currentComments);
  };
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <Quotes comments={comments} addComment={addCommentHandler} />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/add-quote">
          <NewQuote />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
