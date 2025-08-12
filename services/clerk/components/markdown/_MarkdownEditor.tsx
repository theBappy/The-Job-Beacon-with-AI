"use client";

import { cn } from "@/lib/utils";
import { MDXEditorProps, MDXEditorMethods, MDXEditor } from "@mdxeditor/editor";
import { Ref } from "react";
import { useIsDarkMode } from "../use-is-dark-mode";

export const markdownClassNames =
  "max-w-none prose prose-neutral dark:prose-invert font-sans";

export default function InternalMarkdownEditor({
  ref,
  className,
  ...props
}: MDXEditorProps & { ref?: Ref<MDXEditorMethods> }) {
  const isDarkMode = useIsDarkMode();
  return (
    <MDXEditor
      {...props}
      ref={ref}
      className={cn(markdownClassNames, isDarkMode && "dark-theme", className)}
    />
  );
}
