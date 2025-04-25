import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

export const getSecret = async (secretId: string): Promise<string> => {
  const [version] = await client.accessSecretVersion({
    name: `projects/artsy-shrey-3/secrets/${secretId}/versions/latest`,
  });

  const payload = version.payload?.data?.toString();
  if (!payload) throw new Error(`Secret ${secretId} has no payload`);
  return payload;
};



let secrets: { [key: string]: string } = {};
export const loadSecrets = async () => {
  secrets["client_id"] = await getSecret("CLIENT_ID");
  secrets["client_secret"] = await getSecret("CLIENT_SECRET");
  secrets["DB_URL"] = await getSecret("DB_URL");
};

export const getCachedSecret = (key: string): string => {
  return secrets[key];
};
