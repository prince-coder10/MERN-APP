// scrollUtils.js
export const handleLinkNavigate = (e, elementId) => {
  e.preventDefault();
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
