import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import styles from "../../styles/Worldcup.module.scss";
import Tournament from "../../components/Tournament";

/** mock data */
const items = [
  {
    id: "1",
    title: "돈까스",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/katsu.jpg",
    info: "맛있는 돈까스",
    url: "",
  },
  {
    id: "2",
    title: "비빔밥",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/bibimbab.jpg",
    info: "",
    url: "",
  },
  {
    id: "3",
    title: "스시",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/sushi.jpg",
    info: "",
    url: "",
  },
  {
    id: "4",
    title: "스테이크",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/stake.jpg",
    info: "",
    url: "",
  },
  {
    id: "5",
    title: "김치찌개",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/kimchisoup.png",
    info: "",
    url: "",
  },
  {
    id: "6",
    title: "피자",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/pizza.jpg",
    info: "",
    url: "",
  },
  {
    id: "7",
    title: "라면",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/ramen.jpg",
    info: "",
    url: "",
  },
  {
    id: "8",
    title: "카레",
    img: "https://next-js-worldcup-foods.s3.ap-northeast-2.amazonaws.com/curry.jpg",
    info: "",
    url: "",
  },
];

export default function Worldcup() {
  const router = useRouter();

  return (
    <>
      <Header title="WorldCup"
              url={process.env.NEXT_PUBLIC_PUBLIC_URL + router.pathname}
      />
      <div className="w-full h-screen bg-fuchsia-50">
        <div className="max-w-sm mx-auto h-full bg-white">
          <NavBar />
          <Tournament items={items} />
        </div>
      </div>
    </>
  );
}
