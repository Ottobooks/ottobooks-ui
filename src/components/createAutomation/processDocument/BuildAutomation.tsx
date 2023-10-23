"use client";

import { useEffect, useState } from "react";

const tempScripts = [
  { text: "Processing Document...", type: 1 },
  { text: 'hi. otto here. let&apos;s automate!{" "}', type: 1 },
  {
    text: 'let&apos;s start by breaking your process document up in steps.{" "}',
    type: 1,
  },
  {
    text: "the first step is to calculate gross sales using the price x quantity.",
    type: 1,
  },
  {
    text: "i see line item price and line item quantity. are these the correct fields to use?",
    type: 1,
  },
];
const tempScripts2 = [
  {
    text: "great. i&apos;ll use those and i&apos;ll add my own notes in blue to your process doc for clarification.",
    type: 1,
  },
  {
    text: "i see $305,053 in gross sales in June based on the fulfillment date. does that match what you would expect?",
    type: 1,
  },
];
const tempScripts3 = [
  {
    text: "that&apos;s okay. we can continue. i will also create detailed back up of all totals so you can validate the outcomes later.",
    type: 1,
  },
  {
    text: "i have added the $305,053 of June Gross Sales to a credit to the Journal Entry table as specified in your process document.",
    type: 1,
  },
  {
    text: "next let&apos;s calculate total discounts. i see $18,083 of discounts in June. I have added this as a debit to the Journal Entry table as requested.",
    type: 1,
  },
  {
    text: "next, let&apos;s calculate total cash received.",
    type: 1,
  },
  {
    text: "total cash received is $299,014. I have added this as a debit to the Journal Entry table as requested.",
    type: 1,
  },
];

const BuildAutomation = () => {
  const [scripts, setScripts] = useState<any>([]);

  useEffect(() => {
    tempScripts.forEach((tempScript) => {
      setTimeout(() => setScripts((t: any) => [...t, tempScript]), 1000);
    });
  }, []);
  return (
    <div className="flex flex-col px-10 py-8 gap-3">
      <div className="font-bold text-xl">Build Automation</div>
      <div>
        <div className="p-4 border border-stone-700 rounded w-2/3 bg-white h-96 overflow-auto flex">
          {scripts.map((s: any, idx: number) => {
            return <div key={idx}>dss</div>;
          })}
        </div>
        <div className="flex w-2/3">
          <input
            type="text"
            className="otto-input border border-stone-700 rounded-none bg-white"
          ></input>
          <button className="otto-button otto-button-original border border-stone-700 rounded-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildAutomation;
