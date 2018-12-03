import * as React from "react";
import Icon from "graphcool-styles/dist/components/Icon/Icon";
import { $v } from "graphcool-styles";

export default function Footer() {
  return (
    <div className="footer">
      <style jsx={true}>{`
        .footer {
          @p: .tc, .pv38, .black40, .relative, .z2;
          background-color: rgba(0, 0, 0, .03);
          padding-left: 30px;
          padding-right: 30px;
          line-height: 1.5;
        }
        .love {
          @p: .red;
        }
        .logos {
          @p: .flex, .justifyCenter, .mt25;
        }
        .logos :global(*) + :global(*) {
          @p: .ml16;
        }
        img {
          height: 28px;
          width: auto;
        }
        a {
          @p: .black40;
        }
        a:hover {
          @p: .underline;
        }
      `}</style>
      <span>
        Made by{" "} Semantic Link Project <br/>(big thanks to tutorial format by <a href="https://www.prisma.io"
                                                                                 target="_blank">Prisma</a>)
      </span>
      <div className="logos">
        <a href="https://twitter.com/semantic_link" target="_blank">
          <img src={require("../../assets/icons/twitter.svg")} alt=""/>
        </a>
        <a href="https://github.com/semanticlink/" target="_blank">
          <Icon
            src={require("graphcool-styles/icons/fill/github.svg")}
            color={$v.black}
            width={28}
            height={28}
          />
        </a>
      </div>
    </div>
  );
}
