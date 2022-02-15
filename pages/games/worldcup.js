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
    img: "",
    info: "",
    url: "",
  },
  {
    id: "2",
    title: "비빔밥",
    img: "",
    info: "",
    url: "",
  },
  {
    id: "3",
    title: "스시",
    img: "",
    info: "",
    url: "",
  },
  {
    id: "4",
    title: "스테이크",
    img: "",
    info: "",
    url: "",
  },
  {
    id: "5",
    title: "김치찌개",
    img: "",
    info: "",
    url: "",
  },
  {
    id: "6",
    title: "피자",
    img: "",
    info: "",
    url: "",
  },
  {
    id: "7",
    title: "라면",
    img: "",
    info: "",
    url: "",
  },
  {
    id: "8",
    title: "카레",
    img: "",
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
      <div className="max-w-sm mx-auto border-dashed border-2 border-sky-500">
        <NavBar />
        <Tournament items={items} />
      </div>
    </>
  );
}
