"use client";
import { Drawer } from "vaul";
import { resolver } from "../utils/resolver";
import VideoCard from "../components/VideoCard";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [VideoData, setVideoData] = useState("");
  const [DataLoading, setIsDataLoading] = useState(false);
  const [IsAutoClear, setIsAutoClear] = useState(true);

  // 监听textarea的输入变化
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  // 监听回车键的按下事件
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  // 提交表单的函数
  const handleSubmit = async () => {
    // 处理提交逻辑，例如向后端发送数据等
    console.log("用户输入：", inputValue);
    setIsDataLoading(true);
    const q = await resolver(inputValue);
    console.table(q);
    setVideoData(q);
    setIsDataLoading(false);
    if (IsAutoClear) {
      setInputValue("");
    }
    // 清空输入框
  };

  const PasteCC = () => {
    if (navigator.clipboard) {
      // 读取剪贴板内容
      navigator.clipboard
        .readText()
        .then((text) => {
          setInputValue(text)
        })
        .catch((err) => {
          console.error("读取剪贴板内容失败：", err);
        });
    } else {
      console.error("浏览器不支持读取剪贴板");
    }
  };

  // 清空输入框的函数
  const handleClearInput = () => {
    // 动画持续时间，单位毫秒
    const animationDuration = 150;
    // 每个字符清空的间隔时间，单位毫秒
    const interval = animationDuration / inputValue.length;

    // 计算每次清空的时间间隔
    const totalChars = inputValue.length;

    // 设置初始值和定时器
    let index = totalChars;
    const timer = setInterval(() => {
      if (index > 0) {
        setInputValue((prevValue) => prevValue.slice(0, -1)); // 删除最后一个字符
        index -= 1;
      } else {
        clearInterval(timer); // 清除定时器
      }
    }, interval);
  };

  return (
    <Drawer.Root shouldScaleBackground>
      <main
        className="flex antialiased justify-center min-h-screen w-screen"
        vaul-drawer-wrapper=""
      >
        <div className="w-[800px] max-w-full">
          <div className="p-4">
            <h1 className="text-[70px] font-serif">
              输入
              <span className="font-semibold text-red-400">BV</span>号
            </h1>
            <h1 className="text-[57px] font-serif">
              或者粘贴
              <span className="font-semibold text-red-500">链接</span>
              获取视频直链
            </h1>
            <textarea
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={inputValue}
              className=" w-full h-32 bg-[#fff] dark:bg-[#262626] text-[#333] dark:text-[#f5f5f5] rounded-lg shadow-inner p-4 focus:outline-none "
              placeholder="在这粘贴链接，或者输入 BV 号，支持模糊解析哦"
            />
            <div className="grid grid-cols-3 w-full gap-10 md:gap-16 lg-gap-20 p-4 md:p-10">
              <div className="col-span-2 text-center">
                <Drawer.Trigger
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center h-20 bg-black dark:bg-white text-white dark:text-black rounded-full text-xl"
                >
                  提交
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-white dark:bg-stone-900 rounded-t-[10px] flex-1">
                      <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                      <div className="max-w-lg mx-auto">
                        <Drawer.Title className="font-2xl mb-4 dark:text-zinc-100 font-bold">
                          解析结果
                        </Drawer.Title>

                        <VideoCard data={VideoData} isLoading={DataLoading} />
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center h-20 bg-red-50 dark:bg-slate-900 rounded-full text-xl"
                  onClick={handleClearInput}
                >
                  清空
                </button>
              </div>
            </div>
            <ul className="sm:flex flex-auto gap-4">
              <li>
                <input
                  type="checkbox"
                  id="autoClear"
                  checked={IsAutoClear}
                  onChange={() => setIsAutoClear(!IsAutoClear)}
                  className="m-1 h-3"
                />
                <label
                  htmlFor="autoClear"
                  className="underline-offset-4 underline cursor-pointer"
                >
                  提交后自动清除输入
                </label>
              </li>
              <li
                className="underline-offset-4 underline cursor-pointer"
                onClick={PasteCC}
              >
                ↗ 粘贴剪贴板
              </li>
              <li>
                ✨还想要其他功能可以试试问问 if
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Drawer.Root>
  );
};

export default Home;
