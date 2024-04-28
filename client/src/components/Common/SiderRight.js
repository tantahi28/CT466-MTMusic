import React from 'react';
import styled from 'styled-components';

import Player from '../UI/Player'

function SiteRight() {
    return (
        <SiteRightContainer className="site-right col-4 p-3 d-flex flex-column align-items-center w-100">
            <>
                <h3 className="heading-genre align-self-start mt-4">Playing Some Music</h3>
                <Player className='m-2'/>
            </>
        </SiteRightContainer>
    );
}

export default SiteRight;

const SiteRightContainer = styled.div`
    z-index: 999;
    height: 100vh;
    background-color: var(--sidebar-bg);
    overflow: hidden;
`;
