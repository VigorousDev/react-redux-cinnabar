import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';
import ContainerDimensions from 'react-container-dimensions';

import colors from '../util/colors';

function App({ main, sidebar, splash, toolbar }) {
  const getPadding = () => {
    const isResetPassword = window.location.href.includes('resetpassword');
    if (splash || isResetPassword) {
      return 0;
    }
    return '1rem 1rem 1rem 1rem';
  };

  const getHeight = (height) => (
    toolbar ? height - 64 : height
  );

  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
    },
    pageContainer: {
      width: '100%',
      padding: getPadding(),
      display: 'flex',
      overflow: 'auto',
      backgroundColor: colors.lightGrey,
    },
  };

  return (
    <StyleRoot>
      <div style={styles.container}>
        {toolbar}
        <ContainerDimensions>
            {({ height }) =>
              <div
                style={{
                  padding: 0,
                  width: '100vw',
                  height: getHeight(height),
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                <div style={styles.pageContainer}>
                  {sidebar}
                  {splash}
                  {main}
                </div>
              </div>
            }
        </ContainerDimensions>
      </div>
    </StyleRoot>
  );
}

App.propTypes = {
  main: PropTypes.object,
  sidebar: PropTypes.object,
  splash: PropTypes.object,
  toolbar: PropTypes.object,
};

export default App;
