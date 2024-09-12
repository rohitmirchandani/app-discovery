// /utils/apiHelper.js

export const updateBlog = async (chatId, blogDataToPublish) => {
  try {
    const response = await fetch(`/api/blog/${chatId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogDataToPublish),
    });

    if (!response.ok) {
      throw new Error(`Failed to publish blog: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to publish blog:', error);
    throw error;
  }
};

export const publishBlog = async (blogDataToPublish) => {
  try {
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogDataToPublish),
    });

    if (!response.ok) {
      throw new Error(`Failed to publish blog: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to publish blog:', error);
    throw error;
  }
};

export const compareBlogs = async (variables = {}) => {
  try {
    const response = await fetch(
      'https://routes.msg91.com/api/proxy/1258584/29gjrmh24/api/v2/model/chat/completion',
      {
        method: 'POST',
        headers: {
          'pauthkey': process.env.NEXT_PUBLIC_PAUTH_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: "compare",
          bridge_id: process.env.NEXT_PUBLIC_BRIDGE_ID_FOR_COMPARE,
          variables: variables,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to compare blogs: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error comparing blogs:', error);
    throw error;
  }
};

export const createChat = async () => {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error('Failed to create chat');
  }

  return res.json();
};
export const fetchBlogs = async (userEmail, isUserSpecific) => {
  const queryParam = isUserSpecific ? 'true' : 'false';
  const res = await fetch(`/api/blog?user=${queryParam}&userEmail=${encodeURIComponent(userEmail)}`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${isUserSpecific ? 'user' : 'other'} blogs`);
  }

  return res.json();
};
