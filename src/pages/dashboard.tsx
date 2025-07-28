import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderProfile from "@/components/headerProfile";

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3000";
  

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`, {
        credentials: "include"
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  async function sessionHandler() {
    const { data: session } = await authClient.getSession(); // Built-in to BetterAuth
    if (!session?.user) {
      navigate("/login")
    }
  }
  

  useEffect(() => {
    sessionHandler();
    fetchPosts();
  }, []);

  const handleCreateOrUpdate = async () => {
    const payload = JSON.stringify({ title, content });
    const headers = { "Content-Type": "application/json" };

    try {
      if (editingPostId) {
        await fetch(`${API_BASE_URL}/api/posts/${editingPostId}`, {
          method: "PUT",
          headers,
          body: payload,
          credentials: "include"
        });
      } else {
        await fetch(`${API_BASE_URL}/api/posts`, {
          method: "POST",
          headers,
          body: payload,
          credentials: "include"
        });
      }

      setTitle("");
      setContent("");
      setEditingPostId(null);
      fetchPosts();
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  const handleEdit = (post: any) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingPostId(post.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      fetchPosts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen text-white px-4 py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div className="w-12 h-12 rounded-full bg-white/10" />

        <h1 className="text-xl sm:text-2xl font-bold text-center flex-1 -ml-12">
          Find All Blogs
        </h1>

        {/* Profile Picture */}
        <HeaderProfile />
      </header>
      <section className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <span className="text-gray-400">Find All Blogs</span>
      </section>

      <div className="max-w-2xl mx-auto mb-6 bg-[#1a1a1a] p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">{editingPostId ? "Edit Post" : "Create New Post"}</h2>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded bg-[#2a2a2a] text-white"
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-[#2a2a2a] text-white h-32"
        />
        <button
          onClick={handleCreateOrUpdate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          {editingPostId ? "Update Post" : "Create Post"}
        </button>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-400 text-sm mt-2 mb-4">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-yellow-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
