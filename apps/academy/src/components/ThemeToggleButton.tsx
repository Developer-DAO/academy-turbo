import { Icons } from "ui";

interface Props {
  hidden: boolean;
}

const ThemeToggleButton = ({ hidden }: Props) => {
  return (
    <button disabled className={`${hidden ? "hover:cursor-none" : "lg:block"} hidden`}>
      <Icons.moon_light className="h-[25px] w-[25px] rounded-full border p-[0.2px]" />
    </button>
  );
};

export default ThemeToggleButton;
