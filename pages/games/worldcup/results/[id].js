import { useRouter } from "next/router";
import { foodItems } from "../../../../data";
import Image from "next/image";

const WorldcupResult = () => {
  const router = useRouter();
  const { id } = router.query;
  const resultFood = foodItems.find(food => food.id === id);
  console.log("resultFood: ", resultFood);

  return (
    <div className="w-full h-screen bg-fuchsia-50">
      <div className="max-w-sm mx-auto h-full bg-white">
        <div>
          <div className="bg-slate-700 text-white text-center text-xl
                              rounded-sm mt-4 p-2"
          >
            Win {resultFood.title} 👑
          </div>
          <div>
            <Image src={resultFood.img}
                   width={300}
                   height={200}
                   layout={"responsive"}
            />
            <div>
              <button className="mx-auto mt-4 p-2 w-32 border-2 border-slate-400
                              shadow-sm text-center rounded-md cursor-pointer
                              block"
                      onClick={() => {
                        router.push("/games/worldcup");
                      }}
              >
                다시하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldcupResult;
