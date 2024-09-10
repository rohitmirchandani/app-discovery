// pages/api/blogs.js
import dbConnect from './../../../lib/mongoDb'; 
import blogServices from '@/services/blogServices';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const blogs = await blogServices.getAllBlogs();
        res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'POST':
      try {
        const blog = await blogServices.createBlog(req.body);
        res.status(201).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
