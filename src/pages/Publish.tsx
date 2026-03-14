import React, { useState, useRef } from "react";
import { Camera, MapPin, Hash, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Publish() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 9)); // Max 9 images
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = () => {
    // Basic validation
    if (!title.trim() || images.length === 0) {
      alert("请填写标题并上传至少一张图片");
      return;
    }

    // Mock publish action
    console.log("Publishing:", { title, content, images, location, tags });
    alert("发布成功！");
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background-light pb-24 px-4 sm:px-6">
      <div className="max-w-[640px] mx-auto bg-surface rounded-3xl shadow-warm p-6 sm:p-8 mt-4 animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Image Upload Area */}
        <div className="mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {images.length < 9 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-xs font-medium">上传图片</span>
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs text-text-muted mt-3 text-right">
            {images.length}/9
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="填写标题会有更多赞哦~"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-bold font-heading text-text-main placeholder:text-text-muted/50 border-b border-slate-200 pb-4 focus:border-primary outline-none transition-colors bg-transparent"
              maxLength={30}
            />
            <div className="text-right text-xs text-text-muted mt-1">
              {title.length}/30
            </div>
          </div>

          {/* Content */}
          <div>
            <textarea
              placeholder="添加正文，分享你的真实体验..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full text-base text-text-main placeholder:text-text-muted/50 border-none focus:ring-0 outline-none resize-none bg-transparent leading-relaxed"
              maxLength={1000}
            />
            <div className="text-right text-xs text-text-muted mt-1">
              {content.length}/1000
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-text-muted shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="添加地点"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none text-text-main placeholder:text-text-muted"
            />
          </div>

          {/* Tags */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-text-muted shrink-0 mt-1">
              <Hash className="w-5 h-5" />
            </div>
            <div className="flex-1 flex flex-wrap gap-2 items-center min-h-[48px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder={tags.length === 0 ? "添加标签 (回车确认)" : ""}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 text-sm outline-none text-text-main placeholder:text-text-muted py-2"
              />
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="mt-12">
          <button
            onClick={handlePublish}
            disabled={!title.trim() || images.length === 0}
            className={cn(
              "w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-warm flex items-center justify-center gap-2",
              title.trim() && images.length > 0
                ? "bg-primary text-white hover:bg-primary-hover hover:shadow-warm-hover transform hover:-translate-y-1"
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            )}
          >
            发布笔记
          </button>
        </div>
      </div>
    </main>
  );
}
