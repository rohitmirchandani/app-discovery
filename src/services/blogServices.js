// services/blogService.js
import Blog from '../../models/BlogModel';
import dbConnect from '../../lib/mongoDb';

const getAllBlogs = async () => {
  await dbConnect();
  return Blog.find({});
};

const createBlog = async (blogData) => {
  await dbConnect();
  return Blog.create(blogData);
};

const getBlogById = async(blogId) => {
  await dbConnect();
  return await Blog.findById(blogId).lean();
}

export default { getAllBlogs, createBlog, getBlogById };
