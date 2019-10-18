import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Modal from '../common/Modal/Modal';
import { addPost, showModal, hideModal } from '../../actions/postActions';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.submitClicked = this.submitClicked.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log(this.props.auth);
        const { user } = this.props.auth;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addPost(newPost);
        this.setState({ text: '' });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitClicked(e) {
        const { isAuthenticated } = this.props.auth;
        isAuthenticated ? this.onSubmit(e) : this.props.showModal()
    }

    purchasecancelHandler = () => {
        this.props.hideModal();
    };

    render() {
        const { errors } = this.state;
        const { showModal2 } = this.props;
        const form = (
            <div className="form">
                <div className="post-form mb-3">
                    <div className="card card-info">
                        <div className="card-header bg-info text-white">
                            Say Somthing...
                    </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextAreaFieldGroup className="form-control form-control-lg" placeholder="Create a post"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        error={errors.text}
                                    />
                                </div>
                                <button type="button" onClick={this.submitClicked} className="btn btn-dark">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );

        const modalContent = (
            <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">So sorry buddy!<i className="fa fa-frown-o" aria-hidden="true"></i>
                </h4>
                <p>DevConnector strongly follows it's privacy policies</p>
                <hr />
                <p className="mb-0">You need to login first, before interacting with the posts...</p>
            </div>
        );

        return (
            <React.Fragment>
                <Modal
                    className='mt-5'
                    show={showModal2}
                    modalClosed={this.purchasecancelHandler}
                >
                    {modalContent}
                </Modal>
                {form}
            </React.Fragment>
        )
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    showModal2: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    showModal2: state.post.showModal
})

export default connect(mapStateToProps, { addPost, showModal, hideModal })(PostForm);
