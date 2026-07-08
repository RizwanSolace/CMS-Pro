import api from "@/lib/axios";
import { BuilderBlock } from "@/types/builder";

export const cmsBuilderService = {
  savePage: async (
    id: string,
    blocks: BuilderBlock[]
  ) => {
    return api.put(`/cms-pages/${id}/builder`, {
      blocks,
    });
  },
};