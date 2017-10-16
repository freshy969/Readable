import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Card from 'material-ui/Card';
import {creteEntity} from '../actions/common_actions';
import CommentForm from './CommentForm';


class CardForm extends React.Component {

    handleSubmitForm = (entity) => {
        if(this.props.parentId){
            entity.parentId = this.props.parentId;
            this.props.createComment(entity, 'comments')
        }
        else
            this.props.createComment(entity, 'posts');
        this.props.closeCollapse();
    };

    closeIconHandle = () => {
        this.props.closeCollapse();
    };

    render() {
        const parentId = this.props.parentId;
        return (
            <Card className="formCard">
                <div className="containerRight">
                    <IconButton onClick={this.closeIconHandle}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                    {parentId ?
                        <CommentForm onFormSubmit={(comment) => this.handleSubmitForm(comment)}/> :
                        null
                    }
            </Card>
        )

    }
}

CardForm.propTypes = {
    parentId: PropTypes.string,
    closeCollapse: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        createComment: (entity, entityName) => dispatch(creteEntity(entity, entityName))
    }
};

export default connect(null, mapDispatchToProps)(CardForm);