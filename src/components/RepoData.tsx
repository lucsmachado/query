import * as React from "react";
import viteLogo from "/vite.svg";
import reactLogo from "@/assets/react.svg";
import { useRepo } from "@/hooks";

function formatNumber(n: number): string {
  return new Intl.NumberFormat().format(n);
}

const RepoData = () => {
  const { data, isPending, isFetching, error } = useRepo({
    owner: "tanstack",
    repo: "react-query",
  });
  const [count, setCount] = React.useState(0);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="logos">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href={data.organization?.html_url} target="_blank">
          <img
            src={data.organization?.avatar_url}
            className="logo tanstack"
            alt="TanStack logo"
          />
        </a>
      </div>
      <h1>Vite + React + {data.full_name}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>⭐ Stars: {formatNumber(data.stargazers_count)}</p>
        <p>👀 Watchers: {formatNumber(data.watchers_count)}</p>
        <p>🍴Forks: {formatNumber(data.forks_count)}</p>
        {isFetching && <p>Updating...</p>}
      </div>
      <p className="read-the-docs">
        Click on the Vite, React and {data.full_name} logos to learn more
      </p>
    </>
  );
};

export default RepoData;
