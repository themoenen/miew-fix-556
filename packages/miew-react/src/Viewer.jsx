import Miew from 'miew';
import React, { useLayoutEffect, useRef } from 'react';
import styles from './Viewer.module.scss';
import 'miew/dist/Miew.css';

const defaultMoleculeFormat = 'xyz';
const defaultMolecule = `\
25
Serotonin
O  2.73520  2.46200  0.09750
N  0.11210 -2.34780 -0.11230
N -4.24020  1.56780 -0.28800
C -1.18570 -0.60400  0.33720
C  0.14870 -0.13610  0.17810
C -2.37440  0.21670  0.64400
C  0.94280 -1.24990 -0.10300
C -1.17610 -1.96730  0.15230
C -3.08730  0.73690 -0.61780
C  0.75910  1.13200  0.24660
C  2.32230 -1.15860 -0.31980
C  2.13790  1.23860  0.03200
C  2.90570  0.10960 -0.24680
H -3.08280 -0.37360  1.24060
H -2.08420  1.06540  1.27690
H -1.96880 -2.70180  0.18460
H  0.41090 -3.29680 -0.28950
H -3.42250 -0.10740 -1.23120
H -2.38880  1.32120 -1.22840
H  0.16350  2.01490  0.46250
H  2.92070 -2.03710 -0.53680
H  3.97620  0.20860 -0.41110
H -4.64550  1.93950 -1.14610
H -3.93630  2.37340  0.25740
H  2.06010  3.13240  0.29950
`;

function createMiewRef(miewRef, options) {
  if (!miewRef.current) {
    const miew = new Miew(options);
    if (miew.init()) {
      miewRef.current = miew;
      miew.run();

      // !!! debugging, don't commit !!!
      miew
        .load(defaultMolecule, { sourceType: 'immediate', fileType: defaultMoleculeFormat })
        .catch(() => {});
    }
  }
}

function destroyMiewRef(miewRef) {
  if (miewRef.current) {
    miewRef.current.term();
  }
  miewRef.current = null;
}

export default function Viewer() {
  const miewRef = useRef();
  const rootRef = useRef();

  useLayoutEffect(() => {
    const settings = { axes: false, fps: false };
    createMiewRef(miewRef, { container: rootRef.current, settings });
    return () => destroyMiewRef(miewRef);
  }, []);

  return (
    <div className={styles.root} ref={rootRef}>
      Viewer
    </div>
  );
}
