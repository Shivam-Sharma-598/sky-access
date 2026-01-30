const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // Close all others (optional – comment if not needed)
    faqItems.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".faq-answer").style.height = "0px";
    });

    if (!isOpen) {
      item.classList.add("active");
      answer.style.height = answer.scrollHeight + "px";
    }
  });
});
