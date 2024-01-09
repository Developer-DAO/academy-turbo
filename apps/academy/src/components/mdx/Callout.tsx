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
    <div /*__css={styles} */ className="m-4 rounded-2xl bg-[#1d1e20] p-3 px-4" {...rest}>
      <div className="flex flex-row gap-4">
        <div className="mt-3 text-2xl">{emoji}</div>
        <div className="max-w-[90%]">{children}</div>
      </div>
    </div>
  );
};

export default Callout;
