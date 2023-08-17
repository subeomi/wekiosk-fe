import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const checkNull = (obj) => {

  const result = {}

  for (const attr in obj) {
    const attrName = attr
    const attrValue = obj[attr]

    if (attrValue && attrValue !== 'null') {
      result[attrName] = attrValue
    }
  }

  return result
}

const useQueryObj = () => {

  const [search, setSearch] = useSearchParams() // 쿼리스트링 수집 후 객체로 만듬
  const navigate = useNavigate()

  const page = search.get("page") || 1
  const size = search.get("size") || 5
  const type = search.get("type")
  const keyword = search.get("keyword")

  const queryObj = checkNull({ page, size, type, keyword })

  const moveList = () => {

    const queryString = createSearchParams(queryObj).toString()

    navigate(`../list?${queryString}`)

  }

  const moveRead = (bno) => {

    console.log("moveRead: " + bno)

    const queryString = createSearchParams(queryObj).toString()

    navigate(`../read/${bno}?${queryString}`)

  }

  const moveModify = (bno) => {

    console.log("moveRead: " + bno)

    const queryString = createSearchParams(queryObj).toString()

    navigate(`../modify/${bno}?${queryString}`)

  }

  return { queryObj, setSearch, moveList, moveRead, moveModify }
  
}

export default useQueryObj;