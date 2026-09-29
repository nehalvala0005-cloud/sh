document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("faqContainer");

    if (!container) {
        return;
    }

    fetch("../JSON/faqs.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load FAQ data");
            }

            return response.json();
        })

        .then(faqs => {

            container.innerHTML = "";

            if (!Array.isArray(faqs) || faqs.length === 0) {

                container.innerHTML =
                    '<p class="error-message">No FAQs available.</p>';

                return;
            }

            faqs.forEach((faq, index) => {

                const item = document.createElement("article");

                item.className = "accordion-item";


                const question = document.createElement("button");

                question.type = "button";

                question.className = "accordion-question";

                question.setAttribute("aria-expanded", "false");

                question.setAttribute(
                    "aria-controls",
                    `faq-answer-${index}`
                );

                question.innerHTML = `
                    <span>
                        ${index + 1}. ${faq.question}
                    </span>

                    <span class="accordion-icon">
                        +
                    </span>
                `;


                const answer = document.createElement("div");

                answer.className = "accordion-answer";

                answer.id = `faq-answer-${index}`;

                answer.setAttribute("role", "region");

                answer.innerHTML = `
                    <p>${faq.answer}</p>
                `;


                question.addEventListener("click", () => {

                    const isOpen =
                        item.classList.contains("open");


                    document
                        .querySelectorAll(".accordion-item.open")
                        .forEach(openItem => {

                            if (openItem !== item) {

                                openItem.classList.remove("open");

                                const openButton =
                                    openItem.querySelector(
                                        ".accordion-question"
                                    );

                                if (openButton) {

                                    openButton.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                    const icon =
                                        openButton.querySelector(
                                            ".accordion-icon"
                                        );

                                    if (icon) {
                                        icon.textContent = "+";
                                    }
                                }
                            }
                        });


                    item.classList.toggle("open", !isOpen);

                    question.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );


                    const icon =
                        question.querySelector(".accordion-icon");

                    if (icon) {
                        icon.textContent =
                            !isOpen ? "−" : "+";
                    }

                });


                item.appendChild(question);

                item.appendChild(answer);

                container.appendChild(item);

            });

        })

        .catch(error => {

            console.error(error);

            container.innerHTML = `
                <div class="error-message">
                    <h3>Unable to load FAQs</h3>
                    <p>
                        Please check the JSON file and try again.
                    </p>
                </div>
            `;

        });

});