import React, { Component } from 'react';
import { Input, Button, Form, Icon } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;


class AddCommentForm extends React.Component {
	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onCommentSubmit({
			text: values.comment, 
			date: Date(),
			parent:this.props.commentId
		});
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const closeStyle ={
      position: "absolute",
      right: "0",
      top: "-15px",
      cursor:"pointer"
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{position:"relative"}}>
      	{this.props.commentId!=="" && <Icon style={closeStyle} type="close" onClick={this.props.toggleForm}/>}
        <FormItem>
          {getFieldDecorator('comment', {
            rules: [{ required: true, message: 'Please input your comment!' }],
          })(
           <TextArea placeholder="Comment here..." rows={3} />
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Comment
          </Button>
        </FormItem>
      </Form>
    );
  }
}


export default class CommentForm extends Component{
	constructor(props) {
    super(props);
	    this.state = { 
	    	author: '',
			text: ''
		};
  	}

	render () {
		const WrappedCommentForm = Form.create()(AddCommentForm);
		if (this.props.formState){
			return (
				<WrappedCommentForm toggleForm={this.props.toggleForm} 
				onCommentSubmit={this.props.onCommentSubmit} commentId={this.props.commentId}/>
			);
		}
			
		else
			return (<noscript/>);
	}
};


