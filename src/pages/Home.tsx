import { useState } from "react";
import { TrendingUp, Award, Store, Moon } from "lucide-react";
import { PostCard, Post } from "@/components/PostCard";
import { PostDetailModal } from "@/components/PostDetailModal";
import { cn } from "@/lib/utils";

const MOCK_POSTS: Post[] = [
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
    isSaved: true,
    category: "食堂测评",
  },
  {
    id: "2",
    title: "周末去哪儿？南门外新开的猫咪咖啡馆探店",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "周末探险家",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    },
    likes: 342,
    location: "南门外商业街",
    category: "探店",
  },
  {
    id: "3",
    title: "期末复习必备：图书馆周边高性价比外卖合集",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    price: "20",
    rating: "4.5",
    author: {
      name: "学霸也爱吃",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    },
    likes: 89,
    location: "图书馆周边",
    category: "美食",
  },
  {
    id: "4",
    title: "西区操场晚霞，绝美！",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "摄影爱好者",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80",
    },
    likes: 567,
    location: "西区操场",
    category: "日常",
  },
  {
    id: "5",
    title: "强烈安利！北门那家新开的螺蛳粉，够味！",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800",
    price: "18",
    rating: "4.9",
    author: {
      name: "无辣不欢",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    },
    likes: 210,
    location: "北门小吃街",
    isSaved: true,
    category: "附近",
  },
  {
    id: "6",
    title: "校园秋色，银杏大道打卡指南",
    image: "https://images.unsplash.com/photo-1508614999368-9260051292e5?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "风景猎人",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    },
    likes: 430,
    location: "主校区银杏大道",
    category: "日常",
  },
  {
    id: "7",
    title: "大学城夜市必吃榜！排队一小时也要吃的淀粉肠",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    price: "5",
    rating: "5.0",
    author: {
      name: "夜猫子",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    },
    likes: 892,
    location: "大学城夜市",
    category: "大学城夜市",
  },
  {
    id: "8",
    title: "出99新微积分教材，半价出！",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    price: "25",
    author: {
      name: "大四学长",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    },
    likes: 12,
    location: "南区宿舍",
    category: "二手",
  },
  {
    id: "9",
    title: "求助！谁捡到了我的校园卡？",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "迷糊大王",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80",
    },
    likes: 45,
    location: "图书馆一楼",
    category: "求助",
  },
  {
    id: "10",
    title: "一食堂新出的麻辣香锅，测评来了！",
    image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800",
    price: "22",
    rating: "4.2",
    author: {
      name: "干饭人",
      avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=100&q=80",
    },
    likes: 156,
    location: "一食堂二楼",
    category: "食堂测评",
  },
  {
    id: "11",
    title: "夜市新摊位：手打柠檬茶，清爽解腻！",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800",
    price: "12",
    rating: "4.7",
    author: {
      name: "奶茶星人",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    },
    likes: 320,
    location: "大学城夜市中段",
    category: "大学城夜市",
  },
  {
    id: "12",
    title: "发现一家宝藏古着店，太好逛了吧！",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "穿搭博主",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&q=80",
    },
    likes: 678,
    location: "东门创意园",
    category: "探店",
  },
  {
    id: "13",
    title: "2026大学城美食排行TOP10出炉！你吃过几家？",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    price: "50",
    rating: "4.9",
    author: {
      name: "美食情报局",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    },
    likes: 1250,
    location: "大学城全域",
    category: "美食排行",
  },
  {
    id: "14",
    title: "新生必看！大学城必吃榜第一名，不吃后悔四年",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    price: "35",
    rating: "5.0",
    author: {
      name: "学长带你飞",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    },
    likes: 3400,
    location: "南门美食街",
    category: "必吃榜",
    isSaved: true,
  }
];

const CATEGORIES = ["推荐", "附近", "美食", "美食排行", "必吃榜", "食堂测评", "大学城夜市", "探店", "日常", "二手", "求助"];

export function Home() {
  const [activeCategory, setActiveCategory] = useState("推荐");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = MOCK_POSTS.filter(post => 
    activeCategory === "推荐" ? true : post.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-background-light pb-24">
      {/* Categories Bar */}
      <div className="sticky top-[65px] z-30 bg-background-light/95 backdrop-blur-md border-b border-text-muted/10 px-4 py-3 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-6 max-w-[1200px] mx-auto min-w-max">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "relative text-base font-medium transition-colors whitespace-nowrap pb-1",
                activeCategory === category
                  ? "text-primary font-bold"
                  : "text-text-muted hover:text-text-main"
              )}
            >
              {category}
              {activeCategory === category && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Access Icons */}
      <div className="max-w-[1200px] mx-auto px-4 pt-6 pb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div 
            className="flex items-center gap-3 cursor-pointer group bg-white rounded-2xl p-2.5 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition-shadow"
            onClick={() => setActiveCategory("美食排行")}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[14px] font-bold text-slate-700 whitespace-nowrap">美食排行</span>
          </div>
          
          <div 
            className="flex items-center gap-3 cursor-pointer group bg-white rounded-2xl p-2.5 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition-shadow"
            onClick={() => setActiveCategory("必吃榜")}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[14px] font-bold text-slate-700 whitespace-nowrap">必吃榜</span>
          </div>

          <div 
            className="flex items-center gap-3 cursor-pointer group bg-white rounded-2xl p-2.5 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition-shadow"
            onClick={() => setActiveCategory("食堂测评")}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <span className="text-[14px] font-bold text-slate-700 whitespace-nowrap">食堂测评</span>
          </div>

          <div 
            className="flex items-center gap-3 cursor-pointer group bg-white rounded-2xl p-2.5 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition-shadow"
            onClick={() => setActiveCategory("大学城夜市")}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Moon className="w-5 h-5" />
            </div>
            <span className="text-[14px] font-bold text-slate-700 whitespace-nowrap">大学城夜市</span>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {filteredPosts.length > 0 ? (
          <div className="masonry-grid">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted">
            <div className="w-24 h-24 mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">📭</span>
            </div>
            <p className="text-lg font-medium">这里还没有内容哦</p>
            <p className="text-sm mt-1">快来发布第一篇笔记吧！</p>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </main>
  );
}
