import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoryRegisterPage from '../pages/CategoryRegisterPage';
import BasicLayout from "../../layouts/BasicLayout";

const AppRouter = () => {
    return (
        <Router>
            <BasicLayout>
                <Route path="/categories/register" component={CategoryRegisterPage} />
                {/* 다른 페이지 라우팅 설정 */}
            </BasicLayout>
        </Router>
    );
};

export default AppRouter;