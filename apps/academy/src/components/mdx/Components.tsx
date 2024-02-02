import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import { CopyToClipboard } from "@/components/CopyToClipboard";
import Callout from "@/components/mdx/Callout";
import LessonInformationalModal from "@/components/mdx/LessonInformationalModal";
import LessonQuestionsModal from "@/components/mdx/LessonQuestionsModal";
import Question from "@/components/mdx/Question";
import Quiz from "@/components/mdx/Quiz";
import QuizStatusChecker from "@/components/mdx/QuizStatusChecker";
import SideDrawer from "@/components/mdx/SideDrawer";

const Components = {
  code: (props: any) => {
    const [, language] =
      props.className !== undefined && props.className.length > 0
        ? props.className.match(/language-(\w+)/)
        : [];

    if (language !== undefined) {
      return (
        <div className="relative">
          <SyntaxHighlighter language={language} {...props} style={dracula} />
          <CopyToClipboard {...props} />
        </div>
      );
    }

    // return <Code fontSize="md" wordBreak="break-all" {...props} />;
    return <span className="text-md inline-code break-all" {...props} />;
  },
  h1: (props: any) => <h1 apply="mdx.h1" className="h1" {...props} />,
  h2: (props: any) => <h2 apply="mdx.h2" className="h2" {...props} />,
  h3: (props: any) => <h3 apply="mdx.h3" className="h3" {...props} />,
  h4: (props: any) => <h4 apply="mdx.h4" className="h4" {...props} />,
  p: (props: any) => <p apply="mdx.p" className="mdx-p text-xl" {...props} />,
  a: (props: any) => <a apply="mdx.a" className="mdx-a" {...props} />,
  ul: (props: any) => <ul apply="mdx.ul" className="mdx-ul text-xl" {...props} />,
  ol: (props: any) => <ol apply="mdx.ol" className="mdx-ol text-xl" {...props} />,
  img: (props: any) => <img apply="mdx.image" className="m-0" alt="" {...props} />,
  SideDrawer,
  Callout,
  QuizStatusChecker,
  Quiz,
  Question,
  LessonQuestionsModal,
  LessonInformationalModal,
};

export default Components;
