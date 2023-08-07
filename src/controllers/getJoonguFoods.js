export const getJoonguFoods = async (req, res) => {
  console.log("api");
  await fetch(
    "https://api.odcloud.kr/api/15052602/v1/uddi:855807e2-fe8a-4e47-8a5a-ce1894e410d7_201909031553?page=1&perPage=10&serviceKey=I3ONCgSdg1Tf8GYukQdpJYSpq7nLY9Uqy3AE1Zp%2B1tx1r11%2BDj5djJKCEllItBS2WtgL318%2BX93ZNZ5K5RHSsA%3D%3D"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.send(data);
    });
};
