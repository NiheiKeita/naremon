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
            const match = /language-(\w+)(:(.+))?/.exec(className || '');
            const language = match ? match[1] : null;
            const fileName = match && match[3] ? match[3] : null; // `:`の右側をファイル名として取得

            return !inline && language ? (
                <div>
                    {/* ファイル名がある場合は、角丸と灰色の背景を適用 */}
                    {fileName && (
                        <div className="bg-gray-500 text-white px-2 py-1 text-sm rounded-md w-fit mb-2 -mt-3 -ms-5">
                            {fileName}
                        </div>
                    )}

                    <SyntaxHighlighter
                        style={atomDark} // 好みのテーマに変更可能
                        language={match?.[1]}
                        PreTag="div"
                        {...props}
                    >
                        {children && String(children)?.replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
        // pre({ children }: any) {
        //     return <pre>{children}</pre>
        // }
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
