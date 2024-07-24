export const getAppliedFilters = (filters) => {
  return Object.keys(filters).filter((key) => filters[key]);
};

export const handleJSONFetch = (req) => {
  if (req.ok) return req.json();
  else throw new Error(req.statusText);
};
