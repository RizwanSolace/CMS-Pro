import api from "@/lib/axios";
import { BuilderBlock } from "@/types/builder";

export const cmsBuilderService = {
  savePage: async (
    id: string,
    blocks: BuilderBlock[]
  ) => {
    const { data } = await api.put(`/cms-pages/${id}/builder`, {
      blocks,
    });

    return data;
  },
};
