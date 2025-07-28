import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  likes: number;
  createdAt: string;
}

function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const mockPosts = [
        {
          id: '1',
          title: 'How to Learn React Effectively',
          slug: 'learn-react-effectively',
          content:
            'React is a powerful library for building user interfaces. To get the most out of it, focus on understanding components, hooks, and JSX deeply...',
          likes: 12,
          createdAt: '2025-07-25T14:48:00.000Z',
        },
        {
          id: '2',
          title: 'Understanding the JavaScript Event Loop',
          slug: 'js-event-loop',
          content:
            'The event loop is what allows JavaScript to perform non-blocking operations. In this article, we’ll dive deep into how it works behind the scenes...',
          likes: 8,
          createdAt: '2025-07-24T10:30:00.000Z',
        },
        {
          id: '3',
          title: 'Backend vs Frontend: What Should You Learn First?',
          slug: 'frontend-vs-backend',
          content:
            'Both backend and frontend development are essential in web development. This post helps you decide where to start based on your goals...',
          likes: 20,
          createdAt: '2025-07-22T08:20:00.000Z',
        },
      ];
  
      setPosts(mockPosts);
      setLoading(false);
    }, 1000); // optional delay for realism
  }, []);
  

//   useEffect(() => {
//     fetch('/api/posts')
//       .then(res => res.json())
//       .then(data => {
//         setPosts(data);
//         setLoading(false);
//       });
//   }, []);

  const toggleLike = async (postId: string) => {
    const alreadyLiked = likedPosts.has(postId);

    const res = await fetch(`/api/posts/${postId}/like`, {
      method: alreadyLiked ? 'DELETE' : 'POST',
    });

    if (res.ok) {
      setPosts(prev =>
        prev.map(post =>
          post.id === postId
            ? { ...post, likes: post.likes + (alreadyLiked ? -1 : 1) }
            : post
        )
      );
      const updatedSet = new Set(likedPosts);
      alreadyLiked ? updatedSet.delete(postId) : updatedSet.add(postId);
      setLikedPosts(updatedSet);
    }
  };

  if (loading) return <div className="p-8 text-center text-lg">Loading posts...</div>;

  return (
    <div className="min-h-screen text-white px-4 py-6">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div className="w-12 h-12 rounded-full bg-white/10" />

        <h1 className="text-xl sm:text-2xl font-bold text-center flex-1 -ml-12">
            Find All Blogs
        </h1>

        {/* Profile Picture */}
        {/* {user?.profileImage ? (
            <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
            />
        ) : (
            <FaUserCircle className="w-10 h-10 text-white/60" />
        )} */}
            <FaUserCircle className="w-10 h-10 text-white/60" />
        </header>
  
        {/* Feed Heading */}
        <h2 className="text-3xl font-bold mb-6 text-white">Your Feed</h2>

       {/* --- Error Message --- */}
       {errorMsg && (
            <p className="mb-4 p-1 rounded-sm text-center bg-red-800">{errorMsg}</p>
        )}
  
      {/* Posts */}
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {post.content}
            </p>
  
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
  
              <div className="flex gap-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 hover:cursor-pointer ${
                    likedPosts.has(post.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  } hover:text-red-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={likedPosts.has(post.id) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                  </svg>
                  {post.likes}
                </button>
  
                <Link
                  to={`/dashboard/post/${post.slug}`}
                  className="hover:underline hover:text-blue-400"
                >
                  View Post →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default Dashboard