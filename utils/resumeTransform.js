export function parseItems(text, keys) {
  return (text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      if (
        keys.length === 4 &&
        keys[0] === "period" &&
        keys[1] === "role" &&
        keys[2] === "company" &&
        keys[3] === "detail" &&
        parts.length === 3
      ) {
        return {
          period: parts[0] || "",
          role: "",
          company: parts[1] || "",
          detail: parts[2] || "",
        };
      }
      return keys.reduce((acc, key, index) => ({ ...acc, [key]: parts[index] || "" }), {});
    });
}
