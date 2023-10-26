"use client";
import { setIntegration } from "@/redux/slices/integrationSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Integrations = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onReconcilationHandler = (type: string) => {
    dispatch(setIntegration(type));
    router.push("/create/document/addDataSource/setupIntegration");
  };
  return (
    <div className="flex flex-col items-center justify-center px-10 py-8 gap-3">
      <div className="font-bold text-xl">
        Welcome to the ottobooks community
      </div>
      <span>
        Explore thousands of free and paid scripts to automate your processes
        faster
      </span>
      <div>
        <input
          type="text"
          className="otto-input"
          placeholder="Gusto Payroll Journal Entry"
        ></input>
      </div>
      <div className="flex gap-10 mt-8">
        <div className="flex flex-col gap-5 p-4 border-2 border-stone-700 bg-white rounded-lg h-72 w-72">
          <div className="font-bold text-xl">Shopify Reconciliation</div>
          <div>Reconcile your Shopify orders in a breeze!</div>
          <div>Integrations: Shopify, Quickbooks</div>
          <div className="flex items-center">
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
          </div>
          <div className="flex-1 otto-community-link flex justify-end items-end">
            <a href="www.google.com">Learn More</a>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-4 border-2 border-stone-700 bg-white rounded-lg h-72 w-72">
          <div className="font-bold text-xl">Payroll Mate</div>
          <div>Prepare your Payroll Entries in a flash!</div>
          <div>Integrations: Gusto, ADP, Rippling, CSV</div>
          <div className="flex items-center">
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
          </div>
          <div className="flex-1 otto-community-link flex justify-end items-end">
            <a href="www.google.com">Learn More</a>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-4 border-2 border-stone-700 bg-white rounded-lg h-72 w-72">
          <div className="font-bold text-xl">Gusto Pay</div>
          <div>Automate your monthly payroll journals</div>
          <div>Integrations: Gusto</div>
          <div className="flex items-center">
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
            <Image
              src="/favoicon.png"
              width={24}
              height={24}
              alt="Picture of the author"
            />
          </div>
          <div className="flex-1 otto-community-link flex justify-end items-end">
            <a href="www.google.com">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
