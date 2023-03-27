import { useState } from 'react';
import FastAPIClient from '../../client';
import config from '../../config';

const client = new FastAPIClient(config)

const CreateBlog = ({ onBlogCreated }) => {
    const [title, setTitle] = useState('');
    
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setloading] = useState(false);
    const [createdPosts, setCreatedPosts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        const response = await client.createPost(title, body).then();
        if (response.status === 201) {
          setloading(false);
          setMessage('Blog post created successfully!');
          onBlogCreated(response.data);
          setTitle('');
          setBody('');
        } else {
          setMessage('Error creating the blog post.');
        }
      } 
    
  
    return (
      <div className="max-w-md mx-auto shadow-md p-4 mt-4">
        <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
        {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-bold">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-400 p-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block mb-2 font-bold">Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-gray-400 p-2 rounded-lg"
              rows="8"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    );
  };

const UserPage = () => {
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [createdPosts, setCreatedPosts] = useState([]);

  const handleToggleCreateBlog = () => {
    setShowCreateBlog(!showCreateBlog);
  };

  const handleBlogCreated = (newPost) => {
   
    setCreatedPosts([...createdPosts, newPost]);
  };

  return (
    <div>
      <button onClick={handleToggleCreateBlog} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
        {showCreateBlog ? 'Hide' : 'Create Blog Post'}
      </button>
      {showCreateBlog && <CreateBlog onBlogCreated={handleBlogCreated} />}
      {createdPosts.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Created Posts:</h2>
          {createdPosts.map(post => (
            <div key={post.id} className="bg-white shadow-md p-4 rounded-lg mb-2">
              <h3 className="font-bold mb-2">{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export {UserPage, CreateBlog};
