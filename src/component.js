export default (text = "Hello world") => {
  const element = document.createElement("div");
  element.className = "rounded bg-red-100 border max-w-md m-4 p-4 alm-font";

  element.innerHTML = text;
  return element;
};