export type DalleRequest = {
  prompt: string;
};

export type DalleSuccessResponse = {
  photo: string;
};

export type DalleErrorResponse = {
  message: string;
  error?: string;
};

export type DalleHelloResponse = {
  message: string;
};
