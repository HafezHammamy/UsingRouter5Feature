import { useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm addComment={props.addComment} />}
      {props.comments.length > 0 ? (
        <CommentsList comments={props.comments} />
      ) : (
        <p>No Comments Added Yet!</p>
      )}
    </section>
  );
};

export default Comments;
