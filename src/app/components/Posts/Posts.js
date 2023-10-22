import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Post from './Post';

class Posts extends Component{

  componentDidMount(){
    this.props.fetchPosts();
  }


  renderPosts(posts){
    return posts.map(post => {
      return <Post key={post.id} post={post}/>;
    });
  }

  render(){
    const { posts } = this.props;
    if(!posts) return <div>Loading...</div>;
    return(
      <div>
        <div className="card-columns">
          {this.renderPosts(posts)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    posts: state.wp.posts
  }
}

export default connect(mapStateToProps, actions)(Posts);
