"use client";

import FaqItem from "./FaqItem";

export default function Faq() {
  return (
    <div className="faq">
      <FaqItem>
        <div className="faq-item-content">
          <span className="faq-question">Is EVE Helix free to use?</span>
          <span className="faq-answer">
            Yes - every tool is free. There&apos;s no premium tier or paywalled
            features.
          </span>
        </div>
      </FaqItem>
      <hr className="divider" />
      <FaqItem>
        <div className="faq-item-content">
          <span className="faq-question">Is EVE Helix free to use?</span>
          <span className="faq-answer">
            Yes - every tool is free. There&apos;s no premium tier or paywalled
            features.
          </span>
        </div>
      </FaqItem>
    </div>
  );
}
