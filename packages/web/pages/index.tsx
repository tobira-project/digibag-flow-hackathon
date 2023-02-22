import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>hello world</div>
      <div className="w-20">
        <Link href={"/decoration"}>
          <div className="flex justify-center font-bold bg-green-100 h-10 grid content-center rounded-full">
            decoration
          </div>
        </Link>
      </div>
    </>
  );
}
