// result 상단쿼리 결과임
const result = [
  {
    name: "자장면",
    cnt: 1,
    levelOne: false,
    craft: [
      { name: "면", cnt: 5 },
      { name: "오이", cnt: 1 },
    ],
  },
  {
    name: "면",
    cnt: 1,
    levelOne: false,
    craft: [
      { name: "밀가루", cnt: 5 },
      { name: "물", cnt: 1 },
    ],
  },
  {
    name: "밀가루",
    cnt: 1,
    levelOne: false,
    craft: [{ name: "밀", cnt: 10 }],
  },
  {
    name: "물",
    cnt: 1,
    levelOne: true,
    craft: [],
  },
  {
    name: "밀",
    cnt: 1,
    levelOne: true,
    craft: [],
  },
  {
    name: "오이",
    cnt: 1,
    levelOne: true,
    craft: [],
  },
]

// 오브젝트로 저장
const resultObj = {}
for (let i = 0; i < result.length; i++) {
  const name = result[i].name
  resultObj[name] = result[i]
}

// craft 얻어오는 재귀함수
const getCraft = o => {
  if (o.levelOne) {
    return []
  }

  const cc = o.craft.map((v, index) => {
    if (!resultObj[v.name].levelOne) {
      return {
        ...v,
        levelOne: resultObj[v.name].levelOne,
        craft: getCraft({
          ...v,
          levelOne: resultObj[v.name].levelOne,
          craft: resultObj[v.name].craft,
        }),
      }
    }
    return {
      ...v,
      levelOne: resultObj[v.name].levelOne,
      craft: resultObj[v.name].craft,
    }
  })
  return cc
}

// 상세 상단에서 사용할 최종형태
const finalResult = result.map(v => {
  return {
    ...v,
    craft: getCraft(v),
  }
})

console.log(JSON.stringify(finalResult))
