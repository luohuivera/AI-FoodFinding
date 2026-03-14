import { useState } from "react";
import { Link } from "react-router-dom";
import { Settings, MapPin, Edit3, Grid, Heart, Bookmark } from "lucide-react";
import { PostCard, Post } from "@/components/PostCard";
import { EditProfileModal } from "@/components/EditProfileModal";
import { cn } from "@/lib/utils";

const MOCK_USER = {
  name: "吃货小分队",
  bio: "探索校园周边一切美食！不定期更新探店指南。🍜🍔🍰",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  location: "主校区",
  stats: {
    following: 128,
    followers: 456,
    likes: "1.2k",
  },
};

const MOCK_USER_POSTS: Post[] = [
  {
    id: "1",
    title: "东区二食堂的李记烤冷面，永远的神！",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    price: "15",
    rating: "4.8",
    author: {
      name: "吃货小分队",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    },
    likes: 128,
    location: "东区二食堂",
  },
  {
    id: "2",
    title: "新开的奶茶店测评，这杯芋泥波波绝了",
    image: "https://images.unsplash.com/photo-1558857563-b37102e95e29?auto=format&fit=crop&q=80&w=800",
    price: "18",
    rating: "4.5",
    author: {
      name: "吃货小分队",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    },
    likes: 89,
    location: "南门商业街",
  },
];

type TabType = "posts" | "saved" | "liked";

export function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background-light pb-24">
      {/* Profile Header */}
      <div className="bg-surface border-b border-text-muted/10">
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-warm"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold font-heading text-text-main">
                  {MOCK_USER.name}
                </h1>
                <div className="flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-6 py-2 rounded-full border border-slate-200 text-text-main font-medium hover:bg-slate-50 transition-colors text-sm"
                  >
                    编辑资料
                  </button>
                  <button className="p-2 rounded-full border border-slate-200 text-text-main hover:bg-slate-50 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 mb-4 text-sm">
                <div className="flex flex-col items-center md:items-start">
                  <span className="font-bold text-text-main text-lg">{MOCK_USER.stats.following}</span>
                  <span className="text-text-muted">关注</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="font-bold text-text-main text-lg">{MOCK_USER.stats.followers}</span>
                  <span className="text-text-muted">粉丝</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="font-bold text-text-main text-lg">{MOCK_USER.stats.likes}</span>
                  <span className="text-text-muted">获赞与收藏</span>
                </div>
              </div>

              <p className="text-text-main/80 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                {MOCK_USER.bio}
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-text-muted mt-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{MOCK_USER.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[65px] z-30 bg-background-light/95 backdrop-blur-md border-b border-text-muted/10">
        <div className="max-w-[800px] mx-auto flex justify-center">
          <button
            onClick={() => setActiveTab("posts")}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-colors relative",
              activeTab === "posts" ? "text-primary" : "text-text-muted hover:text-text-main"
            )}
          >
            <Grid className="w-4 h-4" />
            <span>笔记</span>
            {activeTab === "posts" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-colors relative",
              activeTab === "saved" ? "text-primary" : "text-text-muted hover:text-text-main"
            )}
          >
            <Bookmark className="w-4 h-4" />
            <span>收藏</span>
            {activeTab === "saved" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("liked")}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-colors relative",
              activeTab === "liked" ? "text-primary" : "text-text-muted hover:text-text-main"
            )}
          >
            <Heart className="w-4 h-4" />
            <span>赞过</span>
            {activeTab === "liked" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {activeTab === "posts" ? (
          <div className="masonry-grid">
            {MOCK_USER_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              {activeTab === "saved" ? (
                <Bookmark className="w-10 h-10 text-slate-300" />
              ) : (
                <Heart className="w-10 h-10 text-slate-300" />
              )}
            </div>
            <p className="text-sm">暂无内容</p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={MOCK_USER}
      />
    </main>
  );
}
