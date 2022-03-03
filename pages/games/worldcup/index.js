import NavBar from "../../../components/NavBar";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import Tournament from "../../../components/Tournament";
import { foodItems } from "../../../data";

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
          <Tournament items={foodItems} />
        </div>
      </div>
    </>
  );
}
