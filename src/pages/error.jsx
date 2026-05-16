import React from 'react';
import errormsg from './../assets/fillerIllus02.svg'
import decor from './../assets/pagedecor.svg'
import './error.css'
import BlinkingEye from '../components/common/blinkingEye';
import Button from '../components/common/button';
import './error.css'
import TitleBlock from '../components/common/title';
const Error = () => {
    return ( <>
    <main className='body3'>
        <div className="secContainer">
        <section className='section2'>
            <div className="errormsg">
                <BlinkingEye />
            <img src={errormsg} alt="" />
            </div>
            <img className='pageDecor float' src={decor} alt="" />
            <div>
                 <TitleBlock
                            class="title1"
                            heading="Oops!"
                            subheading="Sorry you dont have access to this page. Try Another."

                        />
                <Button
                class="btn1"
                cta=" Back home"
                link="/dashboard"
                />
            </div>
        </section>
    </div>
    </main>
    </> );
}
 
export default Error;