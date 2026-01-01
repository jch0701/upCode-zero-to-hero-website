import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
      if(repoLink === null || repoLink === undefined || repoLink === ""){
        return "";
      }
      const { owner, repo } = parseGitHubRepoLink(repoLink);
      const url = `https://api.github.com/repos/${owner}/${repo}`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github+json",
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

  try {
    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          params: { per_page: perPage, page },
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );

      const commits = response.data;

      if (!Array.isArray(commits) || commits.length === 0) break;

      const transformedCommits = commits.map((commit: any) => ({
        hash: commit.sha.substring(0, 6),
        message: commit.commit.message,
        date: commit.commit.author.date,
        link: commit.html_url,
      }));

      allCommits.push(...transformedCommits);
      page++;
    }

    if (allCommits.length === 0) {
      throw new Error("NO_COMMITS");
    }

    return allCommits;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        throw new Error(
          "This repository is private or inaccessible. Please make sure the repository is public."
        );
      }

      if (status === 403) {
        throw new Error(
          "GitHub API rate limit exceeded. Please try again later."
        );
      }

      if (status === 404) {
        throw new Error(
          "Repository not found. Please check the owner and repository name."
        );
      }
    }

    if (error instanceof Error && error.message === "NO_COMMITS") {
      throw new Error("No commits found for this repository.");
    }

    throw new Error("Failed to fetch commits from GitHub.");
  }
}
