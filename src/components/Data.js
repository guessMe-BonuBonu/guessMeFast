export const dataSet = [
  {
    id: 1,
    que: "나의 공강은 몇일?",
    ans: ["1일", "2~3일", "4일", "없음"],
  },
  {
    id: 2,
    que: "좋아하는 학식 메뉴는?",
    ans: ["세종대왕돈까스", "육회비빔밥", "소금구이덮밥", "쫑쫑덮밥"],
  },
  {
    id: 3,
    que: "나의 통학 시간은?",
    ans: ["~30분", "30분~1시간", "1시간~2시간", "2시간 이상"],
  },
  {
    id: 4,
    que: "나는 계획형일까 즉흥형일까?",
    ans: ["계획형", "즉흥형"],
  },
  {
    id: 5,
    que: "좋아하는 영화 취향?",
    ans: ["로맨스", "스릴러/공포", "판타지", "액션/코미디"],
  },
  {
    id: 6,
    que: "힘들 때 하는 일?",
    ans: ["울기", "술마시기", "친구만나기", "게임하기"],
  },
  {
    id: 7,
    que: "내가 호감가는 상대에게 하는 행동은?",
    ans: ["들이댄다", "긴장한다", "잘 챙겨준다", "선톡한다"],
  },
  {
    id: 8,
    que: "내 혈액형은?",
    ans: ["A형", "B형", "AB형", "O형"],
  },
  {
    id: 9,
    que: "내가 좋아하는 계절은?",
    ans: ["봄", "여름", "가을", "겨울"],
  },
  {
    id: 10,
    que: "내가 애인으로 선호하는 유형은?",
    ans: ["연상", "연하", "동갑", "상관 없음"],
  },
  {
    id: 11,
    que: "내가 좋아하는 음악 장르는?",
    ans: ["발라드", "댄스", "힙합", "팝송"],
  },
  {
    id: 12,
    que: "내 이상형은?",
    ans: ["고양이상", "강아지상", "여우상", "곰돌이상"],
  },
];

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// dataSet에서 중복 없이 랜덤하게 n개의 항목 선택
const getRandomSubset = (array, count) => {
  if (count > array.length) {
    console.error("요청한 항목 수가 배열의 길이보다 큽니다.");
    return null;
  }

  const shuffledArray = shuffleArray([...array]);
  return shuffledArray.slice(0, count);
};

// 사용 예시
export const randomSubset = getRandomSubset(dataSet, 10);

//axios
