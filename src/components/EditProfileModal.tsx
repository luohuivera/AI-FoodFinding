import { X, Camera } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    bio: string;
    avatar: string;
  };
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-warm p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading text-text-main">编辑资料</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-text-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-sm text-primary font-medium mt-3 cursor-pointer hover:underline">
            更换头像
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">
              昵称
            </label>
            <input 
              type="text" 
              defaultValue={user.name}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">
              简介
            </label>
            <textarea 
              defaultValue={user.bio}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main resize-none"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-text-main font-medium hover:bg-slate-50 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold shadow-warm hover:shadow-warm-hover hover:bg-primary-hover transition-all"
          >
            保存修改
          </button>
        </div>
      </div>
    </div>
  );
}
