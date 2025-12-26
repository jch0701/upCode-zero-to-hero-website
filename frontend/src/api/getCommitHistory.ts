import Api from "./index.ts";
import { useQuery} from "@tanstack/react-query";

export function useGetCommitHistory(repoLink: string) {
  return useQuery({
    queryKey: ["commitHistory", repoLink],
    queryFn: () => {
      const { owner, repo } = parseGitHubRepoLink(repoLink);
      return fetchAllCommits(owner, repo);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGetMainRepoLanguage(repoLink: string) {
  return useQuery({
    queryKey: ["mainRepoLanguage", repoLink],
    queryFn: async () => {
      const { owner, repo } = parseGitHubRepoLink(repoLink);
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await Api.get(url, {
        headers: { 
          Accept: "application/vnd.github+json" 
        },
      });
      return response.data.language;
    }
  })
}

// utils/github.ts
const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+?)(\.git)?(\/|$)/;
export function parseGitHubRepoLink(repoLink: string): { owner: string; repo: string } {
  const match = repoLink.match(regex);
  if (!match) {
    throw new Error("Invalid GitHub repository link.");
  }
  return { owner: match[1], repo: match[2] };
}


export async function fetchAllCommits(owner: string, repo: string) {
  const perPage = 100;
  let page = 1;
  let allCommits: any[] = [];

  try{
    while (true) {
      const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
      const response = await Api.get(url, {
        params: {
          per_page: perPage,
          page: page,
        },
        headers: { 
          Accept: "application/vnd.github+json" 
        },
      });

      // changed: response.data is already an array of commits
      const commits = response.data;
      
      // changed: check if array is empty, then map and transform
      if (!Array.isArray(commits) || commits.length === 0) {
        break;
      }
      
      // changed: map each commit to extract only hash, message, date, link
      const transformedCommits = commits.map(commit => ({
        hash: commit.sha.substring(0, 6),
        message: commit.commit.message,
        date: commit.commit.author.date,
        link: commit.html_url,
      }));
      
      allCommits = allCommits.concat(transformedCommits);
      page += 1;
    }
    
    if(allCommits.length === 0){
      throw new Error("No commits found.");
    }
    return allCommits;
  } catch(error){
    throw error;
  }
}