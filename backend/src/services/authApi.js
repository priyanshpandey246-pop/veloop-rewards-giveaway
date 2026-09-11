import api, {
  setAuthToken,
} from "./api";

export async function createDemoSession() {
  const response =
    await api.post(
      "/auth/demo-session"
    );

  const {
    token,
    user,
  } = response.data.data;

  setAuthToken(token);

  return {
    token,
    user,
  };
}