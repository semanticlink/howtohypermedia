import * as React from 'react'
import Link from 'gatsby-link'
import * as cn from 'classnames'

interface Props {
  active: boolean
  onClick?: () => void
}

export default function ChooseTutorialStep({ active, onClick }: Props) {
  return (
    <div className={cn('choose-tutorial-step', { active })}>
      {active && (
        <div className="before-fade" />
      )}
      <style jsx={true}>{`
        .choose-tutorial-step {
          @p: .bl, .bBlack20, .pb38, .pl25, .relative, .bw2;
        }
        .choose-tutorial-step .before-fade {
          @p: .absolute, .bottom0;
          content: "";
          background: linear-gradient(
            to bottom,
            rgba(196, 196, 196, 1),
            rgba(224, 0, 130, 1)
          );
          height: 100px;
          width: 2px;
          left: -2px;
          top: -50px;
        }
        .choose-tutorial-step:after {
          @p: .absolute, .bottom0;
          content: "";
          background: linear-gradient(
            to bottom,
            rgba(245, 245, 245, 0),
            rgba(245, 245, 245, 1)
          );
          height: 100px;
          width: 2px;
          left: -2px;
        }
        .choose-tutorial-step.active, .choose-tutorial-step.active span:before {
          border-color: $blue;
        }
        span {
          @p: .black80;
        }
        span:before {
          @p: .bBlack20, .absolute, .ba, .bw2, .br100;
          background: #f5f5f5;
          content: '';
          left: -7px;
          margin-top: 7px;
          width: 8px;
          height: 8px;
        }
        h3 {
          @p: .black30, .f14, .ttu, .fw6, .mb25;
        }
        p {
          @p: .f14, .black30, .lhCopy, .mt25;
        }
      `}</style>
      <Link to="/choose/" onClick={onClick}>
        <h3>Practical Tutorial</h3>
        <span>Choosing the right tutorial</span>
        <p>
          We have tutorials prepared
          covering all major API and
          client technologies you can
          use to build hypermedia applications such as
          Vue, ASP.NET Core
          and many more.
        </p>
      </Link>
    </div>
  )
}
