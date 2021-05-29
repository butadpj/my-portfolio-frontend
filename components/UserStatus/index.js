import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import style from "./UserStatus.module.css";

const UserStatus = () => {
  const router = useRouter();

  const [state, dispatch] = useContext(TokenContext);

  const handleRoute = () => {
    if (state.isAuthenticated) {
      return;
    }
    router.push("admin/");
  };
  return (
    <div className={style.userStatus} onClick={handleRoute}>
      <h2>{state.isAuthenticated ? "Hi Paul :)" : "Are you Paul?"}</h2>
    </div>
  );
};

export default UserStatus;
