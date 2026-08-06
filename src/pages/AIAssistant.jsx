import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "axios";
import { toast } from "react-toastify";
import { 
  FaBrain, 
  FaSpinner, 
  FaUpload, 
  FaEye, 
  FaEdit, 
  FaFileAlt, 
  FaRocket,
  FaArrowRight
} from "react-icons/fa";

const AIAssistant = () => {
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);

  // Form states
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [keywords, setKeywords] = useState("");

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [activeTab, setActiveTab] = useState("edit"); // "edit" or "preview"

  // Generated blog state
  const [generatedBlog, setGeneratedBlog] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedSummary, setEditedSummary] = useState("");
  const [editedKeywords, setEditedKeywords] = useState("");
  const [editedTags, setEditedTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Authenticate user on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axiosInstance.get("https://blog-backand-1.onrender.com/api/users/me", {
          withCredentials: true,
        });
        if (!res.data.loggedIn) {
          toast.error("Please login to access the AI Blog Writer.");
          navigate("/login");
        } else {
          setAuthChecking(false);
        }
      } catch (error) {
        toast.error("Please login to access the AI Blog Writer.");
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate]);

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Run AI generation request
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      return toast.warning("Please enter a topic.");
    }

    setIsGenerating(true);
    setGeneratedBlog(null);

    const steps = [
      "Connecting to Grok API...",
      "Analyzing topic and keywords...",
      "Drafting outline and headings...",
      "Writing structured content...",
      "Optimizing SEO tags and meta description...",
      "Finalizing blog structure..."
    ];

    let stepIndex = 0;
    setGenerationStep(steps[0]);
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        stepIndex++;
        setGenerationStep(steps[stepIndex]);
      }
    }, 2500);

    try {
      const response = await axiosInstance.post(
        "https://blog-backand-1.onrender.com/api/blogs/generate-ai",
        { topic, tone, length, keywords },
        { withCredentials: true }
      );

      clearInterval(stepInterval);
      const blogData = response.data.blog;
      
      setGeneratedBlog(blogData);
      setEditedTitle(blogData.title || "");
      setEditedContent(blogData.content || "");
      setEditedSummary(blogData.summary || "");
      setEditedKeywords(blogData.seoKeywords ? blogData.seoKeywords.join(", ") : "");
      setEditedTags(blogData.tags ? blogData.tags.join(", ") : "");
      setActiveTab("edit");

      toast.success("Blog generated successfully!");
    } catch (error) {
      clearInterval(stepInterval);
      console.error(error);
      const errorMsg = error.response?.data?.message || "Failed to generate blog.";
      toast.error(errorMsg);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Publish handler
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!editedTitle.trim() || !editedContent.trim()) {
      return toast.warning("Title and Content cannot be empty.");
    }
    if (!coverImage) {
      return toast.warning("Please upload a cover image to publish this blog.");
    }

    setIsPublishing(true);
    try {
      const formData = new FormData();
      formData.append("title", editedTitle);
      formData.append("description", editedContent); // matches existing schema field
      formData.append("image", coverImage);

      const response = await axiosInstance.post(
        "https://blog-backand-1.onrender.com/api/blogs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Blog published successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Failed to publish blog.";
      toast.error(errorMsg);
    } finally {
      setIsPublishing(false);
    }
  };

  // Light-weight Markdown Parser for Preview Tab
  const renderMarkdown = (md) => {
    if (!md) return null;
    const lines = md.split("\n");

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 1
      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-3xl font-extrabold text-gray-900 mt-6 mb-4 border-b pb-2">
            {trimmed.slice(2)}
          </h1>
        );
      }

      // Heading 2
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-2xl font-bold text-gray-800 mt-5 mb-3">
            {trimmed.slice(3)}
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl font-semibold text-gray-800 mt-4 mb-2">
            {trimmed.slice(4)}
          </h3>
        );
      }

      // Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="list-disc list-inside ml-6 text-gray-700 my-1 font-normal">
            {trimmed.slice(2)}
          </li>
        );
      }

      // Empty Lines
      if (trimmed === "") {
        return <div key={idx} className="h-4"></div>;
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-gray-700 leading-relaxed mb-4 text-justify">
          {line}
        </p>
      );
    });
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4" />
        <p className="text-gray-600 font-medium">Checking authorization...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold mb-4 animate-pulse">
            <FaBrain className="text-indigo-600" /> Powered by Grok AI
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            AI Blog <span className="text-indigo-600">Writing Assistant</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Generate, customize, and publish professional SEO-optimized articles instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Settings */}
          <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border border-gray-150 p-6 transition hover:shadow-2xl duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaFileAlt className="text-indigo-600" /> Blog Parameters
            </h2>

            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Topic / Prompt *
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., The benefits of clean architecture in web applications"
                  rows="4"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm bg-white"
                >
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Informative">Informative</option>
                  <option value="Inspirational">Inspirational</option>
                  <option value="Humorous">Humorous</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm bg-white"
                >
                  <option value="Short">Short (~500 words)</option>
                  <option value="Medium">Medium (~1000 words)</option>
                  <option value="Long">Long (~1500 words)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Keywords (Optional)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., design patterns, solid, clean code"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-bold text-white shadow-lg transition duration-300 ${
                  isGenerating
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 hover:scale-[1.02]"
                }`}
              >
                {isGenerating ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FaRocket />
                    <span>Generate Draft</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Loading or Editor / Preview */}
          <div className="lg:col-span-8">
            
            {/* Loading Overlay */}
            {isGenerating && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl animate-pulse"></div>
                  <FaBrain className="text-6xl text-indigo-600 relative animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Grok AI is Writing...</h3>
                <p className="text-indigo-600 font-semibold mb-4 animate-pulse">{generationStep}</p>
                <p className="text-gray-400 text-sm max-w-sm">
                  This takes about 10-20 seconds. We are structuring, formatting, and generating full SEO parameters.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isGenerating && !generatedBlog && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-250 p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
                  <FaBrain className="text-4xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Content Generated Yet</h3>
                <p className="text-gray-500 max-w-md">
                  Fill in the blog parameters on the left and click "Generate Draft" to write a post with Grok AI.
                </p>
              </div>
            )}

            {/* Results Editor & Preview Dashboard */}
            {!isGenerating && generatedBlog && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-250 overflow-hidden">
                
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 bg-gray-50 px-6 pt-4 gap-4">
                  <button
                    onClick={() => setActiveTab("edit")}
                    className={`flex items-center gap-2 pb-4 font-bold text-sm border-b-2 transition duration-200 px-2 ${
                      activeTab === "edit"
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaEdit /> Edit Content
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-2 pb-4 font-bold text-sm border-b-2 transition duration-200 px-2 ${
                      activeTab === "preview"
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaEye /> Preview Blog
                  </button>
                </div>

                <div className="p-6">
                  
                  {/* EDIT TAB */}
                  {activeTab === "edit" && (
                    <form onSubmit={handlePublish} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title input */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Blog Title *
                          </label>
                          <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                          />
                        </div>

                        {/* Content textarea */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Content (Markdown Supported) *
                          </label>
                          <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            rows="12"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm leading-relaxed"
                            required
                          />
                        </div>

                        {/* Summary textarea */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Summary *
                          </label>
                          <textarea
                            value={editedSummary}
                            onChange={(e) => setEditedSummary(e.target.value)}
                            rows="2"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            required
                          />
                        </div>

                        {/* Meta description */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-gray-700">
                              Meta Description (SEO)
                            </label>
                            <span className={`text-xs ${
                              editedSummary.length > 160 
                                ? "text-red-500 font-medium" 
                                : "text-gray-400"
                            }`}>
                              {editedSummary.length}/160 chars
                            </span>
                          </div>
                          <textarea
                            value={editedSummary} // synced/edited
                            onChange={(e) => setEditedSummary(e.target.value)}
                            rows="3"
                            maxLength="160"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          />
                        </div>

                        {/* SEO Keywords */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            SEO Keywords (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={editedKeywords}
                            onChange={(e) => setEditedKeywords(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          />
                        </div>

                        {/* Tags */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tags (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={editedTags}
                            onChange={(e) => setEditedTags(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          />
                        </div>

                        {/* Cover Image Upload (Mandatory due to db scheme) */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Cover Image * (Required to publish)
                          </label>
                          <div className="flex items-center gap-4">
                            <label className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 px-4 py-3 text-gray-700 font-semibold text-sm transition">
                              <FaUpload /> Upload Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                required
                              />
                            </label>
                            {imagePreview && (
                              <img
                                src={imagePreview}
                                alt="Cover preview"
                                className="h-12 w-20 object-cover rounded-lg border border-gray-200"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Publish CTA */}
                      <div className="border-t pt-6 mt-6 flex justify-end">
                        <button
                          type="submit"
                          disabled={isPublishing}
                          className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-8 py-3.5 shadow-lg transition duration-300 hover:scale-[1.02] ${
                            isPublishing ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {isPublishing ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              <span>Publishing...</span>
                            </>
                          ) : (
                            <>
                              <FaRocket />
                              <span>Publish Blog to Feed</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* PREVIEW TAB */}
                  {activeTab === "preview" && (
                    <article className="prose max-w-none">
                      {/* Image Preview Banner */}
                      {imagePreview ? (
                        <div className="w-full h-80 rounded-2xl overflow-hidden mb-6 border">
                          <img
                            src={imagePreview}
                            alt={editedTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 bg-gray-100 rounded-2xl flex flex-col items-center justify-center border border-dashed border-gray-300 text-gray-400 mb-6 font-semibold">
                          <FaUpload className="text-2xl mb-2" />
                          <span>No cover image uploaded</span>
                        </div>
                      )}

                      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                        {editedTitle || "Untitled Article"}
                      </h1>

                      <div className="flex flex-wrap gap-2 my-4">
                        {editedTags.split(",").map((tag, idx) => {
                          const cleanTag = tag.trim();
                          if (!cleanTag) return null;
                          return (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-indigo-50 border border-indigo-150 text-indigo-700 rounded-full text-xs font-semibold"
                            >
                              #{cleanTag}
                            </span>
                          );
                        })}
                      </div>

                      <div className="border-t border-b border-gray-250 py-4 my-6 flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                        <div>
                          <strong>Tone:</strong> {tone}
                        </div>
                        <div>
                          <strong>Keywords:</strong> {editedKeywords || "None"}
                        </div>
                      </div>

                      {/* Main Rendered Content */}
                      <div className="text-gray-800 mt-6 min-h-[250px] border-b pb-8">
                        {renderMarkdown(editedContent)}
                      </div>

                      {/* SEO Panel Preview */}
                      <div className="mt-8 bg-gray-50 rounded-2xl p-5 border">
                        <h4 className="text-md font-bold text-gray-800 mb-3">
                          SEO & Meta Data (Not visible in article feed)
                        </h4>
                        <div className="space-y-3 text-sm">
                          <p className="text-gray-600">
                            <strong>Summary:</strong> {editedSummary}
                          </p>
                          <p className="text-gray-600">
                            <strong>Meta Description:</strong> {editedSummary.slice(0, 160)}
                          </p>
                          <p className="text-gray-600">
                            <strong>SEO Keywords:</strong> {editedKeywords}
                          </p>
                        </div>
                      </div>
                    </article>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
