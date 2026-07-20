import api from "@/lib/axios";
import {
  CreateCmsPagePayload,
  CreateCmsPageResponse,
} from "@/types/cms";

export const cmsService = {
  create: async (
    payload: CreateCmsPagePayload
  ): Promise<CreateCmsPageResponse> => {
    const { data } = await api.post(
      "/cmsPages/cms",
      payload
    );

    return data;
  },
  view: async (id: string) => {
  const { data } = await api.get(`/cmsPages/cms/${id}`);
  return data;
},
getAll: async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const { data } = await api.get("/cmsPages/cms", {
    params,
  });

  return data;
},
 async getPageById(id: string) {
    const { data } = await api.get(`/cmsPages/cms/${id}`);
    return data;
  },
update: async (
  id: string,
  payload: {
    title: string;
    slug: string;
    description: string;
    content: {
      hero: {
        title: string;
        subtitle: string;
      };
    };
    featuredImage: string;
  }
) => {
   try {
    const { data } = await api.post("/cmsPages/cms", payload);
    return data;
  } catch (error: any) {
    console.log("Response:", error.response?.data);
    console.log("Payload:", payload);
    throw error;
  }
},
updateStatus: async (
  id: string,
  status: "DRAFT" | "PUBLISHED"
) => {
  const { data } = await api.patch(
    `/cmsPages/cms/${id}/status`,
    {
      status,
    }
  );

  return data;
},
uploadMedia: async (formData: FormData) => {
  const { data } = await api.post(
    "/cms/media",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
    console.log("Upload Response:", data);
  return data;

},
};
