import Searchbar from "@/components/searchbar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
