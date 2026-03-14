import { X, MapPin, Heart, Bookmark, Share2, Edit3, ChevronLeft, ChevronRight, Navigation } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any; // Using any for now, refine later
}

export function PostDetailModal({ isOpen, onClose, post }: PostDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-[#2D241E]/60 backdrop-blur-[4px] cursor-pointer"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal Container */}
      <div className="relative flex w-full max-w-[1000px] h-[80vh] min-h-[500px] max-h-[800px] bg-surface rounded-2xl shadow-warm hover:shadow-warm-hover overflow-hidden flex-col md:flex-row z-10">
        
        {/* Close Button (Mobile/Desktop overlay) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/40 transition-colors md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Pane: Image Gallery Carousel */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-slate-100 flex-shrink-0 group">
          {/* Main Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          
          {/* Carousel Arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary ring-2 ring-white/50" />
            <div className="h-2 w-2 rounded-full bg-white/70 hover:bg-white cursor-pointer transition-colors" />
            <div className="h-2 w-2 rounded-full bg-white/70 hover:bg-white cursor-pointer transition-colors" />
            <div className="h-2 w-2 rounded-full bg-white/70 hover:bg-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Right Pane: Content & Interaction */}
        <div className="flex w-full md:w-1/2 h-1/2 md:h-full flex-col bg-surface">
          
          {/* Header (Sticky-ish at top of right pane) */}
          <div className="flex-shrink-0 border-b border-text-muted/10 p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-text-main leading-tight">
                {post.title}
              </h1>
              
              {/* Desktop Close & Save Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 hidden md:flex">
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted hover:bg-primary/10 hover:text-primary transition-colors group/save relative"
                >
                  <Bookmark className={cn("w-5 h-5 transition-all group-hover/save:scale-110", isSaved && "fill-primary text-primary")} />
                </button>
                <button 
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {/* Location Tag & Navigation */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-text-main bg-slate-100 px-3 py-1.5 rounded-full font-medium">
                  <MapPin className="w-4 h-4 text-text-muted" />
                  <span>{post.location}</span>
                </div>
                
                {/* Distance Button */}
                <button 
                  className="flex items-center gap-1 text-white bg-[#FF6B00] hover:bg-[#E66000] px-3 py-1.5 rounded-full font-bold shadow-sm transition-colors active:scale-95"
                  title="距离"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
                  </svg>
                  <span>200m</span>
                </button>

                {/* Navigation Button */}
                <button 
                  className="flex items-center gap-1 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full font-bold shadow-sm transition-colors active:scale-95"
                  title="一键导航"
                >
                  <Navigation className="w-4 h-4" />
                  <span>导航</span>
                </button>
              </div>
              
              {/* Price Tag */}
              {post.price && (
                <div className="flex items-center gap-1.5 text-accent bg-accent/10 px-3 py-1.5 rounded-full font-medium">
                  <span className="font-bold">¥</span>
                  <span>{post.price}/人</span>
                </div>
              )}
              
              {/* Rating */}
              {post.rating && (
                <div className="flex items-center gap-1 text-primary ml-auto md:ml-0">
                  <svg className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="font-bold">{post.rating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Review & Comments Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
            
            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="text-sm font-bold text-text-main">{post.author.name}</p>
                  <p className="text-xs text-text-muted">2小时前发布</p>
                </div>
              </div>
              <button className="px-4 py-1.5 rounded-full border border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                关注
              </button>
            </div>

            {/* Review Body */}
            <div className="text-text-main/80 space-y-4 leading-relaxed text-sm">
              <p>终于打卡了传说中的“李记烤冷面”！每次路过都排长队，今天下了狠心排了半小时，真的值哭了。</p>
              <p>老板给料特别足，多加了一份金针菇和烤肠，酱汁是灵魂！酸甜微辣，裹着软糯的冷面和酥脆的洋葱碎，一口下去简直大满足。</p>
              <p>
                📍 <strong>位置：</strong>东区二食堂旁边的小吃街第三家推车<br/>
                💰 <strong>价格：</strong>基础版8元，加料全家福15元<br/>
                ⭐ <strong>推荐指数：</strong>⭐⭐⭐⭐⭐
              </p>
              <p>建议大家晚上8点以后去，那时候刚出摊，食材最新鲜。不能吃辣的记得提醒老板少放辣椒面哦！</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-slate-100 text-text-muted rounded-full text-xs font-medium cursor-pointer hover:bg-slate-200">#深夜食堂</span>
              <span className="px-3 py-1 bg-slate-100 text-text-muted rounded-full text-xs font-medium cursor-pointer hover:bg-slate-200">#大学城美食</span>
              <span className="px-3 py-1 bg-slate-100 text-text-muted rounded-full text-xs font-medium cursor-pointer hover:bg-slate-200">#烤冷面</span>
            </div>

            {/* Comments List Divider */}
            <div className="pt-6 border-t border-text-muted/10">
              <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
                评论 <span className="text-text-muted font-normal text-sm">(24)</span>
              </h3>
              
              {/* Sample Comment */}
              <div className="flex gap-3 mb-6">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAgfw0j8sFJ8Z7Raq1w7o4JGPLPWER5zZUfpUmz7e0Eu9Rlu-esCwK2forUFGEiPk5ysWiWe11eXdpY0nBulaUZ6h4NnTGz5k7BKilTJcKKNrQyULN498fLJ3Z0izSyDbNiQ1e3YKdGoVFu1HCKHWuEaeDMYXcRM4DiLJhmndP1vdsPJQNap7DvlQLmHLUn48l3yZUdi9t-gUUJ_ByxauHEugJsSv_5CufZXVb4w69a83lZye8E9eFgPlvyLN33EZ-A-RPVUfDkD0"
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-text-main">CS_Freshman</span>
                    <span className="text-xs text-text-muted">1小时前</span>
                  </div>
                  <p className="text-sm text-text-main/80 mt-1">昨晚刚去吃过！加辣的真的绝了 🤤</p>
                  <div className="flex gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-text-muted hover:text-primary">
                      <Heart className="w-3.5 h-3.5" /> 12
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer: Sticky Comment Input & Actions */}
          <div className="flex-shrink-0 p-4 border-t border-text-muted/10 bg-surface flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 text-text-muted cursor-text">
              <Edit3 className="w-4 h-4" />
              <input 
                type="text" 
                placeholder="说点什么..." 
                className="bg-transparent border-none focus:ring-0 text-sm outline-none w-full"
              />
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-1.5 group transition-transform active:scale-125"
              >
                <Heart className={cn("w-6 h-6 transition-colors", isLiked ? "fill-primary text-primary" : "text-text-muted group-hover:text-text-main")} />
                <span className="text-sm font-medium text-text-main">{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-1.5 group transition-transform active:scale-125"
              >
                <Bookmark className={cn("w-6 h-6 transition-colors", isSaved ? "fill-primary text-primary" : "text-text-muted group-hover:text-text-main")} />
                <span className="text-sm font-medium text-text-main">45</span>
              </button>
              <button className="flex items-center group transition-transform active:scale-125">
                <Share2 className="w-6 h-6 text-text-muted group-hover:text-text-main transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
