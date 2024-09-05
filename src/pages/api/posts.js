// pages/api/posts.js

export default function handler(req, res) {
    const dummyData = [
      { id: 1, title: 'Post One', body: 'This is the first post' },
      { id: 2, title: 'Post Two', body: 'This is the second post' },
      { id: 3, title: 'Post Three', body: 'This is the third post' },
    ];
  
    res.status(200).json(dummyData);
  }
  