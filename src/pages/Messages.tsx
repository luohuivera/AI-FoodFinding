import { MessageSquare } from "lucide-react";

export function Messages() {
  return (
    <main className="min-h-screen bg-background-light pt-20 pb-24 px-4">
      <div className="max-w-[800px] mx-auto bg-surface rounded-2xl shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-text-main mb-2">消息中心</h2>
        <p className="text-text-muted text-sm">暂无新消息</p>
      </div>
    </main>
  );
}
