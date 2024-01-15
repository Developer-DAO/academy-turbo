import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "ui";

export interface LessonInfoModalProps {
  buttonText: string;
  title?: string;
  children: React.ReactNode;
}

const LessonInfoModal = (props: LessonInfoModalProps): JSX.Element => {
  const { buttonText, title } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`mt-4 break-words bg-gray-700 text-sm font-bold h-[${
            buttonText.length > 30 ? "3.75rem" : "2.5rem"
          }`}
        >
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{props.children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LessonInfoModal;
