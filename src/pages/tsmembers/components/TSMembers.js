import React from 'react';

import members from '../../../assets/ts_members.json';

const TSMembers = () => {
  return (
    <>
      <div className="container is-max-desktop notification is-primary has-text-left p-6">
        <div className="is-size-2 has-text-weight-bold mb-3">Trusted Seed Members</div>
        <div className="subtitle mb-5 is-uppercase">Updated: {members.updated}</div>
        <div className="columns">
          <div className="column is-two-thirds">
            Members of the Trusted Seed put skin in the game by contributing to the Commons Stack, 
            entitling them to a CSTK Score which denotes their reputation in the Trusted Seed. They 
            will use their expertise to help steward new forms of sustainably funded Commons 
            ecosystems, especially in the period immediately following their launch.
          </div>
        </div>
        <div className="is-divider mb-4" />
        <div className="columns">
          <div className="column ">
            <div className="subtitle is-uppercase mb-1">Member count</div>
            <div className="is-size-1">{members.member_count}</div>
          </div>
          <div className="column">
            <div className="subtitle is-uppercase mb-1">Total Number of CSTK</div>
            <div className="is-size-1">1,430,722</div>
          </div>
        </div>
        <div className="is-divider mb-4" />
        <div>
          {members.group1.split(',').map(member => (
            <div className="is-inline-block" style={{ width: '50%' }}>
              {member}
            </div>
          ))}
        </div>
        <div className="is-divider mb-4 mt-4" />
        <div>
          {members.group2.split(',').map(member => (
            <div className="is-inline-block" style={{ width: '50%' }}>
              {member}
            </div>
          ))}
        </div>
        <div className="is-divider mb-4 mt-4" />
        <div>
          {members.group3.split(',').map(member => (
            <div className="is-inline-block" style={{ width: '50%' }}>
              {member}
            </div>
          ))}
        </div>

        {/* <div className="is-size-1 has-text-weight-light	">
          {members.group1.split(',').map(member => (
            <span className="mr-5">{member}</span>
          ))}
        </div>
        <div className="is-divider mb-5 mt-5" />
        <div className="is-size-2 has-text-weight-light	">
          {members.group2.split(',').map(member => (
            <span className="mr-5">{member}</span>
          ))}
        </div>
        <div className="is-divider mt-5 mb-5" />
        <div className="is-size-3 has-text-weight-light	">
          {members.group3.split(',').map(member => (
            <span className="mr-5">{member}</span>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default TSMembers;
