import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

const VideoCard = ({ data, isLoading }) => {

  if (isLoading) {
    return <p className="text-zinc-600 dark:text-zinc-200">加载中...</p>;
  } else if (data != null) {
    return (
      <>
        <div className="text-zinc-600 dark:text-zinc-200 z-10 relative">
          <div className="pt-2">
            <p className="flex items-center w-full">
              作者：{data.author}
              <div>
                <Image
                  height={8}
                  width={8}
                  src={data.authorpic}
                  alt="Author"
                  className="w-4 h-4 m-1 rounded-full"
                />
              </div>
              {data.pubdate}
            </p>
            <p>{data.desc}</p>
            <p>
              👁️: {data.view} / 👍: {data.like} / 💖: {data.favorite}
            </p>
            <p>
              在b站查看视频：
              <a
                href={data.bilibili}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                av{data.aid} / {data.bid}
              </a>
            </p>

            <div className="w-full flex items-center pt-4 pb-4 justify-center">
              <a
                href={data.url}
                download={`${data.title}.mp4`}
                target="_blank"
                className="w-[90%] flex items-center justify-center h-14 bg-black dark:bg-white text-white dark:text-black rounded-full text-xl"
              >
                下载视频
              </a>
            </div>
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all"
          >
            <Image
              height={128 * 5}
              width={72 * 5}
              src={data.pic}
              alt="Video Thumbnail"
              className="w-full rounded-xl hover:opacity-95 transition-all"
            />
          </a>
        </div>
        <h2 className="absolute text-7xl font-serif z-0 top-20 dark:text-zinc-700 text-zinc-200 max-w-lg">
          {/* 视频标题 */}
          {data.title}
        </h2>
      </>
    );
  } else {
    return <p className="text-zinc-600 dark:text-zinc-200">解析失败了</p>;
  }
};

export default VideoCard;
