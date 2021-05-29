import Link from "next/link";

const Login = ({
  state,
  handleInputChange,
  handleSubmit,
  handleLogout,
  loginInfo,
}) => {
  return (
    <main>
      <div style={{ textAlign: "center" }}>
        <h2>Paul's portal </h2>
        <br />
        <h4>Are you Paul? </h4>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginInfo.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {state.isAuthenticated ? (
            <button type="submit" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </form>
        <Link href="/">
          <a>Go back to home page</a>
        </Link>
      </div>
    </main>
  );
};

export default Login;
