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

const getUserBlogs = async (userEmail) => {
  await dbConnect();
  return await Blog.find({
    'createdBy.userEmail': userEmail,
    'markdown': { $exists: true} // Ensure markdown is not an empty string
  });
}

const getOtherBlogs = async (userEmail) => {
  await dbConnect();
  return await Blog.find({
    'createdBy.userEmail': { $ne: userEmail },
    'markdown': { $exists: true} 
  });
}
export default { getAllBlogs, createBlog, getBlogById, updateBlogById , getUserBlogs, getOtherBlogs};
