import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../../pages/auth/context";
import "./Layout.css";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { onLogout } = useAuth();

  return (
    <div className="layout">
      <Header onLogout={onLogout} />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
