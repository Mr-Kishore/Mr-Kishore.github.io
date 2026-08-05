import portfolioData from "./data/portfolioData.json";

export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://mr-kishore.vercel.app";

export const config = {
  ...portfolioData,
  siteUrl: SITE_URL,
};

