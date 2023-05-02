import React, { ReactNode } from 'react';
import MenuAdminPage from "./MenuAdminPage";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <MenuAdminPage />
      <main>{children}</main>
    </>
  );
};
