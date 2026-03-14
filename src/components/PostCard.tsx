import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Post {
  id: string;
  title: string;
  image: string;
  price?: string;
  rating?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  location: string;
  isSaved?: boolean;
  category?: string;
}

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article
      className="masonry-item group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-surface rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="relative w-full overflow-hidden bg-slate-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {post.price && (
            <div className="absolute top-3 right-3 bg-accent text-surface text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              ¥{post.price}/人
            </div>
          )}
          {post.isSaved && (
            <div className="absolute top-3 right-3 bg-accent text-surface text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
              <span>★</span> 种草
            </div>
          )}
          {/* Distance Badge */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white bg-[#FF6B00] px-2 py-1 rounded-full text-xs font-bold shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
            </svg>
            <span>200m</span>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-sm sm:text-base leading-tight mb-2 line-clamp-2 text-text-main group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          {post.rating && (
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4",
                    star <= Math.floor(Number(post.rating))
                      ? "text-primary fill-primary"
                      : "text-text-muted/30 fill-text-muted/30"
                  )}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="text-[10px] sm:text-xs text-text-muted ml-0.5 sm:ml-1">{post.rating}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-2 sm:mt-3">
            {post.author ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                />
                <span className="text-[10px] sm:text-xs text-text-main font-medium truncate max-w-[60px] sm:max-w-[100px]">
                  {post.author.name}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-text-muted">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="truncate max-w-[60px] sm:max-w-[100px]">{post.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-text-muted">
              <Heart className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", post.isSaved && "fill-primary text-primary")} />
              <span className="text-[10px] sm:text-xs">{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
