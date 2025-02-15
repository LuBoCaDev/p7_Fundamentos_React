import { client } from "../../api/client";
import { Advert } from "./types";

const advertsUrl = "/api/v1/adverts";

export const getAdvert = async (advertId: string) => {
  const url = `${advertsUrl}/${advertId}`;
  const response = await client.get<Advert>(url);
  return response.data;
};

export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  return response.data;
};

export const createAdvert = async (advert: FormData) => {
  const response = await client.post<Advert>(advertsUrl, advert, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteAdvert = async (advertId: string) => {
  const url = `${advertsUrl}/${advertId}`;
  const response = await client.delete<Advert>(url);
  return response.data;
};
