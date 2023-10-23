"use client";

import Popup from "@/components/popup/Popup";
import { ModalType } from "@/constants/script.constant";
import { Fragment, useEffect, useState } from "react";

const tempScripts = [
  { text: "Processing Document...", type: 1 },
  { text: "hi. otto here. let's automate!", type: 1 },
  {
    text: "let's start by breaking your process document up in steps.",
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
    text: "great. i'll use those and i'll add my own notes in blue to your process doc for clarification.",
    type: 1,
  },
  {
    text: "i see $305,053 in gross sales in June based on the fulfillment date. does that match what you would expect?",
    type: 1,
  },
];
const tempScripts3 = [
  {
    text: "that's okay. we can continue. i will also create detailed back up of all totals so you can validate the outcomes later.",
    type: 1,
  },
  {
    text: "i have added the $305,053 of June Gross Sales to a credit to the Journal Entry table as specified in your process document.",
    type: 1,
  },
  {
    text: "next let's calculate total discounts. i see $18,083 of discounts in June. I have added this as a debit to the Journal Entry table as requested.",
    type: 1,
  },
  {
    text: "next, let's calculate total cash received.",
    type: 1,
  },
  {
    text: "total cash received is $299,014. I have added this as a debit to the Journal Entry table as requested.",
    type: 1,
  },
  {
    text: "lastly, i am summing the debits and credits and checking that they match.",
    type: 1,
  },
  {
    text: "there is an error. debits and credits do not match. they are off by $12,044.",
    type: 1,
  },
];
const tempScripts4 = [
  {
    text: "yes that's it! sales tax is $12,044. would you like me to add that to the journal entry table and adjust the process doc?",
    type: 1,
  },
];
const tempScripts5 = [
  {
    text: "done. your process doc with my updates (in blue) and your automation is ready. you can see the output here if you want any further changes, or you can find both in My Automations.",
    type: 1,
  },
];

const temps: any = {
  2: tempScripts2,
  3: tempScripts3,
  4: tempScripts4,
  5: tempScripts5,
};

const BuildAutomation = () => {
  const [scripts, setScripts] = useState<any>([]);
  const [userText, setUserText] = useState("");
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const filename = `shopify_order_report.csv`;

  useEffect(() => {
    setScripts((t: any) => [...t, tempScripts[0], tempScripts[1]]);
    setTimeout(() => setScripts((t: any) => [...t, tempScripts[2]]), 1000);
    setTimeout(
      () => setScripts((t: any) => [...t, tempScripts[3], tempScripts[4]]),
      2000
    );
  }, []);

  useEffect(() => {
    const contentCard = document.getElementById("contentCard");
    if (contentCard) {
      contentCard.scrollTop = contentCard.scrollHeight;
    }
  }, [scripts]);

  useEffect(() => {
    const currentScripts: [] = temps[currentNumber];
    if (currentScripts) {
      setTimeout(() => setScripts((t: any) => [...t, ...currentScripts]), 2000);
    }
    if (currentNumber == 5) {
      const endButton = {
        text: "Shopify Revenue Reconcilation",
        type: 3,
      };
      setTimeout(() => setScripts((t: any) => [...t, endButton]), 2100);
    }
  }, [currentNumber]);

  const onSendHandler = () => {
    setScripts((t: any) => [...t, { text: userText, type: 2 }]);
    setUserText("");
    setCurrentNumber((s: number) => s + 1);
  };

  const onReconcilationHandler = () => {
    setIsPopup(true);
  };

  const onPopupCloseHandler = () => setIsPopup(false);

  return (
    <div className="flex flex-col px-10 py-8 gap-3">
      <div className="font-bold text-xl">Build Automation</div>
      <div>
        <div
          id="contentCard"
          className="p-4 border border-stone-700 rounded w-2/3 bg-white h-96 overflow-auto flex flex-col gap-3"
        >
          {scripts.map((s: any, idx: number) => {
            return (
              <Fragment key={idx}>
                {s.type === 3 ? (
                  <button
                    className="otto-button otto-button-original"
                    onClick={onReconcilationHandler}
                  >
                    {s.text}
                  </button>
                ) : (
                  <div
                    className={`${
                      s.type == 2 ? "otto-primary text-right" : null
                    }`}
                  >
                    {s.text}
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="flex w-2/3">
          <input
            type="text"
            className="otto-input border border-stone-700 rounded-none bg-white"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          ></input>
          <button
            className="otto-button otto-button-original border border-stone-700 rounded-none"
            onClick={onSendHandler}
          >
            Submit
          </button>
        </div>
      </div>
      {isPopup ? (
        <Popup
          type={ModalType.SUCCESS}
          title={`Your automation is successfully completed!`}
          content={`You can download your results here.`}
          onClose={onPopupCloseHandler}
        >
          <div className="pb-4 flex justify-center">
            <a
              href="#javascript"
              className="otto-link"
              onClick={(e) => e.preventDefault()}
            >
              {filename}
            </a>
          </div>
        </Popup>
      ) : null}
    </div>
  );
};

export default BuildAutomation;
