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
deletePage(id: string) {
  return api.delete(`/cmsPages/cms/${id}`);
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
  payload: CreateCmsPagePayload
) => {
  const { data } = await api.patch(`/cmsPages/cms/${id}`, payload);
  return data;
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

  getAllMedia(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    return api.get("/cms/media", {
      params,
    });
  },

  getMediaById(id: string) {
    return api.get(`/cms/media/${id}`);
  },

  deleteMedia(id: string) {
    return api.delete(`/cms/media/${id}`);
  },
};
