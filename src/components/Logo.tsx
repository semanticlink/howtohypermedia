import * as React from 'react'
import Link from 'gatsby-link'

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <style jsx={true}>{`
        .logo {
          @p: .flex, .ttu, .fw6, .itemsCenter, .blue;
          z-index: 10102;
          font-size: 17px;
        }
        .logo img {
          @p: .mr10;
        }
        .logo span {
          @p: .flexFixed;
        }
        img {
          width: 40px;
          height: 35px;
        }
        .logo-wrapper {
          @p: .flex, .pa16, .itemsCenter;
        }
      `}</style>
      <Link to="/">
        <div className="logo">
          <img src={require('../assets/icons/semanticlink.svg')} alt="" />
          <span>How to Hypermedia</span>
        </div>
      </Link>
    </div>
  )
}
