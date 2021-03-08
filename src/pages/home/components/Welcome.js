import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// eslint-disable-next-line no-unused-vars
const Comp = ({ agreed, onSetAgreed }) => {
  //     const TomatoButton = styled(Button)`
  // background: tomato;
  // `
  return <Redirect to="pay-dues" />;

  // return (
  //   <>
  //     <section className="section">
  //       <div className="container">
  //         <h1 className="title">Welcome to the TECH token Contribution page</h1>
  //         <h2 className="subtitle">
  //           <Link
  //             className=" button is-success is-outlined is-large"
  //             to={{
  //               pathname: '/contribute',
  //             }}
  //           >
  //             Start the contribution DApp
  //           </Link>
  //         </h2>
  //       </div>
  //     </section>
  //   </>
  // );
};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
  return {
    // agreed: state.agreed,
  };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => {
  return {
    // onSetAgreed: () => dispatch({ type: "AGREE_TANDC" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
