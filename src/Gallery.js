// The Gallery component

import React, { Component } from 'react';

class Gallery extends Component {

    // delete this post from user's node
    deletePost = (post) => {
        console.log(this.props.dbRef);
        console.log(post);
        
        
        if (window.confirm("Are you sure you want to delete this post?")) {
            this.props.dbRef.child(post).remove();
        }
    }

    // URL copying method
    sharePost = (imageLink) => {
        const link = document.createElement("textarea");
        link.value = imageLink;
        document.body.appendChild(link);
        link.select();
        document.execCommand("copy");
        document.body.removeChild(link);
        alert("Link copied!");
    }

    render() {
        return (
            // post each image and caption in allPosts if there are existing posts
            <div className="gallery">
                {this.props.posts ?
                    Object.entries(this.props.posts).map(post => {
                        return(
                            <div className="post" key={post[0]}>
                                {console.log(post)}
                                <img className="galleryImage" src={post[1].image} alt="moodboard post"/>
                                <div className="overlay">
                                    <span className="postCap">{post[1].caption}</span>
                                    {/* users can only delete posts on their own board */}
                                    <button className={this.props.isUserGallery ? "btn dlt" : "hide"} onClick={() => {this.deletePost(post[0])}}>Delete</button>
                                    <button className="btn share" onClick={() => {this.sharePost(post[1].image)}}>Share</button>
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