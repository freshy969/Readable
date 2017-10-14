import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import { pink } from 'material-ui/colors';
import sortBy from 'sort-by';
import VotingWidget from './VotingWidget';
import {deleteEntity} from '../actions/common_actions';

const styles = theme => ({
    card: {
        cursor: 'pointer',
        marginBottom: '20px',
        padding: '0px'
    },
    title: {
        fontSize: 18,
        color: theme.palette.text.secondaryAction,
    },
    iconPink: {
        fill: pink[600],
        margin: '0 3px 0 6px'
    },
    iconText:{
        display: 'inline',
        fontSize: '18px',
        marginTop: '2px'
    }
});

class PostList extends React.Component{
    render(){
        const {posts, classes} = this.props;
        const selectedCategory = this.props.match.params.category;

        return(
            <div>
                {posts && posts.map((post, i) => (
                    (selectedCategory === undefined || selectedCategory === post.category) &&
                    !(post.deleted || post.parentDeleted) &&
                    <Card className={classes.card} key={i}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    {post.author && post.author.length > 0 ? post.author[0].toUpperCase() : '?'}
                                </Avatar>
                            }
                            title={
                                <div className={'containerSpread'}>
                                    {post.title ? post.title : 'Comment'}
                                    <div>
                                        <IconButton className={classes.button} aria-label="Delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton className={classes.button} aria-label="Delete">
                                            <EditIcon />
                                        </IconButton>
                                    </div>

                                </div>
                            }
                            subheader={`Posted by ${post.author} on ${new Date(post.timestamp).toLocaleString()}`}
                        >

                        </CardHeader>
                        <CardContent className={'containerSpread'}>
                            <Typography noWrap type="body1" color="secondary">
                                {post.body}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <VotingWidget entity={post} entityName={'posts'}/>
                        </CardActions>
                    </Card>
                ))}
            </div>
        );
    }
}

const getSorted = (posts, sortObj) => {
    if(posts === null || sortObj === null) return;

    sortObj.isDesc ? posts.sort(sortBy('-'+sortObj.property)) :
        posts.sort(sortBy(sortObj.property));
};

const mapStateToProps = ({posts}) => {
    const postsArray = posts.entities ? Object.values(posts.entities) : null;
    getSorted(postsArray, posts.sortBy);

    return {
      posts: postsArray,
  }
};

function mapDispatchToProps (dispatch) {
    return {
        deleteEntity: (entityId, entityName) => dispatch(deleteEntity(entityId, entityName))
    }
}

PostList.propTypes = {
    posts: PropTypes.array,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostList));
