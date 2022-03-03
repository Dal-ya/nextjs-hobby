import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { chunk, includes, shuffle, take, tail } from "lodash";
import useLayoutEffect from "../../hooks/use-isomorphic-layout-effect";

export default function Tournament({ items = [] }) {
  const [itemList, setItemList] = useState([]); // 모든 아이템 리스트
  const [tournamentList, setTournamentList] = useState([]); // 실제 경기에 참여하는 아이템 리스트
  const [winnerList, setWinnerList] = useState([]); // 부분 경기에서 승리한 우승 아이템 리스트
  const [finalWinner, setFinalWinner] = useState(null); // 최종 우승 아이템
  const [enableRoundList] = useState([4, 8, 16, 32]); // 64, 128, 256... 가능 라운드 지정하기 (고정값)
  const [maxRoundList, setMaxRoundList] = useState([]); // 가능한 최대 라운드 리스트 (아이템이 5개면 4라운드가 최고)
  const [currentRound, setCurrentRound] = useState(0); // 현재 라운드
  const [displayInfo, setDisplayInfo] = useState({}); // *강 */* 현재 몇 강인지 표시
  const [isGameStart, setIsGameStart] = useState(false); // 게임 시작 여부

  const router = useRouter();

  const initTournament = round => {
    console.log("init tournament! round: ", round);

    if (!includes(enableRoundList, round)) {
      console.log("지원하지 않는 라운드 입니다!");
      return;
    }

    if (!isGameStart) {
      const takeList = take(shuffle([...itemList]), round);
      setTournamentList(chunk(takeList, 2));
      setIsGameStart(true);
      setCurrentRound(round);
    }
  };

  /* 2의 거듭제곱 확인 함수 -> 2의 거듭제곱이면 true */
  const isPowerOfTwo = (num) => {
    return !(num & (num - 1)); // & --> 비트연산자
  };

  /* display --> "<round>강 <times>/<total>"  ex) 4강 1/2 */
  const displayRound = useRef(0);
  const displayTotal = useRef(0);
  const displayTimes = useRef(0);

  const countRound = () => {
    if (isPowerOfTwo(currentRound)) {
      displayRound.current = currentRound;
      displayTotal.current = currentRound / 2;
      displayTimes.current = 1;
    } else {
      displayTimes.current += 1;
    }
  };

  const enterWinners = (winner) => {
    setWinnerList(prevState => [...prevState, winner]);
    setTournamentList(tail(tournamentList));
    setCurrentRound(prevState => prevState - 1);
  };

  const retryTournament = () => {
    setIsGameStart(false);
    setFinalWinner(null);
    setTournamentList([]);
    setWinnerList([]);
    setCurrentRound(0);
  };

  useEffect(() => {
    setItemList([...items]);
  }, []);

  useEffect(() => {
    setMaxRoundList(
      enableRoundList.filter(round => round <= itemList.length),
    );
  }, [itemList]);

  useLayoutEffect(() => {
    if (tournamentList.length === 0) {
      setIsGameStart(false);

      if (winnerList.length > 1) {
        setTournamentList(chunk(shuffle([...winnerList]), 2));
        setWinnerList([]);
        setIsGameStart(true);
      }

      if (winnerList.length === 1) {
        setFinalWinner(winnerList[0]);
      }
    }
  }, [tournamentList]);

  useEffect(() => {
    countRound();
    setDisplayInfo({
      round: displayRound.current,
      total: displayTotal.current,
      times: displayTimes.current,
    });
  }, [currentRound]);

  useEffect(() => {
    console.log("finalWinner: ", finalWinner);
    if (finalWinner) {
      retryTournament();
      router.push(`/games/worldcup/results/${finalWinner.id}`);
    }
  }, [finalWinner]);

  return (
    <div>
      <div className="container">
        <div>
          {!isGameStart && !finalWinner && (
            <div>
              <h4 className="pt-8 text-center text-slate-900
                             text-xl font-semibold"
              >
                라운드를 선택하세요
              </h4>
              <div className="pb-16 pt-8 grid grid-cols-1 gap-2">
                {maxRoundList.map(round => (
                  <div key={round}
                       onClick={() => initTournament(round)}
                       className="group p-1.5 w-1/2 mx-auto border border-solid
                                  border-slate-900 rounded-md overflow-hidden
                                  hover:bg-sky-500 hover:ring-sky-500
                                  cursor-pointer"
                  >
                    <p className="text-center
                                  group-hover:text-white"
                    >
                      Round {round}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {isGameStart && (
            <div className="mt-4 text-center font-semibold text-xl bg-slate-700
                            text-white rounded-sm"

            >
              {currentRound === 2 ?
                <div>Final</div> :
                <div>
                  {displayInfo.round}강 {displayInfo.times}/{displayInfo.total}
                </div>
              }
            </div>
          )}
        </div>

        <div>
          {isGameStart && (tournamentList.length > 0) && (
            <div className="relative">
              <div className="pt-2">
                <div className=""
                     onClick={() => (enterWinners(tournamentList[0][0]))}
                >
                  <div className="text-center font-semibold border-solid
                                  border-b-blue-100 border-2"
                  >
                    {tournamentList[0][0].title}
                  </div>
                  <Image className="rounded-sm"
                         src={tournamentList[0][0].img}
                         width={300}
                         height={200}
                         layout={"responsive"}
                  />
                </div>

                <div className="w-10 h-10 bg-amber-500 text-white font-bold
                                text-center leading-8 rounded-full absolute
                                z-10 top-1/2 left-1/2 translate-x-[-50%]
                                translate-y-[-50%] border-2 border-gray-400"
                >
                  vs
                </div>

                <div className="mt-2"
                     onClick={() => (enterWinners(tournamentList[0][1]))}
                >
                  <Image className="rounded-sm"
                         src={tournamentList[0][1].img}
                         width={300}
                         height={200}
                         layout={"responsive"} />
                  <div className="text-center font-semibold border-solid
                                  border-b-blue-100 border-2"
                  >
                    {tournamentList[0][1].title}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*<div>
          {finalWinner && (
            <div>
              <div className="bg-slate-700 text-white text-center text-xl
                              rounded-sm mt-4 p-2"
              >
                Win {finalWinner.title} 👑
              </div>
              <div>
                <Image src={finalWinner.img}
                       width={300}
                       height={200}
                       layout={"responsive"}
                />
              </div>

              <div>
                <div className="mx-auto mt-4 p-2 w-32 border-2 border-slate-400
                                shadow-sm text-center rounded-md cursor-pointer"
                     onClick={retryTournament}
                >
                  다시하기
                </div>
              </div>
            </div>
          )}
        </div>*/}

      </div>
    </div>
  );
}
