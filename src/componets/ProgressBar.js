
import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';
import LayPB1 from "../assets/images/Lay/lay_pb1.svg"

const ProgressBar = () => {
    const [crushPercent, setCrushPercent] = useState(parseInt(localStorage.getItem('crushPercent')) || 50);

    useEffect(() => {
        localStorage.setItem('crushPercent', crushPercent.toString());
    }, [crushPercent]);
    

  return (
    
    <div className={styles.progress_container}>
      <div className={styles.progress_bar} style={{ width: `${crushPercent}%` }}>
        <div>
            <img src={LayPB1} alt="호감도" />
        </div>
      {/* {crushPercent}% */}
      </div>
    </div>
  );
};

export default ProgressBar;