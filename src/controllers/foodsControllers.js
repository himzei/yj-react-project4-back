import axios from "axios";

export const getJoonguFoods = async (req, res) => {
  // api 요철
  axios({
    method: "GET",
    url: "https://www.daegufood.go.kr/kor/api/tasty.html?mode=json&addr=%EC%A4%91%EA%B5%AC",
  }).then((response) => res.send(response.data));
};
