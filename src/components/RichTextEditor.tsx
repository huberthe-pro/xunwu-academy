"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading1, Heading2, List, ListOrdered, ImageIcon, Eraser 
} from 'lucide-react'
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        
        if (file.size > 5 * 1024 * 1024) {
          alert("图片大小不能超过 5MB！");
          return;
        }

        try {
          setIsUploading(true);
          const supabase = createClient();
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from("xunwu-images")
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from("xunwu-images")
            .getPublicUrl(fileName);

          editor.chain().focus().setImage({ src: data.publicUrl }).run();
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("上传图片失败，请重试");
        } finally {
          setIsUploading(false);
        }
      }
    };
  };

  const btnClass = (isActive: boolean) =>
    `p-2 hover:bg-[var(--color-ink-100)] transition-colors rounded ${
      isActive ? 'bg-[var(--color-ink-200)] text-[var(--color-ink-900)]' : 'text-[var(--color-ink-600)]'
    }`;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--color-ink-200)] bg-white/40">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="粗体"><Bold className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="斜体"><Italic className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="下划线"><UnderlineIcon className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))} title="删除线"><Strikethrough className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-[var(--color-ink-200)] mx-1 self-center"></div>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="主标题"><Heading1 className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))} title="行文节点"><Heading2 className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-[var(--color-ink-200)] mx-1 self-center"></div>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="点阵列表"><List className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="条目"><ListOrdered className="w-4 h-4" /></button>
      <div className="w-px h-6 bg-[var(--color-ink-200)] mx-1 self-center"></div>
      <button type="button" onClick={addImage} disabled={isUploading} className={btnClass(false)} title="插入图片">
        <ImageIcon className={`w-4 h-4 ${isUploading ? 'opacity-50 animate-pulse' : ''}`} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className={btnClass(false)} title="清除格式">
        <Eraser className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Underline,
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded border border-[var(--color-ink-200)] my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "提笔行文...",
      })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[250px] p-4 text-[var(--color-ink-900)] leading-relaxed tracking-wide',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sync value if changed from outside (e.g. initial load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  return (
    <div className="bg-white/50 border border-[var(--color-ink-200)] focus-within:border-[var(--color-ink-seal)] transition-colors relative z-10">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <style jsx global>{`
        /* Minimal custom styling for TipTap editor content */
        .ProseMirror p {
          margin-bottom: 1em;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          color: var(--color-ink-900);
        }
        .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin-top: 1.25em;
          margin-bottom: 0.5em;
          color: var(--color-ink-800);
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1.5em auto;
        }
        .ProseMirror.ProseMirror-focused {
          outline: none;
        }
        /* Placeholder support */
        .ProseMirror p.is-editor-empty:first-child::before {
          content: '${placeholder || "提笔行文..."}';
          float: left;
          color: var(--color-ink-400);
          pointer-events: none;
          height: 0;
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
}
