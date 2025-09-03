import React from "react";
// ...existing code...

/**
 * Typography component for consistent text styles.
 * Usage:
 * <Typography variant="h1">Heading</Typography>
 * <Typography variant="body">Body text</Typography>
 */
const VARIANT_STYLES = {
  heading: "text-2xl font-semibold   text-gray-300 ", // Main heading
  subheading: "text-l font-semibold text-gray-300  ", // Sub heading
  paragraph: "text-[14px] text-gray-300 mb-2 font-sans", // Paragraph
    paragraph1: "text-[10px] text-gray-300 mb-2 font-sans",
  h1: "text-4xl font-bold text-gray-300 mb-4",
  h2: "text-3xl font-semibold text-gray-300 mb-3",
  h3: "text-sm text-gray-300 mb-2",
  subtitle: "text-xl font-medium text-gray-300 ",
  body: "text-base text-gray-300",
  caption: "text-l text-gray-300",
};

const Typography = ({ variant = "body", className = "", children, ...props }) => {
  const style = VARIANT_STYLES[variant] || VARIANT_STYLES.body;
  return (
    <span className={`${style} ${className}`} {...props}>
      {children}
    </span>
  );
};

// ...existing code...

export default Typography;
