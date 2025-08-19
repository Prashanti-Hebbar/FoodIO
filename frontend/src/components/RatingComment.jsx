import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import '../styles/RatingComment.css';

const RatingComment = ({ recipeId, onRatingUpdate, onCommentUpdate }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentRating, setCommentRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const userID = useGetUserID();

  // memoized fetchers to satisfy exhaustive-deps
  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/ratings/${recipeId}/comments`);
      const list = Array.isArray(response.data) ? response.data : [];
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComments(list);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  }, [recipeId]);

  const fetchUserRating = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/ratings/${recipeId}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserRating(response.data.rating || 0);
    } catch (err) {
      console.error('Failed to fetch user rating:', err);
    }
  }, [recipeId]);

  useEffect(() => {
    if (!recipeId) return;
    fetchComments();
    if (userID) {
      fetchUserRating();
    } else {
      const localRatings = JSON.parse(localStorage.getItem('localRatings') || '{}');
      setUserRating(localRatings[recipeId] || 0);
    }
  }, [recipeId, userID, fetchComments, fetchUserRating]);

  const handleRatingSubmit = async (selectedRating) => {
    const chosen = typeof selectedRating === 'number' ? selectedRating : rating;
    if (chosen === 0) {
      alert('Please select a rating');
      return;
    }

    try {
      setLoading(true);

      if (userID) {
        const response = await axios.post(`http://localhost:3001/ratings/${recipeId}`, 
          { rating: chosen },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        setUserRating(chosen);
        setRating(0);
        if (onRatingUpdate) {
          onRatingUpdate(response.data.averageRating, response.data.totalRatings);
        }
      } else {
        // Local fallback: store user rating per recipe
        const localRatings = JSON.parse(localStorage.getItem('localRatings') || '{}');
        localRatings[recipeId] = chosen;
        localStorage.setItem('localRatings', JSON.stringify(localRatings));
        setUserRating(chosen);
        setRating(0);
      }
    } catch (err) {
      console.error('Failed to submit rating:', err);
      // Keep local rating so UI is responsive even on failure
      const localRatings = JSON.parse(localStorage.getItem('localRatings') || '{}');
      localRatings[recipeId] = chosen;
      localStorage.setItem('localRatings', JSON.stringify(localRatings));
      setUserRating(chosen);
      setRating(0);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = async (star) => {
    if (loading) return;
    setRating(star);
    await handleRatingSubmit(star);
  };

  const getLocalComments = () => JSON.parse(localStorage.getItem(`localComments:${recipeId}`) || '[]');
  const setLocalComments = (list) => localStorage.setItem(`localComments:${recipeId}`, JSON.stringify(list));

  const handleCommentSubmit = async () => {
    if (!userID) {
      alert('Please login to comment');
      return;
    }

    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3001/ratings/${recipeId}/comments`,
        { text: comment, rating: commentRating || undefined },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setComment('');
      setCommentRating(0);
      setComments([...comments, response.data.comment]);
      if (onCommentUpdate) {
        onCommentUpdate();
      }
    } catch (err) {
      console.error('Failed to submit comment:', err);
      // Local fallback so the user is not blocked when backend id is missing
      const local = getLocalComments();
      const localComment = {
        _id: `local-${Date.now()}`,
        userId: userID,
        username: localStorage.getItem('username') || 'You',
        text: comment.trim(),
        rating: commentRating || undefined,
        createdAt: new Date().toISOString()
      };
      local.push(localComment);
      setLocalComments(local);
      setComments([...comments, localComment]);
      setComment('');
      setCommentRating(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/ratings/${recipeId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="rating-comment-container">
      {/* Rating Section */}
      <div className="rating-section">
        <h3>Rate this Recipe</h3>
        {userID ? (
          <div className="rating-input">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star ${rating >= star ? 'filled' : ''} ${userRating >= star ? 'user-rated' : ''}`}
                  onClick={() => handleStarClick(star)}
                  disabled={loading}
                  title={`Rate ${star} star${star>1?'s':''}`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Please login to rate this recipe</p>
        )}
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        
        {userID ? (
          <div className="comment-form">
            <div className="stars" style={{marginBottom: '8px'}}>
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  className={`star ${commentRating >= star ? 'filled' : ''}`}
                  onClick={() => setCommentRating(star)}
                  disabled={loading}
                  title={`Comment rating ${star}`}
                >
                  ⭐
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this recipe..."
              disabled={loading}
            />
            <button 
              onClick={handleCommentSubmit} 
              disabled={loading || !comment.trim()}
              className="submit-comment-btn"
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        ) : (
          <p>Please login to comment</p>
        )}

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{comment.username}</span>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
                {userID && comment.userId === userID && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="delete-comment-btn"
                  >
                    ×
                  </button>
                )}
              </div>
              {comment.rating ? (
                <div style={{marginBottom: '6px'}}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className={i <= comment.rating ? 'text-warning' : ''}>★</span>
                  ))}
                </div>
              ) : null}
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingComment; 