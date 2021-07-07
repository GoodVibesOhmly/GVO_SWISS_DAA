import React from 'react';
import { connect } from 'react-redux';
import './Help.sass';

const A = ({ href, children }) => (
  <a
    target="_blank"
    rel="noreferrer"
    className="support-link"
    style={{ color: '#1BDD9D', textDecoration: 'none' }}
    href={href}
  >
    {children}
  </a>
);

const Comp = () => {
  return (
    <>
      <div className="container is-max-desktop notification is-primary has-text-left p-6">
        <div>
          <p className="heading is-size-2 title has-text-weight-bold">FAQ</p>
          <div className="mb-4">
            If you have a question that is not covered here, you can reach out to us by email or
            join us for the next{' '}
            <A href="https://calendar.google.com/event?action=TEMPLATE&tmeid=MXRkMjhqbGZxdjlqc2p1bmNpYXA5MjJwMDlfMjAyMTAzMjNUMTYwMDAwWiBjX3ZqZGNrZmo0YmhhcnVvdmhkNHJtbzNkdHY0QGc&tmsrc=c_vjdckfj4bharuovhd4rmo3dtv4%40group.calendar.google.com&scp=ALL">
              Trusted Seed Office Hour
            </A>{' '}
            that happen every Tuesday at 12 pm EST in the{' '}
            <A href="https://discord.com/invite/KXn9Y7jzvz">Commons Stack Discord</A>!
          </div>
        </div>

        <div className="is-divider mb-5 mt-5" />

        <div className="mb-5">
          <p className="is-size-3 title has-text-weight-bold">Trusted Seed Membership</p>
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            Why should I join the Trusted Seed?{' '}
          </p>
          <ul className="faq-list">
            <li>
              Be a core part of an altruistic & tech-forward community aiming to empower the commons
              with the new tools of #TokenEngineering{' '}
            </li>
            <li>Get access to Commons Hatches to steward and cultivate shared resources</li>
            <li>Legal protection for any approved #Blockchain4good DAO or Commons</li>{' '}
            <li>
              Support the Commons Stack ecosystem in continuing to research and build towards our
              mission to Realign Incentives for Public Goods
            </li>{' '}
            <li>Receive Commons Stack swag and more!</li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">How do I join the Trusted Seed?</p>
          <ul className="faq-list">
            <li>
              Apply for membership at <A href="commonsstack.org/apply">commonsstack.org/apply</A>
              <li>
                After a short “Proof of Altruism” background check, our team will send you an
                acceptance email (within a week) with next steps for membership
              </li>
              <li>
                Activate your membership in the Trusted Seed’s Swiss Association by contributing
                your membership dues at{' '}
                <A href="https://member.commonsstack.foundation/">member.commonsstack.foundation</A>
              </li>
              <li>Minimum dues are 450 DAI, but contributions above this amount are welcomed </li>
              <A href="https://medium.com/commonsstack/trusted-seed-swiss-membership-scholarship-application-f2d07bc2fc90">
                Scholarships
              </A>{' '}
              are available for those who are unable to afford membership fees Confirm you can see
              your CSTK Score in your dashboard & xDai wallet - you’re in!
            </li>
          </ul>
        </div>

        <div className="mb-4">
          For more information,{' '}
          <A href="https://medium.com/commonsstack/join-the-commons-stacks-trusted-seed-swiss-association-ed51a356cb6c">
            read the full article
          </A>{' '}
          here.
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            Can my organization apply to the Trusted Seed?
          </p>
        </div>
        <div className="mb-4">
          Entire organizations are not able to apply to the Trusted Seed at this time. It is outside
          the scope of coverage the Swiss Membership can provide.
        </div>
        <div className="mb-4">
          However, a single individual representing their organization may apply as a Trusted Seed
          Ambassador. This Ambassador will hold a CSTK Score, and be charged to stay relatively
          up-to-date on the happenings in the Commons Stack ecosystem. Only the Ambassador will be
          eligible for the legal protection of the Trusted Seed Swiss Membership.
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            What are the legal implications of joining the Trusted Seed within my specific country?
          </p>
        </div>
        <div className="mb-4">
          The legal structure of the Trusted Seed is designed for the most litigious legal
          environments (for example, within the United States). It is designed to protect its
          members from potential legal situations that could arise from normal good faith actions
          within DAOs and Commons that are often considered general partnerships with potential
          legal liability for individuals.
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            Do I have to report to anyone in my country that I am a member of this association?
          </p>
        </div>
        <div className="mb-4">
          No. The legal structure proposed allows the membership to be treated in a similar manner
          as a membership at your local gym. There should be no reporting requirements but it is
          always a good idea to stay informed of regulatory changes within your local and national
          jurisdictions.
        </div>

        <div className="mb-4" v>
          <p className="is-size-4 title has-text-weight-bold">
            Is it clear where I have breached the Terms & Conditions?
          </p>
        </div>
        <div className="mb-4">
          The rules are located in our{' '}
          <A href="https://ipfs.web3.party/ipfs/QmYDmtmDYUPR6wjukzaNytibeNnYs41s2co4tNzkUYdd5n">
            Terms & Conditions
          </A>{' '}
          that members must agree to before joining the Swiss Association. In summary, if you act in
          good faith and do not perform any intentionally illegal actions, you should remain
          eligible for legal protection.
        </div>

        <div className="mb-4">
          <div>
            <p className="is-size-4 title has-text-weight-bold">
              Is there a list of what will be covered by the Legal protections?
            </p>{' '}
          </div>
          <div className="mb-4">
            There is not a defined list, but all good faith participation in approved DAOs will
            generally be covered.
          </div>
          <p className="is-size-4 title has-text-weight-bold">
            What liabilities are removed by the legal protection of the Swiss Association?
          </p>{' '}
        </div>
        <div className="mb-4">
          The Trusted Seed doesn't remove any liabilities. Unfortunately, if you hold tokens in a
          DAO or Commons, in many jurisdictions you can be held 100% individually liable for any
          actions made by the DAO. However, if you are a Member of our Trusted Seed, and you were
          acting in good faith as a member of a qualified DAO, we will fight for you! We will
          contribute to your legal defense and rally support from the greater community.
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            Why is the Swiss Association a legal entity?
          </p>{' '}
        </div>
        <div className="mb-4">
          To operate in ‘the real world’, only legal entities can limit liability.{' '}
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            Why is the Trusted Seed a Swiss Association?
          </p>{' '}
        </div>
        <div className="mb-4">
          <ul className="faq-list">
            <li>Avoids ‘general partnership’ designation</li>
            <li>Simple constitutional requirements</li>
            <li>Members rather than investors</li>
            <li>Open to anyone from anywhere</li>
            <li>
              Satisfies{' '}
              <A href="https://hackernoon.com/introducing-minimum-viable-centralization-a55e3685f7a2">
                minimum viable centralisation
              </A>
            </li>
            <li>
              Read the{' '}
              <A href="https://ipfs.web3.party/ipfs/QmYDmtmDYUPR6wjukzaNytibeNnYs41s2co4tNzkUYdd5n">
                Swiss Association T&C’s
              </A>{' '}
              &{' '}
              <A href="https://ipfs.web3.party/ipfs/QmcGNi9dcVgLJGtxJzjU2CyrrmVKkLnNPEK8JJC2a98zC5">
                Statutes
              </A>
            </li>
          </ul>
        </div>

        <div className="is-divider mb-5 mt-5" />

        <div className="mb-5">
          <p className="is-size-3 title has-text-weight-bold">CSTK Score</p>
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">What is a CSTK Score?</p>{' '}
        </div>
        <div className="mb-4">
          <ul className="faq-list">
            <li>
              Your CSTK Score is a non-transferrable, non-financial reputation token on the xDAI
              chain.
            </li>
            <li>
              Score can be thought of as your trust level within the Trusted Seed, representing your
              “skin in the game” of funds and time contributed.
            </li>
            <li>
              Read these two deep dives to learn more:
              <br />
              <A href="https://medium.com/commonsstack/the-trusted-seed-of-the-commons-stack-13d7e37f2de">
                The Trusted Seed of the Commons Stack CSTK
              </A>
              <br />
              <A href="https://medium.com/commonsstack/cstk-the-token-of-the-commons-stack-trusted-seed-931978625c61">
                Score: The “Trust Score” of Commons Stack
              </A>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">How should I store my CSTK tokens?</p>{' '}
        </div>
        <div className="mb-4">
          <ul className="faq-list">
            <li>
              CSTK tokens are native to the xDAI EVM chain, and we highly recommend storage on
              <A href="https://metamask.io/">Metamask</A>
            </li>
            <li>
              Smart contract wallets like DAO multi-sigs on Gnosis or Aragon are less compatible for
              cross-chain operations.
            </li>

            <li>
              <A href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup">
                Here’s a primer
              </A>{' '}
              on how to set up Metamask to work on the xDAI network
            </li>
            <li>
              {' '}
              Remember, if worse comes to worst and your tokens become locked or unusable somehow:
              The Commons Stack can always burn your old tokens and issue you new ones, since we are
              centralized arbiters of the CSTK token!
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            What rights does a CSTK score give me?
          </p>{' '}
        </div>
        <div className="mb-4">
          <ul className="faq-list">
            <li>Participate in governance decisions and the Hatch of upcoming Commons! </li>
            <li>
              Participate in ranking grants for matching funds via the Commons Stack Panvala League
              (on <A href="http://cv.commonsstack.org">cv.commonsstack.org</A>) Over $175,000 in
              $PAN matching allocated throughout 2020-2021!
            </li>
            <li>Help steward resources and decision making for mission aligned projects</li>
            <li>
              Get CSLove tokens, which get you free Commons Stack swag from our store! (
              <A href="http://cslove.commonsstack.org">cslove.commonsstack.org</A>)
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="is-size-4 title has-text-weight-bold">
            How do I receive Praise (& more CSTK!)
          </p>{' '}
        </div>
        <div className="mb-4">
          <ul className="faq-list">
            <li>
              Join the Commons Stack Discord or Telegram, where we dish praise:
              <br />
              Discord: <A href="https://discord.gg/eh2S9FqwDR">discord.gg/eh2S9FqwDR</A>
              <br />
              Telegram: <A href="http://t.me/commonsstack">t.me/commonsstack</A>
            </li>
            <li>
              {' '}
              Collaborate on Commons Stack initiatives & get praised for your work: Grab an issue “
              <A href="https://github.com/commons-stack/iteration0/labels/%F0%9F%99%8C%F0%9F%8F%BB%20For%20Contributors%20%F0%9F%99%8C%F0%9F%8F%BB">
                For Contributors” off our Github!
              </A>
            </li>
            <li>
              At the end of each month, praise gets quantified into a CSTK score, which is added to
              you ETH address that you provided in your Trusted Seed application
            </li>
            <li> Enjoy getting dished praise? </li>
            <li>
              Become a Praiser yourself! There is a{' '}
              <A href="https://calendar.google.com/event?action=TEMPLATE&tmeid=MmJhNWFkMjJnbTNkZG52dXF2bHBjNWNwdDdfMjAyMTA2MjNUMTYwMDAwWiBjX3ZqZGNrZmo0YmhhcnVvdmhkNHJtbzNkdHY0QGc&tmsrc=c_vjdckfj4bharuovhd4rmo3dtv4%40group.calendar.google.com&scp=ALL">
                Praise Onboarding session
              </A>{' '}
              every Wed at 12PM EST on the{' '}
              <A href="https://discord.com/invite/KXn9Y7jzvz">Commons Stack Discord server</A>.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default connect()(Comp);
