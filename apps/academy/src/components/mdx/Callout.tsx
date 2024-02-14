import React from "react";

export interface CalloutProps {
  // [x: string]: any;
  // size?: string;
  // variant?: string;
  emoji: string;
  children: React.ReactNode;
}

const Callout = (props: CalloutProps): JSX.Element => {
  const { /* size, variant, */ emoji, children, ...rest } = props;

  // const styles = useStyleConfig("Callout", { size, variant });
  return (
    <div /*__css={styles} */ className="rounded-2xl bg-[#1d1e20] lg:m-4 lg:p-3 lg:px-4" {...rest}>
      <div className="flex flex-row gap-4 ">
        <div className="mt-3 text-xl lg:text-2xl">{emoji}</div>
        <div className="max-w-[90%] text-sm lg:text-xl">{children}</div>
      </div>
    </div>
  );
};

export default Callout;
