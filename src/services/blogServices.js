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
  return JSON.parse(JSON.stringify(await Blog.findById(blogId)));
}

const updateBlogById = async(blogId,blogData) => {
  await dbConnect();
  return JSON.parse(JSON.stringify(await Blog.findByIdAndUpdate(blogId,blogData)));
}

export default { getAllBlogs, createBlog, getBlogById, updateBlogById };
