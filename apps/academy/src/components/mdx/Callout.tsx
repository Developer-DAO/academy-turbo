import React from "react";

export interface CalloutProps {
  [x: string]: any;
  // size?: string;
  // variant?: string;
  emoji: string;
  children: React.ReactNode;
}

const Callout = (props: CalloutProps): JSX.Element => {
  const { /* size, variant, */ emoji, children, ...rest } = props;

  // const styles = useStyleConfig("Callout", { size, variant });
  return (
    <div /*__css={styles} */ {...rest}>
      <div className="flex border-spacing-4 flex-row">
        <div className="mt-3 text-2xl">{emoji}</div>
        <div className="max-w-[90%]">{children}</div>
      </div>
    </div>
  );
};

export default Callout;
