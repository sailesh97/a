import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts, loading } = this.props.post;
        let postContent;

        const { isAuthenticated } = this.props.auth;

        const mustLogin = (
            <div className="container">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    You must be <strong>logged in</strong> to create new post or to <strong>interact</strong> with the posts.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );


        if (posts === null || loading) {
            postContent = <Spinner />
        } else {
            postContent = <PostFeed posts={posts} />
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {isAuthenticated ? '' : mustLogin}
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);