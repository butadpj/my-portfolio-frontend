import Image from "next/image";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <main className={style.loader}>
      <div>
        <Image src="/images/loaders/loader-gif.gif" width={150} height={150} />
      </div>
    </main>
  );
};

export default Loader;
