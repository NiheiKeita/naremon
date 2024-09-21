import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'tailwindcss/tailwind.css';

export const AddArticle = React.memo(function AddArticle() {
    const [markdown, setMarkdown] = useState<string>('');

    // コードブロックのカスタムレンダラー
    const components = {
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={atomDark} // 好みのテーマに変更可能
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    return (
        <div className="flex h-screen">
            {/* 左側のエディタ */}
            <div className="w-1/2 p-4">
                <h2 className="text-xl font-bold mb-4">Markdownエディタ</h2>
                <textarea
                    className="w-full h-full p-2 border rounded-md"
                    placeholder="ここにマークダウンを入力してください..."
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
            </div>

            {/* 右側のプレビュー */}
            <div className="w-1/2 p-4 border-l overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">プレビュー</h2>
                <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={components} // カスタムレンダラーを指定
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
});

export default AddArticle;
