import React from 'react';
import { connect } from 'react-redux';

const Comp = () => {
  return (
    <>
      <section className="section">
        <div className="tile is-horizontal is-parent">
          <article className="tile is-child notification is-primary">
            <p className="heading is-size-2 title has-text-weight-bold">FAQ</p>
            <div>Here you will find the answer to all your questions!</div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child notification is-primary">
            <p className="is-size-4 title has-text-weight-bold">
              How can I contribute to Commons Stack?
            </p>
            <div>
              Eodem tempore Serenianus ex duce, cuius ignavia populatam in Phoenice Celsen ante
              rettulimus, pulsatae maiestatis imperii reus iure postulatus ac lege, incertum qua
              potuit suffragatione absolvi, aperte convictus familiarem suum cum pileo, quo caput
              operiebat, incantato vetitis artibus ad templum misisse fatidicum, quaeritatum
              expresse an ei firmum portenderetur imperium, ut cupiebat, et cunctum.
            </div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child notification is-primary">
            <p className="is-size-4 title has-text-weight-bold">
              How can I contribute to Commons Stack?
            </p>
            <div>
              Eodem tempore Serenianus ex duce, cuius ignavia populatam in Phoenice Celsen ante
              rettulimus, pulsatae maiestatis imperii reus iure postulatus ac lege, incertum qua
              potuit suffragatione absolvi, aperte convictus familiarem suum cum pileo, quo caput
              operiebat, incantato vetitis artibus ad templum misisse fatidicum, quaeritatum
              expresse an ei firmum portenderetur imperium, ut cupiebat, et cunctum.
            </div>
          </article>
        </div>
        <div className="tile has-text-left is-horizontal is-parent">
          <article className="tile is-child notification is-primary">
            <p className="is-size-4 title has-text-weight-bold">
              How can I contribute to Commons Stack?
            </p>
            <div>
              Eodem tempore Serenianus ex duce, cuius ignavia populatam in Phoenice Celsen ante
              rettulimus, pulsatae maiestatis imperii reus iure postulatus ac lege, incertum qua
              potuit suffragatione absolvi, aperte convictus familiarem suum cum pileo, quo caput
              operiebat, incantato vetitis artibus ad templum misisse fatidicum, quaeritatum
              expresse an ei firmum portenderetur imperium, ut cupiebat, et cunctum.
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default connect()(Comp);
