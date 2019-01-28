// The Gallery component

import React, { Component } from 'react';

class Gallery extends Component {
    // delete this post from user's node
    deletePost = (post) => {
        console.log(post);
        
    }

    // URL shortening algorithm
    sharePost = (post) => {
        console.log(post);
        
    }

    render() {
        return (
            // post each image and caption in allPosts if there are existing posts
            <div>
                {this.props.posts ? 
                    Object.entries(this.props.posts).map(post => {
                        return(
                            <div className="post" key={post[0]}>
                                <img src={post[1].image} alt="post you added"/>
                                <div>
                                    <span>{post[1].caption}</span>
                                    <button className="btn" onClick={() => {this.deletePost(post[0])}}>Delete</button>
                                    <button className="btn" onClick={() => {this.sharePost(post[0])}}>Share</button>
                                </div>
                            </div>
                        );
                    })
                    : <p>Add a new post to start your moodboard! Link to an image you'd like to post and add a caption.</p>
                }
            </div>
        )
    }
}

export default Gallery;