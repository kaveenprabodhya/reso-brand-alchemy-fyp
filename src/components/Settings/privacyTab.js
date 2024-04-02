const PrivacyTab = ({ isLoggedIn }) => {
  return (
    <>
      <div className="container mt-2">
        <h2 className="mb-2">Privacy and Data Protection Policy</h2>

        <div
          className="pe-2"
          style={{
            maxHeight: "320px",
            overflowY: "auto",
            textAlign: "justify",
          }}
        >
          <div className="mb-3">
            <p>
              Welcome to our Reso Brand Alchemy Platform. We are dedicated to
              safeguarding your privacy and upholding the highest standards of
              data protection.
            </p>
          </div>

          <div className="mb-3">
            <h4>Data Collection and Use</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Emotional Response Data: We collect data on your emotional
                responses to music to dynamically tailor brand images.
              </li>
              <li className="list-group-item">
                User Consent: Participation is voluntary and based on your
                informed and explicit consent.
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <h4>Data Handling and Security</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Protection Measures: We implement state-of-the-art security
                protocols to protect your data.
              </li>
              <li className="list-group-item">
                Data Sharing and Disclosure: Your information is confidential
                and won't be shared without your consent.
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <h4>User Rights and Control</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Withdrawal of Consent: You can withdraw your consent at any
                time.
              </li>
              <li className="list-group-item">
                Access to Information: You have the right to access, correct, or
                delete your data.
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <h4>Policy Updates and Changes</h4>
            <p>
              We reserve the right to modify this policy to reflect changes in
              legal requirements or our data handling practices.
            </p>
          </div>

          <div className="mb-3">
            <h4>Contact and Queries</h4>
            <p>
              If you have questions or wish to exercise your rights, please
              contact our Data Protection Officer at{" "}
              <a href="mailto:info@example.com">info@example.com</a>.
            </p>
          </div>

          <div>
            <h4>Acknowledgment and Consent</h4>
            <p>
              By using our platform, you agree to the collection and use of your
              information as described in this policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyTab;
