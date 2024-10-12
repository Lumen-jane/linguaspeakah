/** @format */

import { OpenAI } from "openai";
import { useEffect, useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async () => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `you will be provided with a sentence, this sentence: ${sourceText}.
             your task are to:
             - detected what language the sentence is in
             - translate the sentence into ${selectedLanguage}d
             do not return anything other than the translated sentence
             `,
            },
          ],
        });
        const data = response.choices[0].message.content;
        setTargetText(data);
      } catch (error) {
        console.error("error translating text:", error);
      }
    };
    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
