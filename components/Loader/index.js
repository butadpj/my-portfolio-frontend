import Image from "next/image";
import style from "./Loader.module.css";
import Portal from "../Portal";

const Loader = () => {
  return (
    <Portal>
      <main className={style.loader}>
        <div>
          <Image src="/images/loaders/loader-gif.gif" width={150} height={150} />
        </div>
      </main>
    </Portal>
  );
};

export default Loader;
