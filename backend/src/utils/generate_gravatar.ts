async function getGravatarUrl(
  email: string,
  size: number = 80
): Promise<string> {
  try {
    const trimmedEmail = email.trim().toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(trimmedEmail);
    let hash = "";

    for (let i = 0; i < data.length; i++) {
      hash += data[i].toString(16).padStart(2, "0");
    }

    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
  } catch (error) {
    console.error("Error generating Gravatar URL:", error);
    throw new Error("Failed to generate Gravatar URL");
  }
}

export default getGravatarUrl;
