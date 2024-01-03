import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import { CopyToClipboard } from "@/components/CopyToClipboard";
import Callout from "@/components/mdx/Callout";
import Question from "@/components/mdx/Question";
// import SideDrawer from "@/components/mdx/SideDrawer";
import Quiz from "@/components/mdx/Quiz";

const Components = {
  code: (props: any) => {
    const [, language] =
      props.className !== undefined ? props.className.match(/language-(\w+)/) : [];

    if (language !== undefined) {
      return (
        <div className="relative">
          <SyntaxHighlighter language={language} {...props} style={dracula} />
          <CopyToClipboard {...props} />
        </div>
      );
    }

    // return <Code fontSize="md" wordBreak="break-all" {...props} />;
    return <div className="text-md break-all" {...props} />;
  },
  h1: (props: any) => <h1 apply="mdx.h1" className="text-4xl" {...props} />,
  h2: (props: any) => <h2 apply="mdx.h2" className="text-3xl" {...props} />,
  h3: (props: any) => <h3 apply="mdx.h3" className="text-2xl" {...props} />,
  h4: (props: any) => <h4 apply="mdx.h4" className="text-xl" {...props} />,
  p: (props: any) => <p apply="mdx.p" className="text-xl" {...props} />,
  a: (props: any) => <a apply="mdx.a" {...props} />,
  ul: (props: any) => <ul apply="mdx.ul" className="text-xl" {...props} />,
  img: (props: any) => <img apply="mdx.image" className="m-0" alt="" {...props} />,
  // SideDrawer,
  Callout,
  Quiz,
  Question,
};

export default Components;
