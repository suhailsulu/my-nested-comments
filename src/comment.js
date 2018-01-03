import React, { Component } from 'react';
import { Avatar,Card, Collapse } from 'antd';

import CommentForm from './commentForm';
import CommentList from './commentList';

const Panel = Collapse.Panel;


var marked = require('marked');
const options = {
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
}
export default class Comment extends Component{
	constructor(props) {
    	super(props);
    	this.state = { 
    		formState: 0,
    	};
  	}
	
	toggleForm = (e) => {
		this.setState({
			formState: (this.state.formState + 1) % 2
		});
	}
	
	rawMarkup () {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return {__html: rawMarkup};
	}
	
	handleCommentSubmit = (comment) => {
		this.props.onCommentSubmit(comment);
	}
	
	getHeader(commentData){
		return (<div className="commentHeader">
			<div className="commentAuthor">{commentData.user}</div>
			<div className="date">&nbsp;on {commentData.date.toLocaleDateString("en-US", options)}</div>
		</div>);
	}
	
	render () {
		const commentData = this.props.data.data;
		return (
			<Card style={{ marginTop: "5px" }}>
				<div className="comment">
					<div className="commentContent"> 
						<div className="commentAvatar">
							<Avatar size="large" icon="user" src={commentData.image}/> 
						</div>
						<div className="commentRight">
						 	<Collapse bordered={false}>
								<Panel header={this.getHeader(commentData)} key="1">
								<div className="commentBody" dangerouslySetInnerHTML={this.rawMarkup()}/>
								
								
								<a className="link" onClick={this.toggleForm}>Reply</a>
								
								<CommentForm toggleForm = {this.toggleForm} onCommentSubmit={this.handleCommentSubmit} 
								formState={this.state.formState} commentId={commentData.id}/>
								<CommentList data={this.props.data.children} onCommentSubmit={this.handleCommentSubmit}/>
								</Panel>
							</Collapse>
						</div>
					</div>
				
					
				</div>
			</Card>
		);
	}
};