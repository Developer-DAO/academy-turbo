import { Button,Icons } from "ui";

interface Props {
  children: string;
}

export const CopyToClipboard = ({ children }: Props) => {
  return (
    <div className="border-1 border-silver rounded-5 absolute right-1 top-1 z-10 bg-gray-700">
      <Button onClick={() => void navigator.clipboard.writeText(children)}>
        <Icons.copy_icon />
      </Button>
    </div>
  );
};
