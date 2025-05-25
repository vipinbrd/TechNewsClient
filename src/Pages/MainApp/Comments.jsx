import React, { useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // User avatar icon

const Comments = ({ comments, articleId }) => {
  const [newComment, setNewComment] = useState(''); // For new comment input
  const [username, setUsername] = useState('');     // For username input
  const [error, setError] = useState(null);         // For error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [postedComments, setPostedComments] = useState(comments); // Local state for comments
  const [showAllComments, setShowAllComments] = useState(false); // To toggle between showing limited and all comments

  // Handle new comment submission
  const handlePostComment = async () => {
    // Input validation
    if (!newComment.trim() || !username.trim()) {
      setError('Please enter both your username and comment.');
      return;
    }

    // Reset error
    setError(null);
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post('https://techservice.myhealthgainer.in/comment', {
        content: newComment,
        username,
        articleId,
      });

      // Optimistically update the local comments state
      setPostedComments([...postedComments, response.data]);

      // Reset input fields
      setNewComment('');
      setUsername('');
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Toggle comment visibility
  const toggleShowComments = () => setShowAllComments(!showAllComments);

  // Display either 5 comments or all comments based on `showAllComments` state
  const commentsToDisplay = showAllComments ? postedComments : postedComments.slice(0, 5);

  return (
    <div className="comments-section mt-8 w-full bg-white p-6 rounded-lg shadow-lg max-w-full mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Comments ({postedComments.length})</h3>

      {/* Display existing comments */}
      {postedComments.length > 0 ? (
        <div className="space-y-6">
          {commentsToDisplay.map((comment, index) => (
            <div key={index} className="flex items-center space-x-4">
              {/* User Avatar */}
              <FaUserCircle className="text-gray-400 w-10 h-10" />

              {/* Comment content */}
              <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-800 font-semibold">{comment.username}</p>
                <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
      )}

      {/* "See More" or "See Less" Button */}
      {postedComments.length > 5 && (
        <button
          onClick={toggleShowComments}
          className="mt-4 text-blue-500 font-medium hover:underline"
        >
          {showAllComments ? 'See Less' : 'See More'}
        </button>
      )}

      {/* Comment form */}
      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4">Add a Comment</h4>

        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
        />

        <textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 transition-shadow shadow-sm mb-3"
          rows="4"
        />

        <button
          onClick={handlePostComment}
          className={`flex px-2 bg-blue-500 text-white font-medium mx-auto py-3 rounded-lg transition-opacity hover:bg-blue-800 ${
            isLoading && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>

        {/* Error message */}
        {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default Comments;
