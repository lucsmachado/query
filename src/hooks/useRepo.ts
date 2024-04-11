import { useQuery } from "@tanstack/react-query";
import { octokit } from "@/services";

const useRepo = (options: { owner: string; repo: string }) => {
  return useQuery({
    queryKey: ["repo"],
    queryFn: () => fetchRepo(options),
  });
};

const fetchRepo = async (options: { owner: string; repo: string }) => {
  const res = await octokit.request("GET /repos/{owner}/{repo}", options);
  return res.data;
};

export default useRepo;
