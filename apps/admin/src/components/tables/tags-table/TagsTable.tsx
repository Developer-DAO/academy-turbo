import { useRouter } from "next/router";
import { DataTable, Heading, Separator } from "ui";
import { Button } from "ui";

// import { User } from "@/constants/data";
// import { Plus } from "lucide-react";
import { columns } from "./Columns";

interface ProductsClientProps {
  data: any[];
}

export const TagsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    await router.push("tags/create");
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading title={`Tags (${data.length})`} description="Manage Tags" />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Create New Tag
          </Button>
        </div>
      </div>
      <Separator color="white" />
      <DataTable searchKey="tagName" columns={columns} data={data} />
    </div>
  );
};
