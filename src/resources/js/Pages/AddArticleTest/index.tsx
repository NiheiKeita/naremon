import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AddArticleTest = React.memo(function AddArticleTest() {
    const [markdown, setMarkdown] = useState<string>('');

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
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
});

export default AddArticleTest
