"use client";

import Table from "@/components/common/table/Table";
import TableHead from "@/components/common/table/TableHead";
import TableBody from "@/components/common/table/Tablebody";

import { CmsPage } from "@/types/cms";
import ViewCmsModal  from "./ViewCmsModal";
import  DeleteCmsModal  from "./DeleteCmsModal";
import EditCmsModal  from './EditCmsModal'

import CmsStatusBadge from "./CmsStatusBadge";
import { useState} from 'react'
import CmsActionMenu from "./CmsActionMenu";
import { useRouter } from "next/navigation";
import useCmsPages from "@/hooks/useCms";
import { cmsService } from "@/services/cms.service";


interface CmsTableProps {
  pages: CmsPage[];
}

export default function CmsTable({
  pages,
}: CmsTableProps)
  {const [selectedPage, setSelectedPage] = useState<CmsPage | null>(null);
 const {  pages: cmsPages } = useCmsPages();
 const [openView, setOpenView] = useState(false);
 const [openEdit, setOpenEdit] = useState(false);
 const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();
  const handleView = async (id: string) => {
    console.log("View ID:", id)
  try {
    const res = await cmsService.view(id);

    console.log(res);

    setSelectedPage(res.data);

    setOpenView(true);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
    <Table>
      <TableHead>
        <tr className="text-left">
          <th className="px-6 py-4">Title</th>
          <th>Slug</th>
          <th>Status</th>
          <th>Author</th>
          <th>Updated</th>
          <th className="text-center">
            Actions
          </th>
        </tr>
      </TableHead>

      <TableBody>
        {cmsPages.map((page:any) => (
          <tr
            key={page._id}
            className="hover:bg-slate-50"
          >
            <td className="px-6 py-4 font-medium">
              {page.title}
            </td>

            <td>/{page.slug}</td>

            <td>
              <CmsStatusBadge
                status={page.status}
              />
            </td>

            <td>{page.createdBy.name}</td>

            <td>{page.updatedAt}</td>

            <td className="relative overflow-visible text-center">
             <CmsActionMenu
  onView={() => {
    handleView(page._id);
  }}
  onEdit={() => {
    setSelectedPage(page);
    setOpenEdit(true);
  }}
  onDelete={() => {
    setSelectedPage(page);
    setOpenDelete(true);
  }}
   onPreview={() =>
        router.push(`/dashboard/cms-pages/preview/${page._id}`)
    }
/>
            </td>
          </tr>
        ))}
        
      </TableBody>
    </Table>
<ViewCmsModal
  open={openView}
  page={selectedPage}
  onClose={() => setOpenView(false)}
/>

<EditCmsModal
  open={openEdit}
  page={selectedPage}
  onClose={() => setOpenEdit(false)}
/>

<DeleteCmsModal
  open={openDelete}
  page={selectedPage}
  onClose={() => setOpenDelete(false)}
  onConfirm={() => {
    console.log(selectedPage);
    setOpenDelete(false);
  }}
/>
</>
    
  );
}