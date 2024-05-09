import { useRouter } from "next/router";
import { DataTable, Heading, Separator } from "ui";
import { Button } from "ui";

import { columns } from "./Columns";
// import { Lessons } from "database";

interface ProductsClientProps {
  data: any; // Lessons["contributors"];
}

export const TrackAuthorTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    const trackId = router.query["trackId"];
    await router.push(`/tracks/${trackId as string}/newauthor`);
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading title={`Author`} /* (${data})`} */ description="Manage Author" />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Add Author
          </Button>
        </div>
      </div>
      <Separator color="black" />
      <DataTable searchKey="contributor.name" columns={columns} data={data} />
    </div>
  );
};
