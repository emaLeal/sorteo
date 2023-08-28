const formatString = (string) => {
  const m = string.replaceAll("\\", "/");
  const formatedString = m.replace("img", "");
  return formatedString;
};

export default formatString;
