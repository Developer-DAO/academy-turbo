import { useRouter } from "next/router";
import { DataTable, Heading, Separator } from "ui";
import { Button } from "ui";

import { columns } from "./Columns";
// import { Lessons } from "database";

interface ProductsClientProps {
  data: any; // Lessons["contributors"];
}

export const LessonsContributorsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    const lessonId = router.query["lessonId"];
    await router.push(`/lessons/${lessonId as string}/newcontributor`);
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading title={`Contributors`} /* (${data})`} */ description="Manage Contributors" />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Add new Contributor
          </Button>
        </div>
      </div>
      <Separator color="black" />
      <DataTable searchKey="contributor.name" columns={columns} data={data} />
    </div>
  );
};
