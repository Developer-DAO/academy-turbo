import type { Contributors } from "database";
import { useRouter } from "next/router";
import { DataTable, Heading, Separator } from "ui";
import { Button } from "ui";

import { columns } from "./Columns";

interface ProductsClientProps {
  data: Contributors[];
}

export const ContributorsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    await router.push("contributors/create");
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading title={`Contributors (${data.length})`} description="Manage Contributors" />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Create New Contributor
          </Button>
        </div>
      </div>
      <Separator color="white" />
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};
