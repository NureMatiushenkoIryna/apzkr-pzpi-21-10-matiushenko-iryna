export const parseDates = <T extends {}>(obj: T) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === "string" && !isNaN(new Date(value).getTime())) {
      acc[key as keyof T] = new Date(value) as T[keyof T];
    }
    return acc;
  }, obj as T);
