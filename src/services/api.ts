import axios from "axios";

export const apiCovid = axios.create({
  baseURL: "https://covid19-brazil-api.now.sh/api/report/v1",
});

export const apiUf = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/",
});
