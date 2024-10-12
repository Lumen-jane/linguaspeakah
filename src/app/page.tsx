/** @format */
"use client";
import "regenerator-runtime/runtime";
import TextArea from "@/components/Input/TextArea";
import { ChangeEvent, useState } from "react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import FileUpload from "@/components/Input/FileUpload";
import LinkPaste from "@/components/Input/LinkPaste";
import LanguageSelector from "@/components/Input/LanguageSelector";
import { rtfToText } from "@/utils/rtfToText";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import useTranslate from "@/hooks/useTranslate";
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLink from "@/components/CategoryLinks";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");

  const [languages] = useState<string[]>([
    "English",
    "French",
    "German",
    "Spanish",
  ]);

  // handle audio playback
  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // handle copy to clipboard
  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // handle favouritr
  const handleFavorites = () => {
    setFavourite(!favourite);
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  // handle file upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const targetText = useTranslate(sourceText, selectedLanguage);

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative overflow-hidden h-screen">
        <div className="max-x-[85rem] mx-auto px-r sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
              Lingua<span className="text-[#f87315]">Speakah</span>
            </h1>
            <p className="mt-3 text-neutral-400">
              LinguaSpeakah: Connecting Voices,Connecting worlds
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-grey-900/20">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e.target.value);
                    }}
                    placeHolder={"Source Language"}
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(sourceText)}
                      />
                      {/* {file upload} */}
                      <FileUpload handleFileUpload={handleFileUpload} />
                      <LinkPaste handleLinkPaste={() => {}} />
                    </span>
                    <span className="text-sm pr-4">
                      {sourceText.length} / 2000{" "}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-grey-900/20">
                  <TextArea
                    id="target-language"
                    value={targetText}
                    onChange={() => {}}
                    placeHolder={"Target Language"}
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row items-center">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback}
                      />
                    </span>
                    <div className="flex flex-row itmes-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy size={22} onClick={handleCopyToClipBoard} />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconThumbUp size={22} />
                      <IconThumbDown size={22} />
                      <IconStar
                        size={22}
                        onClick={handleFavorites}
                        className={favourite ? "text-yellow-500" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SvgDecorations />
            </div>
          </div>
        </div>
        <CategoryLink />
      </div>
    </div>
  );
}
