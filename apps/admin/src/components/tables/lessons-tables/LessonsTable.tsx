import { useRouter } from "next/router";
import { DataTable,Heading, Separator } from "ui";
import { Button } from "ui";

// import { User } from "@/constants/data";
// import { Plus } from "lucide-react";
import { columns } from "./Columns";

interface ProductsClientProps {
  data: any[];
}

export const LessonsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    await router.push("lessons/create");
  };
  return (
    <div className="text-white">
      <div className="flex items-start justify-between ">
        <Heading title={`Lessons (${data.length})`} description="Manage Lessons" />
        <div className="mb-4 flex w-full justify-end">
          <Button onClick={handleCreateNewBtnClick}>Create New Lesson</Button>
        </div>
      </div>
      <Separator color="white" />
      <DataTable searchKey="lessonTitle" columns={columns} data={data} />
    </div>
  );
};
