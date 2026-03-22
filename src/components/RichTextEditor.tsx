"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { createClient } from "@/utils/supabase/client";

// Dynamically import ReactQuill to avoid SSR issues and allow ref forwarding
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <div className="h-[250px] w-full animate-pulse bg-white/50 border border-[var(--color-ink-200)]"></div> }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null);
  
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Size validation: 5MB max
        if (file.size > 5 * 1024 * 1024) {
          alert("图片大小不能超过 5MB！");
          return;
        }

        try {
          const supabase = createClient();
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("xunwu-images")
            .upload(filePath, file);

          if (uploadError) {
            throw uploadError;
          }

          const { data } = supabase.storage
            .from("xunwu-images")
            .getPublicUrl(filePath);

          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, "image", data.publicUrl);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("上传图片失败，请重试");
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <div className="bg-white/50 border border-[var(--color-ink-200)] focus-within:border-[var(--color-ink-seal)] transition-colors text-[var(--color-ink-900)] relative z-10 quill-editor-wrapper">
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder || "提笔行文..."}
      />
      <style jsx global>{`
        .quill-editor-wrapper .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid var(--color-ink-200);
          background: rgba(255, 255, 255, 0.4);
          font-family: inherit;
        }
        .quill-editor-wrapper .ql-container.ql-snow {
          border: none;
          font-family: inherit;
          font-size: 14px;
          min-height: 250px;
        }
        .quill-editor-wrapper .ql-editor {
          min-height: 250px;
          line-height: 1.8;
          word-spacing: 0.05em;
        }
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: var(--color-ink-400);
          font-style: normal;
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
}
