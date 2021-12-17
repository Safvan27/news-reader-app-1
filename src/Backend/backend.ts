import axios from "axios";
const getAllNews: any = async (
  searchTerm: string,
  sentiment: string,
  startDate: string,
  endDate: string,
  sourceId: string,
  categoryId: string
) => {
  const config: any = {
    method: "get",
    withCredentials: false,
    url: `/news-api/news/?q=${searchTerm}&sentiment=${sentiment}&start_date=${startDate}&end_date=${endDate}&source_id=${sourceId}&category_id=${categoryId}`,
    headers: {
      accept: "application/json",
      "x-api-key": "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE",
    },
  };
  try {
    const { data } = await axios(config);
    return data;
  } catch (error) {
    console.log(error);
  }
  // .then((res) => {
  //   return res;
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};
const getAllSources: any = () => {
  const config: any = {
    method: "get",
    withCredentials: false,
    url: "/news-api/sources/",
    headers: {
      accept: "application/json",
      "x-api-key": "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response?.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getAllCategory: any = () => {
  const config: any = {
    method: "get",
    withCredentials: false,
    url: "/news-api/categories/",
    headers: {
      accept: "application/json",
      "x-api-key": "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response?.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const BackendService = {
  getAllNews,
  getAllSources,
  getAllCategory,
};
export default BackendService;
