import React, { Component } from 'react';
import Comment from './comment';

export default class CommentList extends Component{

	
	handleCommentSubmit = (comment) => {
		this.props.onCommentSubmit(comment);
	}
	render () {
		if (this.props.data) {
			var comments = this.props.data;
			var currComponent = this;
			var commentNodes = comments.map(function (comment,key) {
				return (
					<Comment key={comment.data.id} data={comment} onCommentSubmit={currComponent.handleCommentSubmit}>
						{comment.data.text}
					</Comment>
				);
			});
			return (
				<div className="commentList">
					{commentNodes}
				</div>
			);
		} else {
			return (<noscript/>);
		}
	}
};