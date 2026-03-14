/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Publish } from "./pages/Publish";
import { Messages } from "./pages/Messages";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-light text-text-main font-sans selection:bg-primary/20 selection:text-primary">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}
