export type AiSettingsSaveRequest = {
  apiKey: string;
};

export type AiSettingsStatusResponse = {
  hasKey: boolean;
  apiKey?: string;
};

export type AiSettingsSuccessResponse = {
  success: true;
};

export type AiSettingsErrorResponse = {
  message: string;
};
