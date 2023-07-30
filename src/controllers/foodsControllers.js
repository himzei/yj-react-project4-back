import axios from "axios";

export const getJoonguFoods = async (req, res) => {
  // api 요철
  axios({
    method: "GET",
    url: "https://www.daegufood.go.kr/kor/api/tasty.html?mode=json&addr=중구",
  }).then((response) => res.json({ ok: "true", data: response.data }));
};
