import React from "react";
import { orderBy } from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { comments, createComment, deleteComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
    };

    const handleRemoveComment = (id) => {
        deleteComment(id);
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <div>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
