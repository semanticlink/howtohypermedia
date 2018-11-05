import * as React from 'react'
import Bubble from './Bubble'
import Company from './Company'
import { $v } from 'graphcool-styles'

export default function Team() {
  return (
    <section>
      <style jsx={true}>{`
        section {
          @p: .pb96, .relative, .z0;
          background-color: #fafafa;
          border-top: 2px solid rgba(0, 0, 0, 0.1);
        }
        .team {
          @p: .center;
          max-width: 1100px;
        }
        p {
          @p: .tc, .mt38;
        }
        .bubbles {
          @p: .mt60, .flex, .flexWrap;
        }
        @media (max-width: 1100px) {
          section {
            padding-bottom: 0 !important;
          }
          .bubbles-container {
            overflow: auto;
            padding-left: 30px;
            padding-bottom: 38px;
            margin-bottom: -180px;
          }
          div.bubbles {
            min-width: 1020px;
            transform: scale(0.7);
            transform-origin: top left;
          }
          h2, p {
            padding-left: 30px;
            padding-right: 30px;
          }
          p {
            text-align: left !important;
          }
        }
      `}</style>
      <div className="team">
        <h2>For the Community, by the Community</h2>
        <p>
          How to Hypermedia was created by many amazing contributors.
          It's open-source and free of charge.
        </p>
        <div className="bubbles-container">
          <div className="bubbles">
            <div className='flex'>
              <Bubble
                avatar={require('../../assets/icons/semanticlink.svg')}
                name="semantic link project"
                description="tutorial"
                x={0}
                y={0}
              />
              <Company
                src={require('../../assets/icons/semanticlink.svg')}
                color={$v.white}
                y={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
