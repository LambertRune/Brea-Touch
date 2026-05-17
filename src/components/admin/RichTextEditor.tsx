"use client";

import { RichTextEditorCore } from "./RichTextEditorCore";

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  return (
    <RichTextEditorCore
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      height={280}
    />
  );
}
