import LoginBarrier from "./LoginBarrier";

function Home() {
  const userId = localStorage.getItem(`userId`);
  return userId === null ? (
    <LoginBarrier />
  ) : (
    <div>
      Home입니다.
      <h1>반갑습니다.{userId}님!</h1>
    </div>
  );
}

export default Home;