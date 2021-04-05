import React from 'react';
import { connect } from 'react-redux';

const Comp = () => {
  return (
    <>
      <section className="notification is-primary">
        <div className="tile is-horizontal is-parent">
          <article className="tile is-child">
            <p className="heading is-size-2 title has-text-weight-bold">FAQ</p>
            <div>Here you will find the answers to all your questions!</div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child">
            <p className="is-size-4 title has-text-weight-bold">
              What are the legal implications of joining the Trusted Seed within my specific
              country?
            </p>
            <div>
              The legal structure of the Trusted Seed is designed for the most litigious legal
              environments (for example, within the United States). It is designed to protect its
              members from potential legal situations that could arise from normal good faith
              actions within DAOs and Commons that are often considered general partnerships with
              heavy legal liability for individuals.
            </div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child">
            <p className="is-size-4 title has-text-weight-bold">
              Do I have to report to anyone in my country that I am a member of this association?
            </p>
            <div>
              No. The legal structure proposed allows the membership to be treated in a similar
              manner as a membership at your local gym. There should be no reporting requirements
              for anyone. With that being said, it is always a good idea to keep an eye out for
              regulatory changes within your local and national jurisdictions.
            </div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child">
            <p className="is-size-4 title has-text-weight-bold">
              Is it clear where I have breached the Terms & Conditions?
            </p>
            <div>
              The rules are located in our{' '}
              <a
                target="_blank"
                rel="noreferrer"
                className="support-link"
                style={{ color: '#1BDD9D', textDecoration: 'none' }}
                href="https://ipfs.web3.party/ipfs/QmYDmtmDYUPR6wjukzaNytibeNnYs41s2co4tNzkUYdd5n"
              >
                Terms & Conditions
              </a>{' '}
              that members must agree to before joining the Swiss Association. In summary, if you
              act in good faith and do not perform any illegal actions you will be protected.
            </div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child">
            <p className="is-size-4 title has-text-weight-bold">
              Is there a list of what will be covered by the Legal protections?
            </p>
            <div>
              There is not a defined list, but good faith participation in approved DAOs will
              generally be covered.
            </div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child">
            <p className="is-size-4 title has-text-weight-bold">
              What liabilities are removed by the legal protection of the Swiss Association?
            </p>
            <div>
              The Trusted Seed doesn't remove any liabilities. Unfortunately, if you hold tokens in
              a DAO or Commons, in many jurisdictions you can be held 100% individually liable for
              any actions made by the DAO. However, if you are a Member of our Trusted Seed, and you
              were acting in good faith as a member of a qualified DAO, we will fight for you! We
              will pay your legal fees and rally support from the greater community.
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default connect()(Comp);
