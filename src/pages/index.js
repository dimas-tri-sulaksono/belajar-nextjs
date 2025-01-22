import Button from "@/components/Button";
import ButtonWithProps from "@/components/ButtonWithProps";
import Card from "@/components/CardWithChildren";
import Image from "next/image";

export default function Home() {
  // anggap ini data dari API
  const data = {
    text: "PLEASE!!!",
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen gap-4">
        {/* button biasa */}
        <button className="h-10 px-6 font-semibold bg-blue-500 hover:bg-blue-700 text-white">
          click me!
        </button>

        {/* button dengan basis komponen (single close tag) */}
        <Button />

        {/* komponen button dengan props */}
        <ButtonWithProps text={"please click me!"} />

        {/* komponen button dengan props */}
        <ButtonWithProps
          text={"please please click me!"}
          className="bg-red-500 hover:bg-red-700"
        />

        {/* komponen button dengan props */}
        <ButtonWithProps
          text={data.text}
          className="bg-black hover:bg-red-700"
        />

        <Card cardClassname={"p-5 border"}>
          <Image src={"/next.svg"} width={300} height={300} alt="test" />
          <h2 className="text-xl font-bold my-3">Card Tittle</h2>
          <p className="text-justify">
            {" "}
            Lorem ipsum dolor sit, amet consector adipisicing elit. Enim?
          </p>
          <ButtonWithProps
            text={"What?"}
            className="bg-yellow-300 hover:bg-yellow-500 w-full"
          />
        </Card>
      </div>
    </>
  );
}
