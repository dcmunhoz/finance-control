export interface ProblemResponse {
  summary: string;
  message: string;
  details: ProblemDetailResponse[];
}

interface ProblemDetailResponse {
  summary: string;
}
