import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
                {children}
            </main>
        </div>
    );
};

export default Layout;
