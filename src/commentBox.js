import React, { Component } from 'react';
import { Card } from 'antd';
import CommentList from './commentList';
import CommentForm from './commentForm';
import {data1} from './data/data1';

var d3 = require("d3-hierarchy");

export default class CommentBox extends Component{
	constructor(props) {
	 	super(props);
	 	var root = d3.stratify()
	    .id(function(d) { return d.id; })
	    .parentId(function(d) { return d.parent; })(data1);
    	this.state = { 
    		data: [root],
			formState: 2 
		};
  	}
	
	componentDidMount () {

	}
	
	handleCommentSubmit (comment) {
		console.log("last submit");
		console.log(comment);
	}
	
	render(){
		const id="";
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList onCommentSubmit={this.handleCommentSubmit} data={this.state.data}/>
				<Card style={{ marginTop: "5px" }}>
					<CommentForm onCommentSubmit={this.handleCommentSubmit} formState={this.state.formState} commentId={id}/>
				</Card>
			</div>
		);
	}
};