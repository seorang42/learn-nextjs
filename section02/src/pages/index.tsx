// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-items";
import { InferGetServerSidePropsType } from "next";

// SSR 방식으로 사전 렌더링
export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수

  // window.location; 오류 발생 - 서버에선 브라우저에 접근할 수 없음
  console.log("SSR"); // 서버 콘솔에만 표시

  const data = "hello";

  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  // window.location; 오류 발생 - 서버에서 사전 렌더링 시 window가 undefined
  useEffect(() => {
    // useEffect()는 컴포넌트가 마운트 된 이후 실행되기 때문에
    // window 객체가 존재
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// getLayout 메서드 정의
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
