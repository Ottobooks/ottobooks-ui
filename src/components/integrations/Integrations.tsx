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
      <div className="font-bold text-xl">Ottobooks Integrations</div>
      <span>
        Explore hundreds of integrations to take your automations further
      </span>
      <div>
        <input type="text" className="otto-input" placeholder="Search"></input>
      </div>
      <div className="flex gap-10 mt-8">
        <div className="flex flex-col p-2 border-2 border-stone-700 bg-white rounded-lg h-44 w-72">
          <div className="h-32 overflow-hidden flex items-center">
            <Image
              src="/shopify.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <button
            className="otto-button otto-button-original border-stone-700"
            onClick={() => onReconcilationHandler("shopify")}
          >
            Integrate
          </button>
        </div>
        <div className="flex flex-col p-2 border-2 border-stone-700 bg-white rounded-lg h-44 w-72">
          <div className="h-32 overflow-hidden flex items-center">
            <Image
              src="/stripe.png"
              width={500}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <button
            className="otto-button otto-button-original border-stone-700"
            onClick={() => onReconcilationHandler("stripe")}
          >
            Integrate
          </button>
        </div>
      </div>
      <div className="flex gap-10 mt-8">
        <div className="flex flex-col p-2 border-2 border-stone-700 bg-white rounded-lg h-44 w-72">
          <div className="h-32 p-2 overflow-hidden flex items-center">
            <Image
              src="/affirm.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <button
            className="otto-button otto-button-original border-stone-700"
            onClick={() => onReconcilationHandler("affirm")}
          >
            Integrate
          </button>
        </div>
        <div className="flex flex-col p-2 border-2 border-stone-700 bg-white rounded-lg h-44 w-72">
          <div className="h-32 p-2 overflow-hidden flex items-center">
            <Image
              src="/paypal.png"
              width={500}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <button
            className="otto-button otto-button-original border-stone-700"
            onClick={() => onReconcilationHandler("paypal")}
          >
            Integrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
