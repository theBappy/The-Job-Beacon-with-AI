"use client"

import { cn } from "@/lib/utils";
import { MDXEditorProps, MDXEditorMethods, MDXEditor } from "@mdxeditor/editor";
import { Ref } from "react";
import { useIsDarkMode } from "../use-is-dark-mode";

export default function InternalMarkdownEditor({
  ref,
  className,
  ...props
}: MDXEditorProps & { ref?: Ref<MDXEditorMethods> }) {
  const isDarkMode = useIsDarkMode();
  return (
    <MDXEditor
      {...props}
      className={cn(MarkdownClassNames, isDarkMode && "dark-theme", className)}
    />
  );
}
