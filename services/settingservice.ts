import api from "@/lib/axios";

export type SettingsPayload = {
  siteName: string;
  siteTagline: string;
  siteDescription: string;

  contact: {
    mapEmbedUrl: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };

  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    github: string;
  };

  seo: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    defaultOgImage: {
      url: string;
    };
  };

  footer: {
    copyrightText: string;
    privacyPolicyUrl: string;
    termsAndConditionsUrl: string;
  };

  logo: {
    url: string;
  };

  favicon: {
    url: string;
  };
};

export const settingservice = {
  get: async () => {
    const { data } = await api.get("/settings");
    return data;
  },

  update: async (payload: SettingsPayload) => {
    const { data } = await api.patch("/settings", payload);
    return data;
  },
};