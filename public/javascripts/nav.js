const toggleClass = (elementId, classToAdd) => {
  console.log("addClass Called");
  let element = document.getElementById(elementId);
  element.classList.toggle(classToAdd);
};
