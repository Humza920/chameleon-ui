import data from "./user.json";

// Get admin info
export const getAdmin = () => data.admin;

// Get all stats
export const getStats = () => data.stats;

// Get all conversations
export const getConversations = () => data.conversations;

// Get single conversation by ID
export const getConversation = (id) =>
  data.conversations.find(c) => c.id === id);

// Get all feedback
export const getFeedback = () => data.feedback;

// Get single feedback by ID
export const getFeedbackById = (id) =>
  data.feedback.find(f) => f.id === id);

// Get average rating
export const getAverageRating = () => {
  const total = data.feedback.reduce(sum, f) => sum + f.rating, 0);
  return (total / data.feedback.length).toFixed(1);
};

// Get all FB comments
export const getFBComments = () => data.fbcomments;

// Get single FB comment by ID
export const getFBCommentById = (id) =>
  data.fbcomments.find(c) => c.id === id);

// Filter feedback by rating
export const getFeedbackByRating = (rating) =>
  data.feedback.filter(f) => f.rating === rating);

// Filter FB comments by confidence level
export const getFBCommentsByConfidence = (confidence) =>
  data.fbcomments.filter(c) => c.confidence === confidence);

// Get total cost from FB comments
export const getTotalFBCommentsCost = () => {
  return data.fbcomments.reduce(sum, c) => sum + c.cost, 0).toFixed(3);
};

// Get unread FB comments count
export const getUnreadFBCommentsCount = () =>
  data.fbcomments.filter(c) => !c.read).length;

// Get low confidence FB comments count
export const getLowConfidenceFBCommentsCount = () =>
  data.fbcomments.filter(c) => c.confidence === "low").length;

