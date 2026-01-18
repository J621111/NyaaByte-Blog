'use client';

import { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import '@waline/client/style';

export default function WalineComment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const walineInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    walineInstanceRef.current = init({
      el: containerRef.current,
      serverURL: 'https://blog-comment-ebon.vercel.app',
      lang: 'zh-CN',
      emoji: [
        '//unpkg.com/@waline/emojis@1.2.0/weibo',
        '//unpkg.com/@waline/emojis@1.2.0/bilibili'
      ],
    });

    return () => {
      if (walineInstanceRef.current) {
        walineInstanceRef.current.destroy();
        walineInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div id="waline-wrapper" style={{ minHeight: '200px' }}>
      <div ref={containerRef} />
    </div>
  );
}