import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import query from '../queries/fetchSongs';

class LyricCreate extends Component {
    constructor(props){
        super(props);

        this.state = { content: '' };
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.mutate({
            variables: { content: this.state.content, songId: this.props.songId },
            refetchQueries: [{ query }]
        })
        .then(() => {
            this.setState({ content: '' });
        })
        .catch(err => {

        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <label>Add a lyric</label>
                    <input 
                        value={this.state.content} 
                        onChange={event => this.setState({ content: event.target.value })}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);