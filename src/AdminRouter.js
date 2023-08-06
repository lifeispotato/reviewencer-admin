import { Routes, Route } from "react-router-dom";
import React from "react";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import JoinComplete from "./pages/join/JoinComplete";
import Main from "./pages/dashboard/Main";
import Manager from "./pages/manager/Manager";
import Popup from "./pages/site/popup/Popup";
import Terms from "./pages/site/terms/Terms";
import Base from "./pages/site/base/Base";
import Ask from "./pages/ask/Ask";
import Recommend from "./pages/strategy/recommend/Recommend";
import Marketing from "./pages/strategy/marketing/Marketing";
import Analyze from "./pages/dashboard/Analyze";
import ManagerDetail from "./pages/manager/ManagerDetail";
import ManagerEdit from "./pages/manager/ManagerEdit";
import PopupAdd from "./pages/site/popup/PopupAdd";
import PopupDetail from "./pages/site/popup/PopupDetail";
import PopupEdit from "./pages/site/popup/PopupEdit";
import TermsDetail from "./pages/site/terms/TermsDetail";
import BaseEdit from "./pages/site/base/BaseEdit";
import AskDetail from "./pages/ask/AskDetail";
import RecommendDetail from "./pages/strategy/recommend/RecommendDetail";
import RecommendEdit from "./pages/strategy/recommend/RecommendEdit";
import MarketingDetail from "./pages/strategy/marketing/MarketingDetail";
import MarketingEdit from "./pages/strategy/marketing/MarketingEdit";
import MarketingAdd from "./pages/strategy/marketing/MarketingAdd";
import TermsEdit from "./pages/site/terms/TermsEdit";

const AdminRouter = () => {
  return (
    <Routes>      
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/join" element={<Join />} />
      <Route path="/admin/join/complete" element={<JoinComplete />} />
      <Route path="/admin/dashboard/home" element={<Main />} />
      <Route path="/admin/dashboard/analyze" element={<Analyze />} />
      <Route path="/admin/manager" element={<Manager />} />
      <Route path="/admin/manager/detail/:id" element={<ManagerDetail />} />
      <Route path="/admin/manager/edit/:id" element={<ManagerEdit />} />
      <Route path="/admin/site/popup" element={<Popup />} />
      <Route path="/admin/site/popup/add" element={<PopupAdd />} />
      <Route path="/admin/site/popup/detail/:id" element={<PopupDetail />} />
      <Route path="/admin/site/popup/edit/:id" element={<PopupEdit />} />
      <Route path="/admin/site/terms" element={<Terms />} />
      <Route path="/admin/site/terms/detail/:id" element={<TermsDetail />} />
      <Route path="/admin/site/terms/edit/:id" element={<TermsEdit />} />
      <Route path="/admin/site/base" element={<Base />} />
      <Route path="/admin/site/base/edit" element={<BaseEdit />} />
      <Route path="/admin/ask" element={<Ask />} />
      <Route path="/admin/ask/detail/:id" element={<AskDetail />} />
      <Route path="/admin/strategy/recommend" element={<Recommend />} />
      <Route
        path="/admin/strategy/recommend/detail/:id"
        element={<RecommendDetail />}
      />
      <Route
        path="/admin/strategy/recommend/edit/:id"
        element={<RecommendEdit />}
      />
      <Route path="/admin/strategy/marketing" element={<Marketing />} />
      <Route
        path="/admin/strategy/marketing/detail/:id"
        element={<MarketingDetail />}
      />
      <Route
        path="/admin/strategy/marketing/edit/:id"
        element={<MarketingEdit />}
      />
      <Route path="/admin/strategy/marketing/add" element={<MarketingAdd />} />
    </Routes>
  );
};

export default AdminRouter;
