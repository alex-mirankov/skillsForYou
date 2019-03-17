import React from 'react';

const selectOlympiadHOC = (WrapperComponent) => {
    return class extends React.Component {
        render() {
            const styles = {
                color: '#8742ab',
                position: 'absolute',
                top: '50%',
                left: '50%',
            }
            return (
                <WrapperComponent
                    styles={styles}
                />
            );
        }
    }
}

export default selectOlympiadHOC;
