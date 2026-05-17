"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code2,
  Undo2,
  Redo2,
  Link2,
  Highlighter,
  Table as TableIcon,
  Minus,
} from "lucide-react";

export type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
};

function ToolBtn({
  active,
  onClick,
  label,
  disabled,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`admin-editor-tool${active ? " admin-editor-tool--active" : ""}`}
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function buildEditorExtensions(placeholder: string) {
  return [
    StarterKit.configure({
      link: {
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      },
      underline: false,
    }),
    Underline,
    Highlight,
    TaskList,
    TaskItem.configure({ nested: true }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Placeholder.configure({ placeholder }),
  ];
}

export function RichTextEditorCore({
  value,
  onChange,
  placeholder,
  height = 320,
}: EditorProps) {
  const lastEmittedHtml = useRef<string | null>(null);
  const extensions = useMemo(
    () => buildEditorExtensions(placeholder || ""),
    [placeholder],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value || "",
    editorProps: {
      attributes: { class: "tiptap" },
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      lastEmittedHtml.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const incoming = value || "";
    if (
      lastEmittedHtml.current !== null &&
      lastEmittedHtml.current === incoming
    ) {
      lastEmittedHtml.current = null;
      return;
    }
    if (incoming === editor.getHTML()) return;
    editor.commands.setContent(incoming, { emitUpdate: false });
    lastEmittedHtml.current = null;
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl || "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="admin-editor">
      <div className="admin-editor-toolbar">
        <ToolBtn
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          label="Kop 1"
        >
          <Heading1 size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="Kop 2"
        >
          <Heading2 size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="Kop 3"
        >
          <Heading3 size={16} />
        </ToolBtn>
        <span className="admin-editor-sep" aria-hidden />
        <ToolBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Vet"
        >
          <Bold size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Cursief"
        >
          <Italic size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="Onderstrepen"
        >
          <UnderlineIcon size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="Doorhalen"
        >
          <Strikethrough size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          label="Markeren"
        >
          <Highlighter size={16} />
        </ToolBtn>
        <span className="admin-editor-sep" aria-hidden />
        <ToolBtn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="Lijst"
        >
          <List size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="Genummerde lijst"
        >
          <ListOrdered size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("taskList")}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          label="Takenlijst"
        >
          <ListChecks size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Citaat"
        >
          <Quote size={16} />
        </ToolBtn>
        <span className="admin-editor-sep" aria-hidden />
        <ToolBtn
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          label="Links uitlijnen"
        >
          <AlignLeft size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          label="Centreren"
        >
          <AlignCenter size={16} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          label="Rechts uitlijnen"
        >
          <AlignRight size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={setLink}
          label="Link"
        >
          <Link2 size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          label="Tabel"
        >
          <TableIcon size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Horizontale lijn"
        >
          <Minus size={16} />
        </ToolBtn>
        <span className="admin-editor-sep" aria-hidden />
        <ToolBtn
          onClick={() => editor.chain().focus().undo().run()}
          label="Ongedaan maken"
          disabled={!editor.can().undo()}
        >
          <Undo2 size={16} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().redo().run()}
          label="Opnieuw"
          disabled={!editor.can().redo()}
        >
          <Redo2 size={16} />
        </ToolBtn>
      </div>
      <div className="admin-editor-body" style={{ maxHeight: height }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
