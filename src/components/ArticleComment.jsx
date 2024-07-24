// import React from "react";
// import { useAuth } from "../hooks";
// import { Link } from "react-router-dom";

// function ArticleComment({ comment }) {
//   console.log("comment", comment);

//   const { author, body, createdAt, id } = comment;
//   const { authUser } = useAuth();

//   const canDelete = author?.username === authUser?.username;

//   return (
//     <div className="card">
//       <div className="card-block">
//         <p className="card-text">{body} </p>
//       </div>

//       {id && (
//         <div className="card-footer">
//           <Link>{author.username}</Link>&nbsp;

//             <span className="date-posted">
//                 {new Date(createdAt).toDateString()}
//             </span>

//           &nbsp;
//           {canDelete && <button>Delete</button>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ArticleComment;


import React, { useState } from "react";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

function ArticleComment({ comment, onCommentPost, onCommentDelete }) {
  console.log("comment", comment);

  const { author, body, createdAt, id } = comment;
  const { authUser } = useAuth();
  const [newComment, setNewComment] = useState("");

  const canDelete = author?.username === authUser?.username;

  const handlePostComment = () => {
    onCommentPost(newComment);
    setNewComment(""); // Reset input after posting
  };

  const handleDeleteComment = () => {
    onCommentDelete(id);
  };

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>

      {id && (
        <div className="card-footer">
          <Link to={`/profile/${author.username}`}>{author.username}</Link>&nbsp;
          <span className="date-posted">{new Date(createdAt).toDateString()}</span>
          &nbsp;
          {canDelete && <button onClick={handleDeleteComment}>Delete</button>}
        </div>
      )}

      <div className="post-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handlePostComment}>Post Comment</button>
      </div>
    </div>
  );
}

export default ArticleComment;
