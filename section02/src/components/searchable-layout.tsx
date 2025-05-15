import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <form className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요 ..."
        />
        <button type="submit" onClick={onSubmit}>
          검색
        </button>
      </form>
      {children}
    </div>
  );
}
